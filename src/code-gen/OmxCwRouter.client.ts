/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { InstantiateMsg, ExecuteMsg, Uint128, Addr, PositionCollateral, SwapPath, SetAdminExec, DecreasePositionOsmoCbExec, DecreasePositionOsmoExec, IncreasePositionOsmoExec, IncreasePositionExec, IncreasePositionIndirectCbExec, DecreasePositionExec, IncreasePositionInternalExec, DecreasePositionInternalExec, SwapInternalCbExec, SwapTokensToOsmoExec, SwapTokensToOsmoCbExec, SwapOsmoToTokensCbExec, SwapOsmoToTokensExec, TransferOutOsmoExec, TransferOsmoToVaultExec, AddPluginExec, SwapInternalExec, RemovePluginExec, ApprovePluginExec, DenyPluginExec, PluginTransferExec, PluginIncreasePositionExec, PluginDecreasePositionExec, DirectPoolDepositExec, VaultSwapExec, VaultSwapCbExec, SwapExec, QueryMsg, AdminQuery, ApprovedPluginQuery, HasPluginQuery, Boolean } from "./OmxCwRouter.types";
export interface OmxCwRouterReadOnlyInterface {
  contractAddress: string;
  approvedPlugin: ({
    account,
    plugin
  }: {
    account: string;
    plugin: string;
  }) => Promise<Boolean>;
  hasPlugin: ({
    plugin
  }: {
    plugin: string;
  }) => Promise<Boolean>;
  admin: () => Promise<Addr>;
}
export class OmxCwRouterQueryClient implements OmxCwRouterReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.approvedPlugin = this.approvedPlugin.bind(this);
    this.hasPlugin = this.hasPlugin.bind(this);
    this.admin = this.admin.bind(this);
  }

  approvedPlugin = async ({
    account,
    plugin
  }: {
    account: string;
    plugin: string;
  }): Promise<Boolean> => {
    return this.client.queryContractSmart(this.contractAddress, {
      approved_plugin: {
        account,
        plugin
      }
    });
  };
  hasPlugin = async ({
    plugin
  }: {
    plugin: string;
  }): Promise<Boolean> => {
    return this.client.queryContractSmart(this.contractAddress, {
      has_plugin: {
        plugin
      }
    });
  };
  admin = async (): Promise<Addr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      admin: {}
    });
  };
}
export interface OmxCwRouterInterface extends OmxCwRouterReadOnlyInterface {
  contractAddress: string;
  sender: string;
  setAdmin: ({
    newAdmin
  }: {
    newAdmin: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  decreasePositionOsmoCb: ({
    balanceBefore,
    collateralToken,
    recipient
  }: {
    balanceBefore: Uint128;
    collateralToken: Addr;
    recipient: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  decreasePositionOsmo: ({
    collateralDelta,
    collateralToken,
    indexToken,
    isLong,
    price,
    recipient,
    sizeDelta
  }: {
    collateralDelta: Uint128;
    collateralToken: string;
    indexToken: string;
    isLong: boolean;
    price: Uint128;
    recipient: string;
    sizeDelta: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  increasePositionOsmo: ({
    collateral,
    indexToken,
    isLong,
    minOut,
    price,
    sizeDelta
  }: {
    collateral: PositionCollateral;
    indexToken: string;
    isLong: boolean;
    minOut: Uint128;
    price: Uint128;
    sizeDelta: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  increasePosition: ({
    amountIn,
    collateral,
    indexToken,
    isLong,
    minOut,
    price,
    sizeDelta
  }: {
    amountIn: Uint128;
    collateral: PositionCollateral;
    indexToken: string;
    isLong: boolean;
    minOut: Uint128;
    price: Uint128;
    sizeDelta: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  increasePositionIndirectCb: ({
    balanceBefore,
    indexToken,
    isLong,
    price,
    sizeDelta,
    tokenOut
  }: {
    balanceBefore: Uint128;
    indexToken: Addr;
    isLong: boolean;
    price: Uint128;
    sizeDelta: Uint128;
    tokenOut: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  decreasePosition: ({
    collateralDelta,
    collateralToken,
    indexToken,
    isLong,
    price,
    recipient,
    sizeDelta
  }: {
    collateralDelta: Uint128;
    collateralToken: string;
    indexToken: string;
    isLong: boolean;
    price: Uint128;
    recipient: string;
    sizeDelta: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  increasePositionInternal: ({
    account,
    collateralToken,
    indexToken,
    isLong,
    price,
    sizeDelta
  }: {
    account: Addr;
    collateralToken: Addr;
    indexToken: Addr;
    isLong: boolean;
    price: Uint128;
    sizeDelta: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  decreasePositionInternal: ({
    collateralDelta,
    collateralToken,
    indexToken,
    isLong,
    owner,
    price,
    recipient,
    sizeDelta
  }: {
    collateralDelta: Uint128;
    collateralToken: Addr;
    indexToken: Addr;
    isLong: boolean;
    owner: Addr;
    price: Uint128;
    recipient: Addr;
    sizeDelta: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  swapInternalCb: ({
    intermediate,
    intermediateBalanceBefore,
    minOut,
    recipient,
    tokenOut
  }: {
    intermediate: Addr;
    intermediateBalanceBefore: Uint128;
    minOut: Uint128;
    recipient: Addr;
    tokenOut: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  swapTokensToOsmo: ({
    amountIn,
    minOut,
    path,
    recipient
  }: {
    amountIn: Uint128;
    minOut: Uint128;
    path: SwapPath;
    recipient: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  swapTokensToOsmoCb: ({
    amountIn,
    balanceBefore,
    recipient,
    tokenIn,
    tokenOut
  }: {
    amountIn: Uint128;
    balanceBefore: Uint128;
    recipient: Addr;
    tokenIn: Addr;
    tokenOut: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  swapOsmoToTokensCb: ({
    amountIn,
    balanceBefore,
    recipient,
    tokenIn,
    tokenOut
  }: {
    amountIn: Uint128;
    balanceBefore: Uint128;
    recipient: Addr;
    tokenIn: Addr;
    tokenOut: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  swapOsmoToTokens: ({
    minOut,
    path,
    recipient
  }: {
    minOut: Uint128;
    path: SwapPath;
    recipient: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  transferOutOsmo: ({
    amountOut,
    recipient
  }: {
    amountOut: Uint128;
    recipient: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  transferOsmoToVault: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  addPlugin: ({
    plugin
  }: {
    plugin: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  swapInternal: ({
    minOut,
    path,
    recipient
  }: {
    minOut: Uint128;
    path: SwapPath;
    recipient: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  removePlugin: ({
    plugin
  }: {
    plugin: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  approvePlugin: ({
    plugin
  }: {
    plugin: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  denyPlugin: ({
    plugin
  }: {
    plugin: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  pluginTransfer: ({
    amount,
    owner,
    recipient,
    token
  }: {
    amount: Uint128;
    owner: string;
    recipient: string;
    token: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  pluginIncreasePosition: ({
    account,
    collateralToken,
    indexToken,
    isLong,
    sizeDelta
  }: {
    account: string;
    collateralToken: string;
    indexToken: string;
    isLong: boolean;
    sizeDelta: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  pluginDecreasePosition: ({
    account,
    collateralDelta,
    collateralToken,
    indexToken,
    isLong,
    recipient,
    sizeDelta
  }: {
    account: string;
    collateralDelta: Uint128;
    collateralToken: string;
    indexToken: string;
    isLong: boolean;
    recipient: string;
    sizeDelta: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  directPoolDeposit: ({
    amount,
    token
  }: {
    amount: Uint128;
    token: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  vaultSwap: ({
    minOut,
    recipient,
    tokenIn,
    tokenOut
  }: {
    minOut: Uint128;
    recipient: Addr;
    tokenIn: Addr;
    tokenOut: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  vaultSwapCb: ({
    balanceBefore,
    minOut,
    recipient,
    tokenOut
  }: {
    balanceBefore: Uint128;
    minOut: Uint128;
    recipient: Addr;
    tokenOut: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  swap: ({
    amountIn,
    minOut,
    path,
    recipient
  }: {
    amountIn: Uint128;
    minOut: Uint128;
    path: SwapPath;
    recipient: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class OmxCwRouterClient extends OmxCwRouterQueryClient implements OmxCwRouterInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.setAdmin = this.setAdmin.bind(this);
    this.decreasePositionOsmoCb = this.decreasePositionOsmoCb.bind(this);
    this.decreasePositionOsmo = this.decreasePositionOsmo.bind(this);
    this.increasePositionOsmo = this.increasePositionOsmo.bind(this);
    this.increasePosition = this.increasePosition.bind(this);
    this.increasePositionIndirectCb = this.increasePositionIndirectCb.bind(this);
    this.decreasePosition = this.decreasePosition.bind(this);
    this.increasePositionInternal = this.increasePositionInternal.bind(this);
    this.decreasePositionInternal = this.decreasePositionInternal.bind(this);
    this.swapInternalCb = this.swapInternalCb.bind(this);
    this.swapTokensToOsmo = this.swapTokensToOsmo.bind(this);
    this.swapTokensToOsmoCb = this.swapTokensToOsmoCb.bind(this);
    this.swapOsmoToTokensCb = this.swapOsmoToTokensCb.bind(this);
    this.swapOsmoToTokens = this.swapOsmoToTokens.bind(this);
    this.transferOutOsmo = this.transferOutOsmo.bind(this);
    this.transferOsmoToVault = this.transferOsmoToVault.bind(this);
    this.addPlugin = this.addPlugin.bind(this);
    this.swapInternal = this.swapInternal.bind(this);
    this.removePlugin = this.removePlugin.bind(this);
    this.approvePlugin = this.approvePlugin.bind(this);
    this.denyPlugin = this.denyPlugin.bind(this);
    this.pluginTransfer = this.pluginTransfer.bind(this);
    this.pluginIncreasePosition = this.pluginIncreasePosition.bind(this);
    this.pluginDecreasePosition = this.pluginDecreasePosition.bind(this);
    this.directPoolDeposit = this.directPoolDeposit.bind(this);
    this.vaultSwap = this.vaultSwap.bind(this);
    this.vaultSwapCb = this.vaultSwapCb.bind(this);
    this.swap = this.swap.bind(this);
  }

  setAdmin = async ({
    newAdmin
  }: {
    newAdmin: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_admin: {
        new_admin: newAdmin
      }
    }, fee, memo, _funds);
  };
  decreasePositionOsmoCb = async ({
    balanceBefore,
    collateralToken,
    recipient
  }: {
    balanceBefore: Uint128;
    collateralToken: Addr;
    recipient: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      decrease_position_osmo_cb: {
        balance_before: balanceBefore,
        collateral_token: collateralToken,
        recipient
      }
    }, fee, memo, _funds);
  };
  decreasePositionOsmo = async ({
    collateralDelta,
    collateralToken,
    indexToken,
    isLong,
    price,
    recipient,
    sizeDelta
  }: {
    collateralDelta: Uint128;
    collateralToken: string;
    indexToken: string;
    isLong: boolean;
    price: Uint128;
    recipient: string;
    sizeDelta: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      decrease_position_osmo: {
        collateral_delta: collateralDelta,
        collateral_token: collateralToken,
        index_token: indexToken,
        is_long: isLong,
        price,
        recipient,
        size_delta: sizeDelta
      }
    }, fee, memo, _funds);
  };
  increasePositionOsmo = async ({
    collateral,
    indexToken,
    isLong,
    minOut,
    price,
    sizeDelta
  }: {
    collateral: PositionCollateral;
    indexToken: string;
    isLong: boolean;
    minOut: Uint128;
    price: Uint128;
    sizeDelta: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      increase_position_osmo: {
        collateral,
        index_token: indexToken,
        is_long: isLong,
        min_out: minOut,
        price,
        size_delta: sizeDelta
      }
    }, fee, memo, _funds);
  };
  increasePosition = async ({
    amountIn,
    collateral,
    indexToken,
    isLong,
    minOut,
    price,
    sizeDelta
  }: {
    amountIn: Uint128;
    collateral: PositionCollateral;
    indexToken: string;
    isLong: boolean;
    minOut: Uint128;
    price: Uint128;
    sizeDelta: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      increase_position: {
        amount_in: amountIn,
        collateral,
        index_token: indexToken,
        is_long: isLong,
        min_out: minOut,
        price,
        size_delta: sizeDelta
      }
    }, fee, memo, _funds);
  };
  increasePositionIndirectCb = async ({
    balanceBefore,
    indexToken,
    isLong,
    price,
    sizeDelta,
    tokenOut
  }: {
    balanceBefore: Uint128;
    indexToken: Addr;
    isLong: boolean;
    price: Uint128;
    sizeDelta: Uint128;
    tokenOut: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      increase_position_indirect_cb: {
        balance_before: balanceBefore,
        index_token: indexToken,
        is_long: isLong,
        price,
        size_delta: sizeDelta,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  decreasePosition = async ({
    collateralDelta,
    collateralToken,
    indexToken,
    isLong,
    price,
    recipient,
    sizeDelta
  }: {
    collateralDelta: Uint128;
    collateralToken: string;
    indexToken: string;
    isLong: boolean;
    price: Uint128;
    recipient: string;
    sizeDelta: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      decrease_position: {
        collateral_delta: collateralDelta,
        collateral_token: collateralToken,
        index_token: indexToken,
        is_long: isLong,
        price,
        recipient,
        size_delta: sizeDelta
      }
    }, fee, memo, _funds);
  };
  increasePositionInternal = async ({
    account,
    collateralToken,
    indexToken,
    isLong,
    price,
    sizeDelta
  }: {
    account: Addr;
    collateralToken: Addr;
    indexToken: Addr;
    isLong: boolean;
    price: Uint128;
    sizeDelta: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      increase_position_internal: {
        account,
        collateral_token: collateralToken,
        index_token: indexToken,
        is_long: isLong,
        price,
        size_delta: sizeDelta
      }
    }, fee, memo, _funds);
  };
  decreasePositionInternal = async ({
    collateralDelta,
    collateralToken,
    indexToken,
    isLong,
    owner,
    price,
    recipient,
    sizeDelta
  }: {
    collateralDelta: Uint128;
    collateralToken: Addr;
    indexToken: Addr;
    isLong: boolean;
    owner: Addr;
    price: Uint128;
    recipient: Addr;
    sizeDelta: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      decrease_position_internal: {
        collateral_delta: collateralDelta,
        collateral_token: collateralToken,
        index_token: indexToken,
        is_long: isLong,
        owner,
        price,
        recipient,
        size_delta: sizeDelta
      }
    }, fee, memo, _funds);
  };
  swapInternalCb = async ({
    intermediate,
    intermediateBalanceBefore,
    minOut,
    recipient,
    tokenOut
  }: {
    intermediate: Addr;
    intermediateBalanceBefore: Uint128;
    minOut: Uint128;
    recipient: Addr;
    tokenOut: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      swap_internal_cb: {
        intermediate,
        intermediate_balance_before: intermediateBalanceBefore,
        min_out: minOut,
        recipient,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  swapTokensToOsmo = async ({
    amountIn,
    minOut,
    path,
    recipient
  }: {
    amountIn: Uint128;
    minOut: Uint128;
    path: SwapPath;
    recipient: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      swap_tokens_to_osmo: {
        amount_in: amountIn,
        min_out: minOut,
        path,
        recipient
      }
    }, fee, memo, _funds);
  };
  swapTokensToOsmoCb = async ({
    amountIn,
    balanceBefore,
    recipient,
    tokenIn,
    tokenOut
  }: {
    amountIn: Uint128;
    balanceBefore: Uint128;
    recipient: Addr;
    tokenIn: Addr;
    tokenOut: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      swap_tokens_to_osmo_cb: {
        amount_in: amountIn,
        balance_before: balanceBefore,
        recipient,
        token_in: tokenIn,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  swapOsmoToTokensCb = async ({
    amountIn,
    balanceBefore,
    recipient,
    tokenIn,
    tokenOut
  }: {
    amountIn: Uint128;
    balanceBefore: Uint128;
    recipient: Addr;
    tokenIn: Addr;
    tokenOut: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      swap_osmo_to_tokens_cb: {
        amount_in: amountIn,
        balance_before: balanceBefore,
        recipient,
        token_in: tokenIn,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  swapOsmoToTokens = async ({
    minOut,
    path,
    recipient
  }: {
    minOut: Uint128;
    path: SwapPath;
    recipient: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      swap_osmo_to_tokens: {
        min_out: minOut,
        path,
        recipient
      }
    }, fee, memo, _funds);
  };
  transferOutOsmo = async ({
    amountOut,
    recipient
  }: {
    amountOut: Uint128;
    recipient: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      transfer_out_osmo: {
        amount_out: amountOut,
        recipient
      }
    }, fee, memo, _funds);
  };
  transferOsmoToVault = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      transfer_osmo_to_vault: {}
    }, fee, memo, _funds);
  };
  addPlugin = async ({
    plugin
  }: {
    plugin: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      add_plugin: {
        plugin
      }
    }, fee, memo, _funds);
  };
  swapInternal = async ({
    minOut,
    path,
    recipient
  }: {
    minOut: Uint128;
    path: SwapPath;
    recipient: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      swap_internal: {
        min_out: minOut,
        path,
        recipient
      }
    }, fee, memo, _funds);
  };
  removePlugin = async ({
    plugin
  }: {
    plugin: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      remove_plugin: {
        plugin
      }
    }, fee, memo, _funds);
  };
  approvePlugin = async ({
    plugin
  }: {
    plugin: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      approve_plugin: {
        plugin
      }
    }, fee, memo, _funds);
  };
  denyPlugin = async ({
    plugin
  }: {
    plugin: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      deny_plugin: {
        plugin
      }
    }, fee, memo, _funds);
  };
  pluginTransfer = async ({
    amount,
    owner,
    recipient,
    token
  }: {
    amount: Uint128;
    owner: string;
    recipient: string;
    token: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      plugin_transfer: {
        amount,
        owner,
        recipient,
        token
      }
    }, fee, memo, _funds);
  };
  pluginIncreasePosition = async ({
    account,
    collateralToken,
    indexToken,
    isLong,
    sizeDelta
  }: {
    account: string;
    collateralToken: string;
    indexToken: string;
    isLong: boolean;
    sizeDelta: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      plugin_increase_position: {
        account,
        collateral_token: collateralToken,
        index_token: indexToken,
        is_long: isLong,
        size_delta: sizeDelta
      }
    }, fee, memo, _funds);
  };
  pluginDecreasePosition = async ({
    account,
    collateralDelta,
    collateralToken,
    indexToken,
    isLong,
    recipient,
    sizeDelta
  }: {
    account: string;
    collateralDelta: Uint128;
    collateralToken: string;
    indexToken: string;
    isLong: boolean;
    recipient: string;
    sizeDelta: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      plugin_decrease_position: {
        account,
        collateral_delta: collateralDelta,
        collateral_token: collateralToken,
        index_token: indexToken,
        is_long: isLong,
        recipient,
        size_delta: sizeDelta
      }
    }, fee, memo, _funds);
  };
  directPoolDeposit = async ({
    amount,
    token
  }: {
    amount: Uint128;
    token: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      direct_pool_deposit: {
        amount,
        token
      }
    }, fee, memo, _funds);
  };
  vaultSwap = async ({
    minOut,
    recipient,
    tokenIn,
    tokenOut
  }: {
    minOut: Uint128;
    recipient: Addr;
    tokenIn: Addr;
    tokenOut: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      vault_swap: {
        min_out: minOut,
        recipient,
        token_in: tokenIn,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  vaultSwapCb = async ({
    balanceBefore,
    minOut,
    recipient,
    tokenOut
  }: {
    balanceBefore: Uint128;
    minOut: Uint128;
    recipient: Addr;
    tokenOut: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      vault_swap_cb: {
        balance_before: balanceBefore,
        min_out: minOut,
        recipient,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  swap = async ({
    amountIn,
    minOut,
    path,
    recipient
  }: {
    amountIn: Uint128;
    minOut: Uint128;
    path: SwapPath;
    recipient: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      swap: {
        amount_in: amountIn,
        min_out: minOut,
        path,
        recipient
      }
    }, fee, memo, _funds);
  };
}