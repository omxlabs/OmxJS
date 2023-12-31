/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export type Uint128 = string;
export interface InstantiateMsg {
  admin?: string | null;
  funding_rate_factor: Uint128;
  liquidation_fee_usd: Uint128;
  price_feed: string;
  price_impact_exp: number;
  price_impact_factor: Uint128;
  stable_funding_rate_factor: Uint128;
  usdo: string;
}
export type ExecuteMsg = {
  buy_usdo: BuyUsdoMsg;
} | {
  set_is_liquidator: SetIsLiquidatorMsg;
} | {
  add_router: AddRouterMsg;
} | {
  buy_usdo_cb: BuyUsdoCbMsg;
} | {
  clear_token_config: ClearTokenConfigMsg;
} | {
  decrease_position: DecreasePositionMsg;
} | {
  direct_pool_deposit: DirectPoolDepositMsg;
} | {
  increase_position: IncreasePositionMsg;
} | {
  liquidate_position: LiquidatePositionMsg;
} | {
  set_router: SetRouterMsg;
} | {
  sell_usdo: SellUsdoMsg;
} | {
  sell_usdo_cb: SellUsdoCbMsg;
} | {
  set_fees: SetFeesMsg;
} | {
  set_funding_rate: SetFundingRateMsg;
} | {
  set_token_config: SetTokenConfigMsg;
} | {
  set_usdo_amount: SetUsdoAmountMsg;
} | {
  swap: SwapMsg;
} | {
  update_cumulative_funding_rate: UpdateCumulativeFundingRateMsg;
} | {
  withdraw_fees: WithdrawFeesMsg;
} | {
  set_in_manager_mode: SetInManagerModeMsg;
} | {
  set_in_private_liquidation_mode: SetInPrivateLiquidationModeMsg;
} | {
  set_is_swap_enabled: SetIsSwapEnabledMsg;
} | {
  set_is_leverage_enabled: SetIsLeverageEnabledMsg;
} | {
  set_max_gas_price: SetMaxGasPriceMsg;
} | {
  set_max_global_short_price: SetMaxGlobalShortPriceMsg;
} | {
  set_manager: SetManagerMsg;
} | {
  set_admin: SetAdminMsg;
};
export type Addr = string;
export interface BuyUsdoMsg {
  recipient: string;
  token: string;
}
export interface SetIsLiquidatorMsg {
  account: string;
  value: boolean;
}
export interface AddRouterMsg {
  router: string;
}
export interface BuyUsdoCbMsg {
  fee_basis_points: Uint128;
  mint_amount: Uint128;
  recipient: Addr;
  token: Addr;
  token_amount: Uint128;
}
export interface ClearTokenConfigMsg {
  token: string;
}
export interface DecreasePositionMsg {
  account: string;
  collateral_delta: Uint128;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
  recipient: string;
  size_delta: Uint128;
}
export interface DirectPoolDepositMsg {
  token: string;
}
export interface IncreasePositionMsg {
  account: string;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
  size_delta: Uint128;
}
export interface LiquidatePositionMsg {
  account: string;
  collateral_token: string;
  fee_recipient: string;
  index_token: string;
  is_long: boolean;
}
export interface SetRouterMsg {
  router: string;
}
export interface SellUsdoMsg {
  recipient: string;
  token: string;
}
export interface SellUsdoCbMsg {
  recipient: Addr;
  redemption_amount: Uint128;
  token: Addr;
  usdo_amount: Uint128;
}
export interface SetFeesMsg {
  has_dynamic_fees: boolean;
  liquidation_fee_usd: Uint128;
  margin_fee_basis_points: Uint128;
  min_profit_time: Duration;
  mint_burn_fee_basis_points: Uint128;
  stable_swap_fee_basis_points: Uint128;
  stable_tax_basis_points: Uint128;
  swap_fee_basis_points: Uint128;
  tax_basis_points: Uint128;
}
export interface Duration {
  nanos: number;
  secs: number;
  [k: string]: unknown;
}
export interface SetFundingRateMsg {
  funding_interval: Duration;
  funding_rate_factor: Uint128;
  stable_funding_rate_factor: Uint128;
}
export interface SetTokenConfigMsg {
  is_shortable: boolean;
  is_stable: boolean;
  max_usdo_amount: Uint128;
  min_profit_bps: Uint128;
  token: string;
  token_decimals: number;
  token_weight: Uint128;
}
export interface SetUsdoAmountMsg {
  amount: Uint128;
  token: string;
}
export interface SwapMsg {
  recipient?: string | null;
  token_in: string;
  token_out: string;
}
export interface UpdateCumulativeFundingRateMsg {
  collateral_token: string;
  index_token: string;
}
export interface WithdrawFeesMsg {
  recipient?: string | null;
  token: string;
}
export interface SetInManagerModeMsg {
  in_manager_mode: boolean;
}
export interface SetInPrivateLiquidationModeMsg {
  value: boolean;
}
export interface SetIsSwapEnabledMsg {
  value: boolean;
}
export interface SetIsLeverageEnabledMsg {
  value: boolean;
}
export interface SetMaxGasPriceMsg {
  max_gas_price: Uint128;
}
export interface SetMaxGlobalShortPriceMsg {
  token: string;
  value: Uint128;
}
export interface SetManagerMsg {
  addr: string;
}
export interface SetAdminMsg {
  new_admin: string;
}
export type QueryMsg = {
  vault_state: {};
} | {
  vault_config: {};
} | {
  utilization: UtilizationQuery;
} | {
  cumulative_funding_rates: CumulativeFundingRatesQuery;
} | {
  position_leverage: PositionLeverageQuery;
} | {
  token_to_usd_min: TokenToUsdMinQuery;
} | {
  global_short_average_prices: GlobalShortAveragePricesQuery;
} | {
  global_short_sizes: GlobalShortSizesQuery;
} | {
  position_delta: PositionDeltaQuery;
} | {
  reserved_amounts: ReservedAmountsQuery;
} | {
  guaranteed_usd: GuaranteedUsdQuery;
} | {
  usdo_amount: UsdoAmountQuery;
} | {
  entry_funding_rate: EntryFundingRateQuery;
} | {
  next_global_short_average_price: NextGlobalShortAveragePriceQuery;
} | {
  next_funding_rate: NextFundingRateQuery;
} | {
  funding_fee: FundingFeeQuery;
} | {
  min_price: MinPriceQuery;
} | {
  max_price: MaxPriceQuery;
} | {
  redemption_amount: RedemptionAmountQuery;
} | {
  target_usdo_amount: TargetUsdoAmountQuery;
} | {
  adjust_for_decimals: AdjustForDecimalsQuery;
} | {
  is_router_approved: IsRouterApprovedQuery;
} | {
  get_delta: GetDeltaQuery;
} | {
  redemption_collateral: RedemptionCollateralQuery;
} | {
  redemption_collateral_usd: RedemptionCollateralUsdQuery;
} | {
  position_fee: PositionFeeQuery;
} | {
  max_global_short_price: MaxGlobalShortPriceQuery;
} | {
  next_average_price: NextAveragePriceQuery;
} | {
  is_manager: IsManagerQuery;
} | {
  pool_amount: PoolAmountQuery;
} | {
  all_whitelisted_tokens: AllWhitelistedTokensQuery;
} | {
  whitelisted_token: WhitelistedTokenQuery;
} | {
  positions: PositionsQuery;
} | {
  position: PositionQuery;
} | {
  fee_reserves: FeeReservesQuery;
} | {
  validate_liquidation: ValidateLiquidationQuery;
} | {
  all_whitelisted_tokens_amount: AllWhitelistedTokensAmountQuery;
};
export type Timestamp = Uint64;
export type Uint64 = string;
export interface UtilizationQuery {
  token: string;
}
export interface CumulativeFundingRatesQuery {
  token: string;
}
export interface PositionLeverageQuery {
  account: string;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
}
export interface TokenToUsdMinQuery {
  amount: Uint128;
  token: string;
}
export interface GlobalShortAveragePricesQuery {
  token: string;
}
export interface GlobalShortSizesQuery {
  token: string;
}
export interface PositionDeltaQuery {
  account: string;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
}
export interface ReservedAmountsQuery {
  token: string;
}
export interface GuaranteedUsdQuery {
  token: string;
}
export interface UsdoAmountQuery {
  token: string;
}
export interface EntryFundingRateQuery {
  collateral_token: string;
  index_token: string;
  is_long: boolean;
}
export interface NextGlobalShortAveragePriceQuery {
  index_token: string;
  next_price: Uint128;
  size_delta: Uint128;
}
export interface NextFundingRateQuery {
  token: string;
}
export interface FundingFeeQuery {
  collateral_token: string;
  entry_funding_rate: Uint128;
  size: Uint128;
}
export interface MinPriceQuery {
  token: string;
}
export interface MaxPriceQuery {
  token: string;
}
export interface RedemptionAmountQuery {
  token: string;
  usdo_amount: Uint128;
}
export interface TargetUsdoAmountQuery {
  token: string;
}
export interface AdjustForDecimalsQuery {
  amount: Uint128;
  token_div: string;
  token_mul: string;
}
export interface IsRouterApprovedQuery {
  account: string;
  router: string;
}
export interface GetDeltaQuery {
  average_price: Uint128;
  index_token: string;
  is_long: boolean;
  last_increased_time: Timestamp;
  size: Uint128;
}
export interface RedemptionCollateralQuery {
  token: string;
}
export interface RedemptionCollateralUsdQuery {
  token: string;
}
export interface PositionFeeQuery {
  account: string;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
  size_delta: Uint128;
}
export interface MaxGlobalShortPriceQuery {
  token: string;
}
export interface NextAveragePriceQuery {
  average_price: Uint128;
  index_token: string;
  is_long: boolean;
  last_increased_time: Timestamp;
  next_price: Uint128;
  size: Uint128;
  size_delta: Uint128;
}
export interface IsManagerQuery {
  addr: string;
}
export interface PoolAmountQuery {
  token: string;
}
export interface AllWhitelistedTokensQuery {
  index: number;
}
export interface WhitelistedTokenQuery {
  token: string;
}
export interface PositionsQuery {
  account?: string | null;
  collateral_token?: string | null;
  index_token?: string | null;
  is_long?: boolean | null;
  valid?: boolean | null;
}
export interface PositionQuery {
  account: string;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
}
export interface FeeReservesQuery {
  token: string;
}
export interface ValidateLiquidationQuery {
  account: string;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
  should_raise: boolean;
}
export interface AllWhitelistedTokensAmountQuery {}
export interface MigrateMsg {}
export type Uint32 = number;
export interface DeltaResult {
  delta: Uint128;
  has_profit: boolean;
}
export type Boolean = boolean;
export interface Position {
  average_price: Uint128;
  collateral: Uint128;
  entry_funding_rate: Uint128;
  last_increased_time: Timestamp;
  realized_pnl: number;
  reserve_amount: Uint128;
  size: Uint128;
}
export type ArrayOfPositionKey = PositionKey[];
export interface PositionKey {
  account: Addr;
  collateral_token: Addr;
  index_token: Addr;
  is_long: boolean;
}
export interface VaultConfig {
  usdo: Addr;
}
export interface VaultState {
  admin: Addr;
  all_whitelisted_tokens: Addr[];
  funding_interval: Duration;
  funding_rate_factor: Uint128;
  has_dynamic_fees: boolean;
  in_manager_mode: boolean;
  in_private_liquidation_mode: boolean;
  include_amm_price: boolean;
  is_leverage_enabled: boolean;
  is_manager_mode: boolean;
  is_swap_enabled: boolean;
  liquidation_fee_usd: Uint128;
  margin_fee_basis_points: Uint128;
  max_gas_price: Uint128;
  max_leverage: Uint128;
  min_profit_time: Duration;
  mint_burn_fee_basis_points: Uint128;
  price_feed: Addr;
  price_impact_exp: number;
  price_impact_factor: Uint128;
  router?: Addr | null;
  stable_funding_rate_factor: Uint128;
  stable_swap_fee_basis_points: Uint128;
  stable_tax_basis_points: Uint128;
  swap_fee_basis_points: Uint128;
  tax_basis_points: Uint128;
  total_token_weights: Uint128;
  use_swap_pricing: boolean;
  whitelisted_token_count: number;
}
export interface WhitelistedToken {
  decimals: number;
  is_shortable: boolean;
  is_stable: boolean;
  max_usdo_amount: Uint128;
  min_profit_basis_points: Uint128;
  weight: Uint128;
}