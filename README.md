# OMX typescript client

Typescript client for the [OMX](https://www.omxapp.com/)

## Examples

Simple example of creating a position with the client:

```typescript
import { OmxCwRouterClient, OmxCwVaultClient } from "omxjs";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

// replace with the addresses of the contracts on your chain
const vaultAddress = "osmo1wtzqlaftl9ckd6r8hrscke200qs08k2q79xxm96qmnexrvhw20wsnxu8sf";
const routerAddress = "osmo16vjqj8yvm9tgjjmmengenuz29zt2enjytzq4yvmy908s28ze5lxqgpael2";
const osmoAddress = "osmo1je8h6m8zve079knpazatp338w308233h7mt73ucwzhndqadmtrksx22nms";

const ownAddress = "osmo1a..."; // replace with your address
const cwClient: SigningCosmWasmClient = ...; // create a client for the chain with signer you prefer

const vaultClient = new OmxCwVaultClient(cwClient, ownAddress, vaultAddress);
const routerClient = new OmxCwRouterClient(cwClient, ownAddress, routerAddress);

// In real world this should be the price from the oracle with 18 decimals precision
const priceInUsd = BigInt(1e18);

const amountIn = BigInt(100e6); // 100 uosmo
const leverage = 3n; // 3x leverage

// Add router to the vault
await vaultClient.addRouter({ router: routerAddress });

// Create position
await routerClient.increasePositionOsmo({
    collateral: {
        token: osmoAddress,
    },
    indexToken: osmoAddress,
    isLong: true,
    price: priceInUsd.toString(),
    minOut: "0",
    sizeDelta: (priceInUsd * leverage).toString(),
}, "auto", "", [{ denom: "uosmo", amount: amountIn.toString()}]);

// Check the position
const position = await vaultClient.position({
    account: ownAddress,
    indexToken: osmoAddress,
    collateralToken: osmoAddress,
    isLong: true,
});

console.log("position", position);
```

## Code generation

### Requirements

- [cargo-make](https://crates.io/crates/cargo-make/0.3.54)

### Generate code

```bash
npm i
npm run code-gen
```

## Tests

Before running the tests, you need to [compile wasm binaries](https://github.com/chadury2021/gmx_wasm#check-everything-and-build) for the contracts.
Alternatively you can use the binaries in the [actions artifacts](https://github.com/chadury2021/gmx_wasm/actions).

In any case, you need to copy all the `.wasm` files to the `./artifacts` folder (if you don't have it, create it).

### Run tests

```bash
npm i

npm test
```
