import { BasicQuerier } from "@terran-one/cosmwasm-vm-js";
import { MockedCosmWasmClient } from "./mocked-cw-client";

export class TestQuerier extends BasicQuerier {
    public client?: MockedCosmWasmClient;

    handleQuery(req: any): any {
        if (!this.client) {
            throw new Error("no client set");
        }

        if (typeof req !== "object" || !req) {
            throw new Error(`handleQuery not implemented for ${req}`);
        }

        const { wasm } = req;
        if (!wasm || typeof wasm !== "object") {
            throw new Error(`handleQuery not implemented for ${JSON.stringify(req)}`);
        }

        const { smart } = wasm;
        if (!smart || typeof smart !== "object") {
            throw new Error(`handleQuery not implemented for ${JSON.stringify(req)}`);
        }

        const { contract_addr, msg } = smart;
        if (!contract_addr || typeof contract_addr !== "string") {
            throw new Error(`contract_addr missing in ${JSON.stringify(wasm)}`);
        }

        if (!msg || typeof msg !== "string") {
            throw new Error(`msg missing in ${JSON.stringify(wasm)}`);
        }

        const parsedMsg = JSON.parse(Buffer.from(msg, "base64").toString("utf8"));
        const result = this.client.query(contract_addr, parsedMsg);
        return JSON.parse(Buffer.from(result.ok, "base64").toString("utf8"));
    }
}