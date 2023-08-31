# OMX typescript api

Typescript client for interacting with [OMX](https://www.omxapp.com/) contracts.

[![ReadTheDocs](https://readthedocs.org/projects/switcheo-python/badge/?version=latest)](https://docs.omxapp.com)
[![license](https://img.shields.io/npm/l/omxjs.svg)](https://github.com/omxlabs/omxjs/blob/master/LICENSE.md)
[![npm](https://img.shields.io/node/v/omxjs.svg)](https://www.npmjs.com/package/omxjs)
[![npm](https://img.shields.io/npm/dt/omxjs.svg)](https://www.npmjs.com/package/omxjs)

## Installation

## Requirements

- node >= 16, highly recommend to use [nvm](https://github.com/nvm-sh/nvm) (or [nvm-windows](https://github.com/coreybutler/nvm-windows))
- [Osmosis localnet](https://github.com/osmosis-labs/osmosis/tree/main/tests/localosmosis) for testing

```bash
npm i omxjs
```

## Examples

Simple example of creating a position with the client:

```typescript
import { OmxCwRouterClient, OmxCwVaultClient } from "omxjs";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

// replace with the addresses of the contracts on your chain
const vaultAddress = "osmo1...";
const routerAddress = "osmo1...";
const osmoAddress = "osmo1...";

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
# generate code for specific tag
npm run code-gen v0.0.11
```
