import { readFileSync } from "fs";
import {
    BasicBackendApi,
} from "@terran-one/cosmwasm-vm-js";
import {
    OmxCwBaseTokenClient,
    OmxCwBaseTokenQueryClient,
    OmxCwOrderbookClient,
    OmxCwOrderbookQueryClient,
    OmxCwPairClient,
    OmxCwPairQueryClient,
    OmxCwPriceFeedClient,
    OmxCwPriceFeedQueryClient,
    OmxCwRouterClient,
    OmxCwRouterQueryClient,
    OmxCwVaultClient,
    OmxCwVaultPriceFeedClient,
    OmxCwVaultPriceFeedQueryClient,
    OmxCwVaultQueryClient,
    OmxCwWrappedTokenClient,
    OmxCwWrappedTokenQueryClient,
    WrappedTokenTypes,
    BaseTokenTypes,
    PriceFeedTypes,
    PairTypes,
    VaultTypes,
    VaultPriceFeedTypes,
    RouterTypes,
    OrderbookTypes,
} from "../../src";
import { MockedCosmWasmClient } from "./mocked-cw-client";
import { TestQuerier } from "./querier";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

const wrappedTokenBin = readFileSync("artifacts/omx_cw_wrapped_token.wasm");
const baseTokenBin = readFileSync("artifacts/omx_cw_base_token.wasm");
const priceFeedBin = readFileSync("artifacts/omx_cw_price_feed.wasm");
const vaultPriceFeedBin = readFileSync("artifacts/omx_cw_vault_price_feed.wasm");
const vaultBin = readFileSync("artifacts/omx_cw_vault.wasm");
const routerBin = readFileSync("artifacts/omx_cw_router.wasm");
const orderbookBin = readFileSync("artifacts/omx_cw_orderbook.wasm");
const pairBin = readFileSync("artifacts/omx_cw_pair.wasm");

export const OSMO_DENOM = "uosmo";
export const USDC_DENOM = "usdc";
export const BUSD_DENOM = "busd";
export const BTC_DENOM = "btc";
export const ETH_DENOM = "eth";
export const ATOM_DENOM = "atom";

export const USDC_DECIMALS = 6;
export const BUSD_DECIMALS = 18;
export const BTC_DECIMALS = 8;
export const ETH_DECIMALS = 18;
export const ATOM_DECIMALS = 6;
export const OSMO_DECIMALS = 6;
export const USDO_DECIMALS = 18;

export const BTC_SCALE = 10n ** BigInt(BTC_DECIMALS);
export const ETH_SCALE = 10n ** BigInt(ETH_DECIMALS);
export const OSMO_SCALE = 10n ** BigInt(OSMO_DECIMALS);
export const USDC_SCALE = 10n ** BigInt(USDC_DECIMALS);
export const ATOM_SCALE = 10n ** BigInt(ATOM_DECIMALS);
export const BUSD_SCALE = 10n ** BigInt(BUSD_DECIMALS);
export const USDO_SCALE = 10n ** BigInt(USDO_DECIMALS);

export const PRICE_PRECISION = 1_000000000000000000n; // 1e18
export const ORACLE_PRICE_PRECISION = 1_00000000n; // 1e8

// orderbook constants
export const MIN_EXECUTION_FEE = 500000n
export const MIN_PURCHASE_TOKEN_AMOUNT_USD = PRICE_PRECISION * 5n / 10n; // 0.5 USD

// all prices is 1:1 for simplicity
export const BTC_ORACLE_PRICE = 1n * ORACLE_PRICE_PRECISION;
export const ETH_ORACLE_PRICE = 1n * ORACLE_PRICE_PRECISION;
export const OSMO_ORACLE_PRICE = 1n * ORACLE_PRICE_PRECISION;
export const USDC_ORACLE_PRICE = 1n * ORACLE_PRICE_PRECISION;
export const BUSD_ORACLE_PRICE = 1n * ORACLE_PRICE_PRECISION;
export const ATOM_ORACLE_PRICE = 1n * ORACLE_PRICE_PRECISION;

interface Contract<E = unknown, Q = unknown> {
    client: E;
    queryClient: Q;
    address: string;
}

export class TestApp {
    private executeClients: { sender: string }[] = [];

    public osmo: Contract<OmxCwWrappedTokenClient, OmxCwWrappedTokenQueryClient>;
    public usdc: Contract<OmxCwWrappedTokenClient, OmxCwWrappedTokenQueryClient>;
    public btc: Contract<OmxCwWrappedTokenClient, OmxCwWrappedTokenQueryClient>;
    public eth: Contract<OmxCwWrappedTokenClient, OmxCwWrappedTokenQueryClient>;
    public usdo: Contract<OmxCwBaseTokenClient, OmxCwBaseTokenQueryClient>;
    public busd: Contract<OmxCwWrappedTokenClient, OmxCwWrappedTokenQueryClient>;
    public atom: Contract<OmxCwWrappedTokenClient, OmxCwWrappedTokenQueryClient>;
    public osmoPriceFeed: Contract<OmxCwPriceFeedClient, OmxCwPriceFeedQueryClient>;
    public btcPriceFeed: Contract<OmxCwPriceFeedClient, OmxCwPriceFeedQueryClient>;
    public ethPriceFeed: Contract<OmxCwPriceFeedClient, OmxCwPriceFeedQueryClient>;
    public usdcPriceFeed: Contract<OmxCwPriceFeedClient, OmxCwPriceFeedQueryClient>;
    public busdPriceFeed: Contract<OmxCwPriceFeedClient, OmxCwPriceFeedQueryClient>;
    public atomPriceFeed: Contract<OmxCwPriceFeedClient, OmxCwPriceFeedQueryClient>;
    public ethBusd: Contract<OmxCwPairClient, OmxCwPairQueryClient>;
    public btcEth: Contract<OmxCwPairClient, OmxCwPairQueryClient>;
    public osmoEth: Contract<OmxCwPairClient, OmxCwPairQueryClient>;
    public vault: Contract<OmxCwVaultClient, OmxCwVaultQueryClient>;
    public router: Contract<OmxCwRouterClient, OmxCwRouterQueryClient>;
    public orderbook: Contract<OmxCwOrderbookClient, OmxCwOrderbookQueryClient>;
    public vaultPriceFeed: Contract<OmxCwVaultPriceFeedClient, OmxCwVaultPriceFeedQueryClient>;

    private client: MockedCosmWasmClient;

    public deployer: string;

    /**
     * Use `TestApp.init()` instead.
     */
    private constructor() { }

    public static async init(): Promise<TestApp> {
        const app = new TestApp();


        const backend = {
            querier: new TestQuerier(),
            backend_api: new BasicBackendApi("osmo"),
        };

        const block = {
            height: 1337,
            time: "2000000000",
            chain_id: "osmosis",
        };

        app.client = new MockedCosmWasmClient(backend, block);
        backend.querier.client = app.client;

        app.deployer = app.client.createAccount("deployer");

        app.osmo = await app.deployWrappedToken(OSMO_DENOM, OSMO_DECIMALS, "osmo");
        app.usdc = await app.deployWrappedToken(USDC_DENOM, USDC_DECIMALS, "usdc");
        app.busd = await app.deployWrappedToken(BUSD_DENOM, BUSD_DECIMALS, "busd");
        app.btc = await app.deployWrappedToken(BTC_DENOM, BTC_DECIMALS, "btc");
        app.eth = await app.deployWrappedToken(ETH_DENOM, ETH_DECIMALS, "eth");
        app.usdo = await app.deployBaseToken(USDO_DECIMALS, "usdo");
        app.atom = await app.deployWrappedToken(ATOM_DENOM, ATOM_DECIMALS, "atom");

        app.osmoPriceFeed = await app.deployPriceFeed("osmo_price_feed");
        app.btcPriceFeed = await app.deployPriceFeed("btc_price_feed");
        app.ethPriceFeed = await app.deployPriceFeed("eth_price_feed");
        app.usdcPriceFeed = await app.deployPriceFeed("usdc_price_feed");
        app.busdPriceFeed = await app.deployPriceFeed("busd_price_feed");
        app.atomPriceFeed = await app.deployPriceFeed("atom_price_feed");

        app.ethBusd = await app.deployPair(app.eth, app.busd, "eth_busd");
        app.osmoEth = await app.deployPair(app.osmo, app.eth, "osmo_eth");
        app.btcEth = await app.deployPair(app.btc, app.eth, "btc_eth");

        app.vaultPriceFeed = await app.deployVaultPriceFeed({
            btc: app.btc.address,
            eth: app.eth.address,
            osmo: app.osmo.address,
            eth_busd: app.ethBusd.address,
            btc_eth: app.btcEth.address,
            osmo_eth: app.osmoEth.address,
            is_amm_enabled: false,
        });

        await app.vaultPriceFeed.client.setPriceSampleSpace({ value: 1 });

        app.vault = await app.deployVault({
            funding_rate_factor: "600",
            liquidation_fee_usd: (5n * PRICE_PRECISION / 10n).toString(),
            price_feed: app.vaultPriceFeed.address,
            stable_funding_rate_factor: "600",
            usdo: app.usdo.address,
        });

        app.router = await app.deployRouter({
            vault: app.vault.address,
            usdo: app.usdo.address,
            wosmo: app.osmo.address,
        });

        await app.usdo.client.updateMinter({ newMinter: app.vault.address });
        await app.vault.client.setRouter({ router: app.router.address });

        app.orderbook = await app.deployOrderbook({
            router: app.router.address,
            usdo: app.usdo.address,
            min_execution_fee: MIN_EXECUTION_FEE.toString(),
            min_purchase_token_amount_usd: MIN_PURCHASE_TOKEN_AMOUNT_USD.toString(),
            vault: app.vault.address,
            wosmo: app.osmo.address,
        });

        await app.router.client.addPlugin({ plugin: app.orderbook.address });

        const tokensToWhitelist = [
            {
                priceFeed: app.btcPriceFeed,
                token: app.btc,
            },
            {
                priceFeed: app.ethPriceFeed,
                token: app.eth,
            },
            {
                priceFeed: app.osmoPriceFeed,
                token: app.osmo,
            },
            {
                priceFeed: app.busdPriceFeed,
                token: app.busd,
            },
            {
                priceFeed: app.usdcPriceFeed,
                token: app.usdc,
            },
            {
                priceFeed: app.atomPriceFeed,
                token: app.atom,
            },
        ];

        for (const { token, priceFeed } of tokensToWhitelist) {
            // all price precisions should be the same (8 decimals)
            await app.vaultPriceFeed.client.setTokenConfig({
                token: token.address,
                isStrictStable: false,
                priceDecimals: 8,
                priceFeed: priceFeed.address,
            });
        }

        await app.btcPriceFeed.client.setLatestAnswer({ answer: { value: BTC_ORACLE_PRICE.toString(), positive: true } });
        await app.ethPriceFeed.client.setLatestAnswer({ answer: { value: ETH_ORACLE_PRICE.toString(), positive: true } });
        await app.osmoPriceFeed.client.setLatestAnswer({ answer: { value: OSMO_ORACLE_PRICE.toString(), positive: true } });
        await app.busdPriceFeed.client.setLatestAnswer({ answer: { value: BUSD_ORACLE_PRICE.toString(), positive: true } });
        await app.usdcPriceFeed.client.setLatestAnswer({ answer: { value: USDC_ORACLE_PRICE.toString(), positive: true } });
        await app.atomPriceFeed.client.setLatestAnswer({ answer: { value: ATOM_ORACLE_PRICE.toString(), positive: true } });

        await app.vault.client.setTokenConfig({
            isShortable: false,
            isStable: true,
            maxUsdoAmount: "0",
            minProfitBps: "75",
            token: app.usdc.address,
            tokenDecimals: USDC_DECIMALS,
            tokenWeight: "1000",
        });
        await app.vault.client.setTokenConfig({
            isShortable: true,
            isStable: false,
            maxUsdoAmount: "0",
            minProfitBps: "75",
            token: app.osmo.address,
            tokenDecimals: OSMO_DECIMALS,
            tokenWeight: "10000",
        });
        await app.vault.client.setTokenConfig({
            isShortable: true,
            isStable: false,
            maxUsdoAmount: "0",
            minProfitBps: "75",
            token: app.btc.address,
            tokenDecimals: BTC_DECIMALS,
            tokenWeight: "10000",
        });
        await app.vault.client.setTokenConfig({
            isShortable: true,
            isStable: false,
            maxUsdoAmount: "0",
            minProfitBps: "75",
            token: app.eth.address,
            tokenDecimals: ETH_DECIMALS,
            tokenWeight: "10000",
        });
        await app.vault.client.setTokenConfig({
            isShortable: true,
            isStable: false,
            maxUsdoAmount: "0",
            minProfitBps: "75",
            token: app.atom.address,
            tokenDecimals: ATOM_DECIMALS,
            tokenWeight: "10000",
        });

        return app;
    }

    public getSigningCwClient(): SigningCosmWasmClient {
        return this.client as any as SigningCosmWasmClient;
    }

    public createAccount(label: string): string {
        return this.client.createAccount(label);
    }

    public setSender(sender: string): void {
        this.executeClients.forEach((client) => {
            client.sender = sender;
        });
    }

    public resetSender(): void {
        this.executeClients.forEach((client) => {
            client.sender = this.deployer;
        });
    }

    public async deployWrappedToken(
        denom: string,
        decimals: number,
        symbol: string,
    ): Promise<Contract<OmxCwWrappedTokenClient, OmxCwWrappedTokenQueryClient>> {
        const address = await this.client.instantiate(
            wrappedTokenBin,
            this.deployer,
            symbol,
            {
                decimals,
                denom,
                name: symbol,
                symbol,
                mint: {
                    minter: this.deployer,
                },
            } as WrappedTokenTypes.InstantiateMsg,
        );

        const client = new OmxCwWrappedTokenClient(this.client as any, this.deployer, address);
        this.executeClients.push(client);

        return {
            client,
            queryClient: new OmxCwWrappedTokenQueryClient(this.client as any, address),
            address,
        };
    }

    public async deployBaseToken(
        decimals: number,
        symbol: string,
    ): Promise<Contract<OmxCwBaseTokenClient, OmxCwBaseTokenQueryClient>> {
        const address = await this.client.instantiate(
            baseTokenBin,
            this.deployer,
            symbol,
            {
                decimals,
                id: symbol,
                name: symbol,
                symbol,
                mint: {
                    minter: this.deployer,
                },
            } as BaseTokenTypes.InstantiateMsg,
        );

        const client = new OmxCwBaseTokenClient(this.client as any, this.deployer, address);
        this.executeClients.push(client);

        return {
            client,
            queryClient: new OmxCwBaseTokenQueryClient(this.client as any, address),
            address,
        };
    }


    public async deployPriceFeed(
        label: string,
    ): Promise<Contract<OmxCwPriceFeedClient, OmxCwPriceFeedQueryClient>> {
        const address = await this.client.instantiate(
            priceFeedBin,
            this.deployer,
            label,
            {} as PriceFeedTypes.InstantiateMsg,
        );

        const client = new OmxCwPriceFeedClient(this.client as any, this.deployer, address);
        this.executeClients.push(client);

        return {
            client,
            queryClient: new OmxCwPriceFeedQueryClient(this.client as any, address),
            address,
        };
    }

    public async deployPair(
        token0: Contract | string,
        token1: Contract | string,
        label: string,
    ): Promise<Contract<OmxCwPairClient, OmxCwPairQueryClient>> {
        const address = await this.client.instantiate(
            pairBin,
            this.deployer,
            label,
            {
                token0: TestApp.getContractAddr(token0),
                token1: TestApp.getContractAddr(token1),
                admin: this.deployer,
            } as PairTypes.InstantiateMsg,
        );

        const client = new OmxCwPairClient(this.client as any, this.deployer, address);
        this.executeClients.push(client);

        return {
            client,
            queryClient: new OmxCwPairQueryClient(this.client as any, address),
            address,
        };
    }

    private async deployVaultPriceFeed(
        msg: VaultPriceFeedTypes.InstantiateMsg,
    ): Promise<Contract<OmxCwVaultPriceFeedClient, OmxCwVaultPriceFeedQueryClient>> {
        const address = await this.client.instantiate(
            vaultPriceFeedBin,
            this.deployer,
            "vault-price-feed",
            msg,
        );

        const client = new OmxCwVaultPriceFeedClient(this.client as any, this.deployer, address);
        this.executeClients.push(client);

        return {
            client,
            queryClient: new OmxCwVaultPriceFeedQueryClient(this.client as any, address),
            address,
        };
    }

    private async deployVault(
        msg: VaultTypes.InstantiateMsg,
    ): Promise<Contract<OmxCwVaultClient, OmxCwVaultQueryClient>> {
        const address = await this.client.instantiate(
            vaultBin,
            this.deployer,
            "vault",
            msg,
        );

        const client = new OmxCwVaultClient(this.client as any, this.deployer, address);
        this.executeClients.push(client);

        return {
            client,
            queryClient: new OmxCwVaultQueryClient(this.client as any, address),
            address,
        };
    }


    private async deployRouter(
        msg: RouterTypes.InstantiateMsg,
    ): Promise<Contract<OmxCwRouterClient, OmxCwRouterQueryClient>> {
        const address = await this.client.instantiate(
            routerBin,
            this.deployer,
            "router",
            msg,
        );

        const client = new OmxCwRouterClient(this.client as any, this.deployer, address);
        this.executeClients.push(client);

        return {
            client,
            queryClient: new OmxCwRouterQueryClient(this.client as any, address),
            address,
        };
    }

    private async deployOrderbook(
        msg: OrderbookTypes.InstantiateMsg,
    ): Promise<Contract<OmxCwOrderbookClient, OmxCwOrderbookQueryClient>> {
        const address = await this.client.instantiate(
            orderbookBin,
            this.deployer,
            "orderbook",
            msg,
        );

        console.debug("orderbook deployed", address);

        const client = new OmxCwOrderbookClient(this.client as any, this.deployer, address);
        this.executeClients.push(client);

        return {
            client,
            queryClient: new OmxCwOrderbookQueryClient(this.client as any, address),
            address,
        };
    }


    private static getContractAddr(contract: Contract | string): string {
        return typeof contract === "string" ? contract : contract.address;
    }
}