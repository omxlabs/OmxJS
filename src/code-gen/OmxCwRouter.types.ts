/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  usdo: string;
  vault: string;
  wosmo: string;
}
export type ExecuteMsg = {
  set_admin: SetAdminExec;
} | {
  decrease_position_osmo_cb: DecreasePositionOsmoCbExec;
} | {
  decrease_position_osmo: DecreasePositionOsmoExec;
} | {
  increase_position_osmo: IncreasePositionOsmoExec;
} | {
  increase_position: IncreasePositionExec;
} | {
  increase_position_indirect_cb: IncreasePositionIndirectCbExec;
} | {
  decrease_position: DecreasePositionExec;
} | {
  increase_position_internal: IncreasePositionInternalExec;
} | {
  decrease_position_internal: DecreasePositionInternalExec;
} | {
  swap_internal_cb: SwapInternalCbExec;
} | {
  swap_tokens_to_osmo: SwapTokensToOsmoExec;
} | {
  swap_tokens_to_osmo_cb: SwapTokensToOsmoCbExec;
} | {
  swap_osmo_to_tokens_cb: SwapOsmoToTokensCbExec;
} | {
  swap_osmo_to_tokens: SwapOsmoToTokensExec;
} | {
  transfer_out_osmo: TransferOutOsmoExec;
} | {
  transfer_osmo_to_vault: TransferOsmoToVaultExec;
} | {
  add_plugin: AddPluginExec;
} | {
  swap_internal: SwapInternalExec;
} | {
  remove_plugin: RemovePluginExec;
} | {
  approve_plugin: ApprovePluginExec;
} | {
  deny_plugin: DenyPluginExec;
} | {
  plugin_transfer: PluginTransferExec;
} | {
  plugin_increase_position: PluginIncreasePositionExec;
} | {
  plugin_decrease_position: PluginDecreasePositionExec;
} | {
  direct_pool_deposit: DirectPoolDepositExec;
} | {
  vault_swap: VaultSwapExec;
} | {
  vault_swap_cb: VaultSwapCbExec;
} | {
  swap: SwapExec;
};
export type Uint128 = string;
export type Addr = string;
export type PositionCollateral = {
  token: string;
} | {
  path: SwapPath;
};
export type SwapPath = {
  direct: {
    token_in: string;
    token_out: string;
  };
} | {
  indirect: {
    intermediate: string;
    token_in: string;
    token_out: string;
  };
};
export interface SetAdminExec {
  new_admin: string;
}
export interface DecreasePositionOsmoCbExec {
  balance_before: Uint128;
  collateral_token: Addr;
  recipient: Addr;
}
export interface DecreasePositionOsmoExec {
  collateral_delta: Uint128;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
  price: Uint128;
  recipient: string;
  size_delta: Uint128;
}
export interface IncreasePositionOsmoExec {
  collateral: PositionCollateral;
  index_token: string;
  is_long: boolean;
  min_out: Uint128;
  price: Uint128;
  size_delta: Uint128;
}
export interface IncreasePositionExec {
  amount_in: Uint128;
  collateral: PositionCollateral;
  index_token: string;
  is_long: boolean;
  min_out: Uint128;
  price: Uint128;
  size_delta: Uint128;
}
export interface IncreasePositionIndirectCbExec {
  balance_before: Uint128;
  index_token: Addr;
  is_long: boolean;
  price: Uint128;
  size_delta: Uint128;
  token_out: Addr;
}
export interface DecreasePositionExec {
  collateral_delta: Uint128;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
  price: Uint128;
  recipient: string;
  size_delta: Uint128;
}
export interface IncreasePositionInternalExec {
  account: Addr;
  collateral_token: Addr;
  index_token: Addr;
  is_long: boolean;
  price: Uint128;
  size_delta: Uint128;
}
export interface DecreasePositionInternalExec {
  collateral_delta: Uint128;
  collateral_token: Addr;
  index_token: Addr;
  is_long: boolean;
  owner: Addr;
  price: Uint128;
  recipient: Addr;
  size_delta: Uint128;
}
export interface SwapInternalCbExec {
  intermediate: Addr;
  intermediate_balance_before: Uint128;
  min_out: Uint128;
  recipient: Addr;
  token_out: Addr;
}
export interface SwapTokensToOsmoExec {
  amount_in: Uint128;
  min_out: Uint128;
  path: SwapPath;
  recipient: string;
}
export interface SwapTokensToOsmoCbExec {
  amount_in: Uint128;
  balance_before: Uint128;
  recipient: Addr;
  token_in: Addr;
  token_out: Addr;
}
export interface SwapOsmoToTokensCbExec {
  amount_in: Uint128;
  balance_before: Uint128;
  recipient: Addr;
  token_in: Addr;
  token_out: Addr;
}
export interface SwapOsmoToTokensExec {
  min_out: Uint128;
  path: SwapPath;
  recipient: string;
}
export interface TransferOutOsmoExec {
  amount_out: Uint128;
  recipient: Addr;
}
export interface TransferOsmoToVaultExec {}
export interface AddPluginExec {
  plugin: string;
}
export interface SwapInternalExec {
  min_out: Uint128;
  path: SwapPath;
  recipient: Addr;
}
export interface RemovePluginExec {
  plugin: string;
}
export interface ApprovePluginExec {
  plugin: string;
}
export interface DenyPluginExec {
  plugin: string;
}
export interface PluginTransferExec {
  amount: Uint128;
  owner: string;
  recipient: string;
  token: string;
}
export interface PluginIncreasePositionExec {
  account: string;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
  size_delta: Uint128;
}
export interface PluginDecreasePositionExec {
  account: string;
  collateral_delta: Uint128;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
  recipient: string;
  size_delta: Uint128;
}
export interface DirectPoolDepositExec {
  amount: Uint128;
  token: string;
}
export interface VaultSwapExec {
  min_out: Uint128;
  recipient: Addr;
  token_in: Addr;
  token_out: Addr;
}
export interface VaultSwapCbExec {
  balance_before: Uint128;
  min_out: Uint128;
  recipient: Addr;
  token_out: Addr;
}
export interface SwapExec {
  amount_in: Uint128;
  min_out: Uint128;
  path: SwapPath;
  recipient: string;
}
export type QueryMsg = {
  approved_plugin: ApprovedPluginQuery;
} | {
  has_plugin: HasPluginQuery;
} | {
  admin: AdminQuery;
};
export type AdminQuery = null;
export interface ApprovedPluginQuery {
  account: string;
  plugin: string;
}
export interface HasPluginQuery {
  plugin: string;
}
export type Boolean = boolean;