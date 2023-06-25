import { ExecuteResult, JsonObject } from "@cosmjs/cosmwasm-stargate";
import { Coin, Event, logs, StdFee } from "@cosmjs/stargate";
import { BasicKVIterStorage, IBackend, VMInstance } from "@terran-one/cosmwasm-vm-js";
import { BlockInfo, Env, MessageInfo } from "@terran-one/cosmwasm-vm-js/dist/types";
import { bech32 } from "bech32";

type TraceItem = {
    message: any,
    contract: string,
    sender: string,
}
export class MockedCosmWasmClient {
    private contracts: { [key: string]: VMInstance | undefined } = {};
    constructor(private backend: Pick<IBackend, "backend_api" | "querier">, public block: BlockInfo) { }

    setContract(contractAddress: string, contract: VMInstance) {
        this.contracts[contractAddress] = contract;
    }

    public createAccount(label: string) {
        return bech32.encode(this.backend.backend_api.bech32_prefix, bech32.toWords(Buffer.from(label, "utf8")))
    }

    async instantiate(bin: ArrayBuffer, deployer: string, label: string, msg: any): Promise<string> {
        const address = this.createAccount(label);

        const storage = new BasicKVIterStorage();

        const vm = new VMInstance({ ...this.backend, storage });
        await vm.build(bin);


        const env: Env = {
            block: this.block,
            contract: {
                address,
            },
            transaction: null,
        };

        const info: MessageInfo = {
            funds: [],
            sender: deployer,
        }

        const result = vm.instantiate(env, info, msg).json as any;

        if (!result.ok) {
            throw new Error(`instantiate: ${result.error}`);
        }

        this.contracts[address] = vm;

        return address;
    }

    private executeInternal(senderAddress: string, contractAddress: string, msg: JsonObject, funds: readonly Coin[], trace: TraceItem[]): ExecuteResult {
        const contract = this.contracts[contractAddress];
        if (!contract) {
            throw new Error(`execute: Contract ${contractAddress} not found`);
        }

        const env: Env = {
            block: this.block,
            contract: {
                address: contractAddress,
            },
            transaction: null,
        };

        const newTrace = [...trace, { sender: senderAddress, message: msg, contract: contractAddress }];

        const result: any = contract.execute(env, { funds: [...(funds ?? [])], sender: senderAddress }, msg).json;

        if (!result.ok) {
            console.error(contract.debugMsgs);

            const debugMessages = contract.debugMsgs.length ? `\nDEBUG:\n\t${contract.debugMsgs.join("\n\t")}` : "";
            const traceMessages = newTrace.length
                ? `\nTRACE:\n\t${newTrace.map(({ message, contract, sender }) => `account: ${sender} executes: ${contract} -> ${JSON.stringify(message)}`).join("\n\t")}`
                : "";

            throw new Error(`execute: ${result.error}${debugMessages}${traceMessages}`);
        }

        let gasUsed = 0;
        let gasWanted = 0;
        let events: Event[] = result.ok.events.map((e: Event): Event => ({
            attributes: [...e.attributes, { key: "_contract_address", value: contractAddress }],
            type: e.type,
        }));
        let logs: logs.Log[] = [];

        // TODO handle submessages better (store events, data etc.)
        const { messages = [] } = result.ok;
        for (const message of messages) {
            const execute = message.msg?.wasm?.execute;
            if (execute) {
                const { contract_addr, msg, funds } = execute;

                const parsedMsg = JSON.parse(Buffer.from(msg, "base64").toString("utf8"));
                const {
                    events: subEvents,
                    gasUsed: subGasUsed,
                    gasWanted: subGasWanted,
                    logs: subLogs,
                } = this.executeInternal(contractAddress, contract_addr, parsedMsg, funds, newTrace);

                events = [...events, ...subEvents];
                gasUsed += subGasUsed;
                gasWanted += subGasWanted;
                logs = [...logs, ...subLogs];
            }
        }

        return { events, gasUsed, gasWanted, height: 0, logs, transactionHash: "" };
    }

    async execute(senderAddress: string, contractAddress: string, msg: JsonObject, _fee: StdFee | "auto" | number, _memo?: string, funds?: readonly Coin[]): Promise<ExecuteResult> {
        return this.executeInternal(senderAddress, contractAddress, msg, funds ?? [], []);
    }

    query(address: string, queryMsg: JsonObject): any {
        const contract = this.contracts[address];
        if (!contract) {
            throw new Error(`queryContractSmart: Contract ${address} not found`);
        }

        const env: Env = {
            block: this.block,
            contract: {
                address,
            },
            transaction: null,
        };

        const result = contract.query(env, queryMsg).json;

        return result as any;
    }

    async queryContractSmart(address: string, queryMsg: JsonObject): Promise<any> {
        const result = this.query(address, queryMsg);

        if (!result.ok) {
            throw result.error;
        }

        const parsedResult = JSON.parse(Buffer.from(result.ok, "base64").toString("utf8"));
        return parsedResult;
    }
}