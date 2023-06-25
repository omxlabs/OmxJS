/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  admin?: string | null;
  btc: string;
  btc_eth: string;
  eth: string;
  eth_busd: string;
  is_amm_enabled: boolean;
  osmo: string;
  osmo_eth: string;
}
export type ExecuteMsg = {
  set_admin: SetAdminExec;
} | {
  set_token_config: SetTokenConfigExec;
} | {
  set_price_sample_space: SetPriceSampleSpaceExec;
};
export type Addr = string;
export interface SetAdminExec {
  admin: Addr;
}
export interface SetTokenConfigExec {
  is_strict_stable: boolean;
  price_decimals: number;
  price_feed: string;
  token: string;
}
export interface SetPriceSampleSpaceExec {
  value: number;
}
export type QueryMsg = {
  price: PriceQuery;
};
export interface PriceQuery {
  include_amm_price: boolean;
  maximize: boolean;
  token: string;
}
export type Uint128 = string;