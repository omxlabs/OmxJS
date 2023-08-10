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
  max_price_age: number;
  osmo: string;
  osmo_eth: string;
  pyth_price_feed: string;
}
export type ExecuteMsg = {
  set_admin: SetAdminExec;
} | {
  set_token_config: SetTokenConfigExec;
} | {
  set_price_feed: SetPriceFeedExec;
} | {
  set_max_price_age: SetMaxPriceAgeExec;
};
export type Identifier = string;
export interface SetAdminExec {
  admin: string;
}
export interface SetTokenConfigExec {
  is_strict_stable: boolean;
  price_feed: Identifier;
  token: string;
}
export interface SetPriceFeedExec {
  address: string;
}
export interface SetMaxPriceAgeExec {
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
export interface MigrateMsg {}
export type Uint128 = string;