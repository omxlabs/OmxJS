import { bech32 } from "bech32";
import { OmxCwBaseTokenClient, OmxCwPriceFeedClient, OmxCwRouterClient, OmxCwVaultClient, OmxCwVaultPriceFeedClient } from "../src";
import { ETH_SCALE, ORACLE_PRICE_PRECISION, PRICE_PRECISION, TestApp, USDC_SCALE } from "./helpers/test-app";

const printState = async (app: TestApp, users: string[], msg: string) => {
    let resMsg = msg;
    for (const user of users) {
        const decoded = bech32.fromWords(bech32.decode(user).words);
        const parsed = Buffer.from(decoded).toString("utf8");
        resMsg += `\n\tacc ${parsed}:`;
        resMsg += `\n\t\tETH: ${(await app.eth.queryClient.balance({ address: user })).balance}`;
        resMsg += `\n\t\tUSDC: ${(await app.usdc.queryClient.balance({ address: user })).balance}`;
        resMsg += `\n\t\tUSDO: ${(await app.usdo.queryClient.balance({ address: user })).balance}`;
    }

    resMsg += `\n\tPool:`;
    resMsg += `\n\t\tETH: ${(await app.eth.queryClient.balance({ address: app.vault.address })).balance}`;
    resMsg += `\n\t\tUSDC: ${(await app.usdc.queryClient.balance({ address: app.vault.address })).balance}`;
    resMsg += `\n\t\tUSDO: ${(await app.usdo.queryClient.balance({ address: app.vault.address })).balance}`;

    console.debug(resMsg);
}

describe("Integration", () => {
    it("Example 1: Trader long, wins", async () => {
        const app = await TestApp.init();

        const user0 = app.createAccount("user0");

        const ethPrice = 1000n;
        const initialPoolAmountEth = ETH_SCALE * 10n;
        const initialPoolAmountUsdc = 10_000n * USDC_SCALE;
        const amountInEth = 1n * ETH_SCALE;
        const sizeDelta = (10n * ethPrice * PRICE_PRECISION); // 10x leverage

        // update eth to usd price
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (ethPrice * ORACLE_PRICE_PRECISION).toString() },
        });

        // mint amountIn of eth to the user
        await app.eth.client.mint({ amount: amountInEth.toString(), recipient: user0 });

        // mint tokens to the vault
        await app.eth.client.mint({
            amount: initialPoolAmountEth.toString(),
            recipient: app.vault.address,
        });
        await app.usdc.client.mint({
            amount: initialPoolAmountUsdc.toString(),
            recipient: app.vault.address,
        });

        // deposit minted tokens to the pool
        await app.vault.client.directPoolDeposit({ token: app.eth.address });
        await app.vault.client.directPoolDeposit({ token: app.usdc.address });


        // set sender to user0, from now on all transactions will be signed by user0
        app.setSender(user0);

        // allow router to spend osmo from user0
        await app.eth.client.increaseAllowance({ amount: amountInEth.toString(), spender: app.router.address });
        // allow router to use vault for user0
        await app.vault.client.addRouter({ router: app.router.address });


        await printState(app, [user0], "Initial state");

        // check initial balances
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", amountInEth.toString());
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());

        // open position
        await app.router.client.increasePosition({
            amountIn: amountInEth.toString(),
            collateral: { token: app.eth.address },
            indexToken: app.eth.address,
            isLong: true,
            minOut: "0",
            price: (ethPrice * PRICE_PRECISION).toString(),
            // 10x leverage
            sizeDelta: sizeDelta.toString(),
        });

        await printState(app, [user0], "After opening position");

        // check balances after opening position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountEth + amountInEth).toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());

        // set sender back to the admin
        app.resetSender();

        // change eth price to 2x
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (ethPrice * 2n * ORACLE_PRICE_PRECISION).toString() },
        });

        // set sender to user0 again
        app.setSender(user0);

        // close the position
        await app.router.client.decreasePosition({
            collateralDelta: amountInEth.toString(),
            collateralToken: app.eth.address,
            indexToken: app.eth.address,
            isLong: true,
            price: (ethPrice * 2n * PRICE_PRECISION).toString(),
            recipient: user0,
            sizeDelta: sizeDelta.toString(),
        });


        const expectedAmountOut = 5490000000000000000n;

        await printState(app, [user0], "After closing position");

        // check balances after closing position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", expectedAmountOut.toString());
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountEth + amountInEth - expectedAmountOut).toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());
    });

    it("Example 2: Trader long, wins", async () => {
        const app = await TestApp.init();

        const user0 = app.createAccount("user0");

        const ethPrice = 1000n;
        const initialPoolAmountEth = ETH_SCALE * 10n;
        const initialPoolAmountUsdc = 10_000n * USDC_SCALE;
        const amountInEth = 1n * ETH_SCALE;
        const sizeDelta = 10n * ethPrice * PRICE_PRECISION; // 10x leverage

        // update eth to usd price
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (ethPrice * ORACLE_PRICE_PRECISION).toString() },
        });

        // mint amountIn of eth to the user
        await app.eth.client.mint({ amount: amountInEth.toString(), recipient: user0 });

        // mint tokens to the vault
        await app.eth.client.mint({
            amount: initialPoolAmountEth.toString(),
            recipient: app.vault.address,
        });
        await app.usdc.client.mint({
            amount: initialPoolAmountUsdc.toString(),
            recipient: app.vault.address,
        });

        // deposit minted tokens to the pool
        await app.vault.client.directPoolDeposit({ token: app.eth.address });
        await app.vault.client.directPoolDeposit({ token: app.usdc.address });


        // set sender to user0, from now on all transactions will be signed by user0
        app.setSender(user0);

        // allow router to spend osmo from user0
        await app.eth.client.increaseAllowance({ amount: amountInEth.toString(), spender: app.router.address });
        // allow router to use vault for user0
        await app.vault.client.addRouter({ router: app.router.address });


        await printState(app, [user0], "Initial state");

        // check initial balances
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", amountInEth.toString());
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());

        // open position
        await app.router.client.increasePosition({
            amountIn: amountInEth.toString(),
            collateral: { token: app.eth.address },
            indexToken: app.eth.address,
            isLong: true,
            minOut: "0",
            price: (ethPrice * PRICE_PRECISION).toString(),
            sizeDelta: sizeDelta.toString(),
        });

        await printState(app, [user0], "After opening position");

        // check balances after opening position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountEth + amountInEth).toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());

        // set sender back to the admin
        app.resetSender();

        // change eth price to 5x
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (ethPrice * 5n * ORACLE_PRICE_PRECISION).toString() },
        });

        // set sender to user0 again
        app.setSender(user0);

        // close the position
        await app.router.client.decreasePosition({
            collateralDelta: amountInEth.toString(),
            collateralToken: app.eth.address,
            indexToken: app.eth.address,
            isLong: true,
            price: (ethPrice * 5n * PRICE_PRECISION).toString(),
            recipient: user0,
            sizeDelta: sizeDelta.toString(),
        });


        const expectedAmountOut = 8196000000000000000n;

        await printState(app, [user0], "After closing position");

        // check balances after closing position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", expectedAmountOut.toString());
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountEth + amountInEth - expectedAmountOut).toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());
    });

    it("Example 3: Trader short, wins", async () => {
        const app = await TestApp.init();

        const user0 = app.createAccount("user0");

        const ethPrice = 1000n;
        const initialPoolAmountEth = ETH_SCALE * 10n;
        const initialPoolAmountUsdc = 10_000n * USDC_SCALE;
        const amountInUsdc = 1000n * USDC_SCALE;
        const sizeDelta = 10n * ethPrice * PRICE_PRECISION; // 10x leverage

        // update eth to usd price
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (ethPrice * ORACLE_PRICE_PRECISION).toString() },
        });

        // mint amountIn of eth to the user
        await app.usdc.client.mint({ amount: amountInUsdc.toString(), recipient: user0 });

        // mint tokens to the vault
        await app.eth.client.mint({
            amount: initialPoolAmountEth.toString(),
            recipient: app.vault.address,
        });
        await app.usdc.client.mint({
            amount: initialPoolAmountUsdc.toString(),
            recipient: app.vault.address,
        });

        // deposit minted tokens to the pool
        await app.vault.client.directPoolDeposit({ token: app.eth.address });
        await app.vault.client.directPoolDeposit({ token: app.usdc.address });


        // set sender to user0, from now on all transactions will be signed by user0
        app.setSender(user0);

        // allow router to spend osmo from user0
        await app.usdc.client.increaseAllowance({ amount: amountInUsdc.toString(), spender: app.router.address });
        // allow router to use vault for user0
        await app.vault.client.addRouter({ router: app.router.address });


        await printState(app, [user0], "Initial state");

        // check initial balances
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", amountInUsdc.toString());
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());

        // open position
        await app.router.client.increasePosition({
            amountIn: amountInUsdc.toString(),
            collateral: { token: app.usdc.address },
            indexToken: app.eth.address,
            isLong: false,
            minOut: "0",
            price: (ethPrice * PRICE_PRECISION).toString(),
            sizeDelta: sizeDelta.toString(),
        });

        await printState(app, [user0], "After opening position");

        // check balances after opening position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountUsdc + amountInUsdc).toString());

        // set sender back to the admin
        app.resetSender();

        // change eth price to 0.5x
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (ethPrice * ORACLE_PRICE_PRECISION / 2n).toString() },
        });

        // set sender to user0 again
        app.setSender(user0);

        // close the position
        await app.router.client.decreasePosition({
            collateralDelta: amountInUsdc.toString(),
            collateralToken: app.usdc.address,
            indexToken: app.eth.address,
            isLong: false,
            price: (ethPrice * PRICE_PRECISION / 2n).toString(),
            recipient: user0,
            sizeDelta: sizeDelta.toString(),
        });

        const expectedAmountOut = 5980_000000n;

        await printState(app, [user0], "After closing position");

        // check balances after closing position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", expectedAmountOut.toString());
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountUsdc + amountInUsdc - expectedAmountOut).toString());
    });


    it("Example 4: Trader short, wins", async () => {
        const app = await TestApp.init();

        const user0 = app.createAccount("user0");

        const ethPrice = 1000n;
        const initialPoolAmountEth = ETH_SCALE * 10n;
        const initialPoolAmountUsdc = 10_000n * USDC_SCALE;
        const amountInUsdc = 1000n * USDC_SCALE;
        const sizeDelta = 10n * ethPrice * PRICE_PRECISION; // 10x leverage

        // update eth to usd price
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (ethPrice * ORACLE_PRICE_PRECISION).toString() },
        });

        // mint amountIn of eth to the user
        await app.usdc.client.mint({ amount: amountInUsdc.toString(), recipient: user0 });

        // mint tokens to the vault
        await app.eth.client.mint({
            amount: initialPoolAmountEth.toString(),
            recipient: app.vault.address,
        });
        await app.usdc.client.mint({
            amount: initialPoolAmountUsdc.toString(),
            recipient: app.vault.address,
        });

        // deposit minted tokens to the pool
        await app.vault.client.directPoolDeposit({ token: app.eth.address });
        await app.vault.client.directPoolDeposit({ token: app.usdc.address });


        // set sender to user0, from now on all transactions will be signed by user0
        app.setSender(user0);

        // allow router to spend osmo from user0
        await app.usdc.client.increaseAllowance({ amount: amountInUsdc.toString(), spender: app.router.address });
        // allow router to use vault for user0
        await app.vault.client.addRouter({ router: app.router.address });


        await printState(app, [user0], "Initial state");

        // check initial balances
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", amountInUsdc.toString());
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());

        // open position
        await app.router.client.increasePosition({
            amountIn: amountInUsdc.toString(),
            collateral: { token: app.usdc.address },
            indexToken: app.eth.address,
            isLong: false,
            minOut: "0",
            price: (ethPrice * PRICE_PRECISION).toString(),
            sizeDelta: sizeDelta.toString(),
        });

        await printState(app, [user0], "After opening position");

        // check balances after opening position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountUsdc + amountInUsdc).toString());

        // set sender back to the admin
        app.resetSender();

        // change eth price to 0.1x
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (ethPrice * ORACLE_PRICE_PRECISION / 10n).toString() },
        });

        // set sender to user0 again
        app.setSender(user0);

        // close the position
        await app.router.client.decreasePosition({
            collateralDelta: amountInUsdc.toString(),
            collateralToken: app.usdc.address,
            indexToken: app.eth.address,
            isLong: false,
            price: (ethPrice * PRICE_PRECISION / 2n).toString(),
            recipient: user0,
            sizeDelta: sizeDelta.toString(),
        });

        const expectedAmountOut = 9980_000000n;

        await printState(app, [user0], "After closing position");

        // check balances after closing position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", expectedAmountOut.toString());
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountUsdc + amountInUsdc - expectedAmountOut).toString());
    });

    it("Example 5: Trader long, losses", async () => {
        const app = await TestApp.init();

        const user0 = app.createAccount("user0");

        const ethPrice = 1000n;
        const initialPoolAmountEth = ETH_SCALE * 10n;
        const initialPoolAmountUsdc = 10_000n * USDC_SCALE;
        const amountInEth = 1n * ETH_SCALE;
        const sizeDelta = (10n * ethPrice * PRICE_PRECISION); // 10x leverage

        // update eth to usd price
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (ethPrice * ORACLE_PRICE_PRECISION).toString() },
        });

        // mint amountIn of eth to the user
        await app.eth.client.mint({ amount: amountInEth.toString(), recipient: user0 });

        // mint tokens to the vault
        await app.eth.client.mint({
            amount: initialPoolAmountEth.toString(),
            recipient: app.vault.address,
        });
        await app.usdc.client.mint({
            amount: initialPoolAmountUsdc.toString(),
            recipient: app.vault.address,
        });

        // deposit minted tokens to the pool
        await app.vault.client.directPoolDeposit({ token: app.eth.address });
        await app.vault.client.directPoolDeposit({ token: app.usdc.address });


        // set sender to user0, from now on all transactions will be signed by user0
        app.setSender(user0);

        // allow router to spend osmo from user0
        await app.eth.client.increaseAllowance({ amount: amountInEth.toString(), spender: app.router.address });
        // allow router to use vault for user0
        await app.vault.client.addRouter({ router: app.router.address });


        await printState(app, [user0], "Initial state");

        // check initial balances
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", amountInEth.toString());
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());

        // open position
        await app.router.client.increasePosition({
            amountIn: amountInEth.toString(),
            collateral: { token: app.eth.address },
            indexToken: app.eth.address,
            isLong: true,
            minOut: "0",
            price: (ethPrice * PRICE_PRECISION).toString(),
            // 10x leverage
            sizeDelta: sizeDelta.toString(),
        });

        await printState(app, [user0], "After opening position");

        // check balances after opening position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountEth + amountInEth).toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());

        // set sender back to the admin
        app.resetSender();

        // change eth price from 1,000 to 900
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (900n * ORACLE_PRICE_PRECISION).toString() },
        });

        const liquidator = app.createAccount("liquidator");
        app.vault.client.setIsLiquidator({ account: liquidator, value: true });

        // set sender to user0 again
        app.setSender(user0);


        await app.vault.client.liquidatePosition({
            account: user0,
            collateralToken: app.eth.address,
            feeRecipient: liquidator,
            indexToken: app.eth.address,
            isLong: true,
        });

        await printState(app, [user0, liquidator], "After closing position");

        const liquidatorFeesEth = 555555555555555n;

        // check balances after closing position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: liquidator })).toHaveProperty("balance", liquidatorFeesEth.toString());
        expect(await app.usdc.queryClient.balance({ address: liquidator })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountEth + amountInEth - liquidatorFeesEth).toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());
    });

    it("Example 6: Trader short, losses", async () => {
        const app = await TestApp.init();

        const user0 = app.createAccount("user0");

        const ethPrice = 1000n;
        const initialPoolAmountEth = ETH_SCALE * 10n;
        const initialPoolAmountUsdc = 10_000n * USDC_SCALE;
        const amountInUsdc = 1000n * USDC_SCALE;
        const sizeDelta = 10n * ethPrice * PRICE_PRECISION; // 10x leverage

        // update eth to usd price
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (ethPrice * ORACLE_PRICE_PRECISION).toString() },
        });

        // mint amountIn of eth to the user
        await app.usdc.client.mint({ amount: amountInUsdc.toString(), recipient: user0 });

        // mint tokens to the vault
        await app.eth.client.mint({
            amount: initialPoolAmountEth.toString(),
            recipient: app.vault.address,
        });
        await app.usdc.client.mint({
            amount: initialPoolAmountUsdc.toString(),
            recipient: app.vault.address,
        });

        // deposit minted tokens to the pool
        await app.vault.client.directPoolDeposit({ token: app.eth.address });
        await app.vault.client.directPoolDeposit({ token: app.usdc.address });


        // set sender to user0, from now on all transactions will be signed by user0
        app.setSender(user0);

        // allow router to spend osmo from user0
        await app.usdc.client.increaseAllowance({ amount: amountInUsdc.toString(), spender: app.router.address });
        // allow router to use vault for user0
        await app.vault.client.addRouter({ router: app.router.address });


        await printState(app, [user0], "Initial state");

        // check initial balances
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", amountInUsdc.toString());
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountUsdc.toString());

        // open position
        await app.router.client.increasePosition({
            amountIn: amountInUsdc.toString(),
            collateral: { token: app.usdc.address },
            indexToken: app.eth.address,
            isLong: false,
            minOut: "0",
            price: (ethPrice * PRICE_PRECISION).toString(),
            sizeDelta: sizeDelta.toString(),
        });

        await printState(app, [user0], "After opening position");

        // check balances after opening position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountUsdc + amountInUsdc).toString());

        // set sender back to the admin
        app.resetSender();

        // change eth price from 1,000 to 1,100
        await app.ethPriceFeed.client.setLatestAnswer({
            answer: { positive: true, value: (1100n * ORACLE_PRICE_PRECISION).toString() },
        });

        const liquidator = app.createAccount("liquidator");
        app.vault.client.setIsLiquidator({ account: liquidator, value: true });

        // set sender to user0 again
        app.setSender(user0);


        await app.vault.client.liquidatePosition({
            account: user0,
            collateralToken: app.usdc.address,
            feeRecipient: liquidator,
            indexToken: app.eth.address,
            isLong: false,
        });

        await printState(app, [user0, liquidator], "After closing position");

        const liquidatorFeesUsdc = 500000n;

        // check balances after closing position
        expect(await app.eth.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: user0 })).toHaveProperty("balance", "0");
        expect(await app.eth.queryClient.balance({ address: liquidator })).toHaveProperty("balance", "0");
        expect(await app.usdc.queryClient.balance({ address: liquidator })).toHaveProperty("balance", liquidatorFeesUsdc.toString());
        expect(await app.eth.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", initialPoolAmountEth.toString());
        expect(await app.usdc.queryClient.balance({ address: app.vault.address }))
            .toHaveProperty("balance", (initialPoolAmountUsdc + amountInUsdc - liquidatorFeesUsdc).toString());
    });


    it("Deposit", async () => {
        const app = await TestApp.init();

        const vaultAddress = app.vault.address;
        const routerAddress = app.router.address;
        const ethAddress = app.eth.address;
        const usdoAddress = app.usdo.address;
        const cwClient = app.getSigningCwClient();
        const user0 = app.createAccount("user0");

        // mint tokens to the vault
        await app.eth.client.mint({
            amount: ETH_SCALE.toString(),
            recipient: user0,
        });

        app.setSender(user0);

        const vaultClient = new OmxCwVaultClient(cwClient, user0, vaultAddress);
        const routerClient = new OmxCwRouterClient(cwClient, user0, routerAddress);
        const ethClient = new OmxCwBaseTokenClient(cwClient, user0, ethAddress);

        await printState(app, [user0], "Initial state");

        await ethClient.increaseAllowance({ amount: ETH_SCALE.toString(), spender: routerAddress });
        await vaultClient.addRouter({ router: routerAddress });

        // deposit ETH to the vault
        await routerClient.swap({
            recipient: user0, amountIn: ETH_SCALE.toString(), minOut: "0", path: {
                direct: {
                    token_in: ethAddress,
                    token_out: usdoAddress,
                }
            }
        });


        await printState(app, [user0], "After deposit");
    });

    it("Withdraw", async () => {
        const app = await TestApp.init();

        const vaultAddress = app.vault.address;
        const routerAddress = app.router.address;
        const ethAddress = app.eth.address;
        const usdoAddress = app.usdo.address;
        const cwClient = app.getSigningCwClient();
        const user0 = app.createAccount("user0");

        // mint tokens to the vault
        await app.eth.client.mint({
            amount: ETH_SCALE.toString(),
            recipient: user0,
        });

        app.setSender(user0);

        const vaultClient = new OmxCwVaultClient(cwClient, user0, vaultAddress);
        const routerClient = new OmxCwRouterClient(cwClient, user0, routerAddress);
        const ethClient = new OmxCwBaseTokenClient(cwClient, user0, ethAddress);
        const usdoClient = new OmxCwBaseTokenClient(cwClient, user0, usdoAddress);

        await printState(app, [user0], "Initial state");

        const amountIn = ETH_SCALE;

        await ethClient.increaseAllowance({ amount: amountIn.toString(), spender: routerAddress });
        await vaultClient.addRouter({ router: routerAddress });

        // deposit ETH to the vault
        await routerClient.swap({
            recipient: user0, amountIn: amountIn.toString(), minOut: "0", path: {
                direct: {
                    token_in: ethAddress,
                    token_out: usdoAddress,
                }
            }
        });


        await printState(app, [user0], "After deposit");

        const { balance: usdoAmount } = await app.usdo.queryClient.balance({ address: user0 });

        await usdoClient.increaseAllowance({ amount: usdoAmount, spender: routerAddress });

        // swap back to withdraw ETH
        await routerClient.swap({
            recipient: user0,
            amountIn: usdoAmount,
            minOut: "0",
            path: {
                direct: {
                    token_in: usdoAddress,
                    token_out: ethAddress,
                }
            }
        });


        await printState(app, [user0], "After withdraw");
    });


    it("Position (Increase,decrease)", async () => {
        const app = await TestApp.init();

        const vaultAddress = app.vault.address;
        const routerAddress = app.router.address;
        const ethAddress = app.eth.address;
        const usdcAddress = app.usdc.address;
        const cwClient = app.getSigningCwClient();
        const user0 = app.createAccount("user0");

        // mint tokens to the vault
        await app.eth.client.mint({
            amount: ETH_SCALE.toString(),
            recipient: user0,
        });

        await app.eth.client.mint({
            amount: (1000n * ETH_SCALE).toString(),
            recipient: vaultAddress,
        });
        await app.vault.client.directPoolDeposit({ token: ethAddress });

        app.setSender(user0);


        const minEthPrice = 1n * PRICE_PRECISION;

        const vaultClient = new OmxCwVaultClient(cwClient, user0, vaultAddress);
        const routerClient = new OmxCwRouterClient(cwClient, user0, routerAddress);
        const ethClient = new OmxCwBaseTokenClient(cwClient, user0, ethAddress);

        await printState(app, [user0], "Initial state");

        const amountIn = ETH_SCALE;

        await vaultClient.addRouter({ router: routerAddress });

        await ethClient.increaseAllowance({ amount: amountIn.toString(), spender: routerAddress });

        await routerClient.increasePosition({
            collateral: {
                token: ethAddress,
            },
            indexToken: ethAddress,
            isLong: true,
            price: minEthPrice.toString(),
            amountIn: amountIn.toString(),
            minOut: "0",
            sizeDelta: (PRICE_PRECISION * 9n).toString(),
        });

        const position = await vaultClient.position({
            account: user0,
            indexToken: ethAddress,
            collateralToken: ethAddress,
            isLong: true,
        });

        console.log("position", position);

        expect(BigInt(position.size)).toEqual(PRICE_PRECISION * 9n);

        await printState(app, [user0], "After open position");

        await routerClient.decreasePosition({
            collateralToken: ethAddress,
            indexToken: ethAddress,
            isLong: true,
            price: minEthPrice.toString(),
            collateralDelta: position.collateral.toString(),
            recipient: user0,
            sizeDelta: (PRICE_PRECISION * 9n).toString(),
        });

        await printState(app, [user0], "After close position");
    });


    it("Position (Increase,decrease)", async () => {
        const app = await TestApp.init();

        const ethPriceFeedAddress = app.ethPriceFeed.address;
        const ethAddress = app.eth.address;
        const vaultPriceFeedAddress = app.vaultPriceFeed.address;

        const cwClient = app.getSigningCwClient();

        const ethPriceFeedClient = new OmxCwPriceFeedClient(cwClient, app.deployer, ethPriceFeedAddress);
        const vaultPriceFeedClient = new OmxCwVaultPriceFeedClient(cwClient, app.deployer, vaultPriceFeedAddress);

        const initialPrice = await vaultPriceFeedClient.price({ token: ethAddress, includeAmmPrice: true, maximize: true });
        expect(initialPrice).toEqual(PRICE_PRECISION.toString());

        const newPrice = BigInt(initialPrice) * 2n;
        await ethPriceFeedClient.setLatestAnswer({ answer: { value: newPrice.toString(), positive: true } });

        const updatedPrice = await vaultPriceFeedClient.price({ token: ethAddress, includeAmmPrice: true, maximize: true });
        expect(updatedPrice).toEqual((newPrice * PRICE_PRECISION / ORACLE_PRICE_PRECISION).toString());

        await vaultPriceFeedClient.price
    });
});
