/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export type Uint128 = string;
export interface InstantiateMsg {
  admin?: string | null;
  min_execution_fee: Uint128;
  min_purchase_token_amount_usd: Uint128;
  router: string;
  usdo: string;
  vault: string;
  wosmo: string;
}
export type ExecuteMsg = {
  set_admin: SetAdminExec;
} | {
  set_min_execution_fee: SetMinExecutionFeeExec;
} | {
  set_min_purchase_token_amount_usd: SetMinPurchaseTokenAmountUsdExec;
} | {
  cancel_decrease_order: CancelDecreaseOrderExec;
} | {
  cancel_increase_order: CancelIncreaseOrderExec;
} | {
  cancel_swap_order: CancelSwapOrderExec;
} | {
  create_decrease_order_internal: CreateDecreaseOrderInternalExec;
} | {
  create_decrease_order: CreateDecreaseOrderExec;
} | {
  create_increase_order_internal: CreateIncreaseOrderInternalExec;
} | {
  create_increase_order: CreateIncreaseOrderExec;
} | {
  create_swap_order: CreateSwapOrderExec;
} | {
  create_swap_order_internal: CreateSwapOrderInternalExec;
} | {
  execute_decrease_order: ExecuteDecreaseOrderExec;
} | {
  execute_decrease_order_cb: ExecuteDecreaseOrderCbExec;
} | {
  execute_increase_order: ExecuteIncreaseOrderExec;
} | {
  execute_increase_order_cb: ExecuteIncreaseOrderCbExec;
} | {
  execute_swap_order: ExecuteSwapOrderExec;
} | {
  execute_swap_order_cb: ExecuteSwapOrderCbExec;
} | {
  swap_internal: SwapInternalExec;
} | {
  transfer_in_osmo_internal: TransferInOsmoInternalExec;
} | {
  transfer_out_osmo_internal: TransferOutOsmoInternalExec;
} | {
  update_decrease_order: UpdateDecreaseOrderExec;
} | {
  update_increase_order: UpdateIncreaseOrderExec;
} | {
  update_swap_order: UpdateSwapOrderExec;
} | {
  vault_swap_internal: VaultSwapInternalExec;
} | {
  swap_internal_cb: SwapInternalCbExec;
} | {
  create_increase_order_swap_cb: CreateIncreaseOrderSwapCbExec;
} | {
  create_increase_order_cb: CreateIncreaseOrderCbExec;
};
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
export type ValidatedSwapPath = {
  direct: {
    token_in: Addr;
    token_out: Addr;
  };
} | {
  indirect: {
    intermediate: Addr;
    token_in: Addr;
    token_out: Addr;
  };
};
export type VaultSwapInternalExec = {
  swap: {
    min_out: Uint128;
    recipient: Addr;
    token_in: Addr;
    token_out: Addr;
  };
} | {
  post_swap: {
    amount_out_before: Uint128;
    min_out: Uint128;
    recipient: Addr;
    token_out: Addr;
  };
};
export type PurchaseTokenAmount = {
  amount: Uint128;
} | {
  amount_before: Uint128;
};
export interface SetAdminExec {
  admin: string;
}
export interface SetMinExecutionFeeExec {
  value: Uint128;
}
export interface SetMinPurchaseTokenAmountUsdExec {
  value: Uint128;
}
export interface CancelDecreaseOrderExec {
  order_index: Uint128;
}
export interface CancelIncreaseOrderExec {
  order_index: Uint128;
}
export interface CancelSwapOrderExec {
  order_index: Uint128;
}
export interface CreateDecreaseOrderInternalExec {
  account: Addr;
  collateral_delta: Uint128;
  collateral_token: Addr;
  execution_fee: Uint128;
  index_token: Addr;
  is_long: boolean;
  size_delta: Uint128;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export interface CreateDecreaseOrderExec {
  collateral_delta: Uint128;
  collateral_token: string;
  index_token: string;
  is_long: boolean;
  size_delta: Uint128;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export interface CreateIncreaseOrderInternalExec {
  account: Addr;
  collateral_token: Addr;
  execution_fee: Uint128;
  index_token: Addr;
  is_long: boolean;
  purchase_token: Addr;
  purchase_token_amount: Uint128;
  sender: Addr;
  size_delta: Uint128;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export interface CreateIncreaseOrderExec {
  amount_in: Uint128;
  collateral_token: string;
  execution_fee: Uint128;
  index_token: string;
  is_long: boolean;
  min_out: Uint128;
  path: PositionCollateral;
  should_wrap: boolean;
  size_delta: Uint128;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export interface CreateSwapOrderExec {
  amount_in: Uint128;
  execution_fee: Uint128;
  min_out: Uint128;
  path: SwapPath;
  should_unwrap: boolean;
  should_wrap: boolean;
  trigger_above_threshold: boolean;
  trigger_ratio: Uint128;
}
export interface CreateSwapOrderInternalExec {
  account: Addr;
  amount_in: Uint128;
  execution_fee: Uint128;
  min_out: Uint128;
  native_amount_in: Uint128;
  path: ValidatedSwapPath;
  should_unwrap: boolean;
  trigger_above_threshold: boolean;
  trigger_ratio: Uint128;
}
export interface ExecuteDecreaseOrderExec {
  address: string;
  fee_receiver: string;
  order_index: Uint128;
}
export interface ExecuteDecreaseOrderCbExec {
  balance_before: Uint128;
  current_price: Uint128;
  fee_receiver: Addr;
  order: DecreaseOrder;
  order_index: Uint128;
}
export interface DecreaseOrder {
  account: Addr;
  collateral_delta: Uint128;
  collateral_token: Addr;
  execution_fee: Uint128;
  index: Uint128;
  index_token: Addr;
  is_long: boolean;
  size_delta: Uint128;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export interface ExecuteIncreaseOrderExec {
  account: string;
  fee_recipient: string;
  order_index: Uint128;
}
export interface ExecuteIncreaseOrderCbExec {
  balance_before: Uint128;
  current_price: Uint128;
  fee_recipient: Addr;
  order: IncreaseOrder;
  order_index: Uint128;
}
export interface IncreaseOrder {
  account: Addr;
  collateral_token: Addr;
  execution_fee: Uint128;
  index: Uint128;
  index_token: Addr;
  is_long: boolean;
  purchase_token: Addr;
  purchase_token_amount: Uint128;
  size_delta: Uint128;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export interface ExecuteSwapOrderExec {
  account: string;
  fee_recipient: string;
  order_index: Uint128;
}
export interface ExecuteSwapOrderCbExec {
  balance_before: Uint128;
  fee_recipient: Addr;
  order: SwapOrder;
  order_index: Uint128;
  should_unwrap: boolean;
}
export interface SwapOrder {
  account: Addr;
  amount_in: Uint128;
  execution_fee: Uint128;
  index: Uint128;
  min_out: Uint128;
  path: ValidatedSwapPath;
  should_unwrap: boolean;
  trigger_above_threshold: boolean;
  trigger_ratio: Uint128;
}
export interface SwapInternalExec {
  min_out: Uint128;
  path: SwapPath;
  recipient: Addr;
}
export interface TransferInOsmoInternalExec {}
export interface TransferOutOsmoInternalExec {
  amount_out: Uint128;
  recipient: Addr;
}
export interface UpdateDecreaseOrderExec {
  collateral_delta: Uint128;
  order_index: Uint128;
  size_delta: Uint128;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export interface UpdateIncreaseOrderExec {
  order_index: Uint128;
  size_delta: Uint128;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export interface UpdateSwapOrderExec {
  min_out: Uint128;
  order_index: Uint128;
  trigger_above_threshold: boolean;
  trigger_ratio: Uint128;
}
export interface SwapInternalCbExec {
  intermediate_balance_before: Uint128;
  intermediate_token: Addr;
  min_out: Uint128;
  recipient: Addr;
  token_out: Addr;
}
export interface CreateIncreaseOrderSwapCbExec {
  amount_in: Uint128;
  collateral_token: Addr;
  execution_fee: Uint128;
  index_token: Addr;
  is_long: boolean;
  min_out: Uint128;
  path: SwapPath;
  purchase_token: Addr;
  sender: Addr;
  should_wrap: boolean;
  size_delta: Uint128;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export interface CreateIncreaseOrderCbExec {
  amount_in: Uint128;
  collateral_token: Addr;
  execution_fee: Uint128;
  index_token: Addr;
  is_long: boolean;
  min_out: Uint128;
  path: PositionCollateral;
  purchase_token: Addr;
  purchase_token_amount: PurchaseTokenAmount;
  sender: Addr;
  should_wrap: boolean;
  size_delta: Uint128;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export type QueryMsg = {
  swap_order: SwapOrderQuery;
} | {
  decrease_order: DecreaseOrderQuery;
} | {
  orders: OrdersQuery;
} | {
  increase_order: IncreaseOrderQuery;
} | {
  usdo_min_price: UsdoMinPriceQuery;
} | {
  validate_position_order_price: ValidatePositionOrderPriceQuery;
} | {
  validate_swap_order_price: ValidateSwapOrderPriceQuery;
};
export interface SwapOrderQuery {
  account: string;
  order_index: Uint128;
}
export interface DecreaseOrderQuery {
  account: string;
  order_index: Uint128;
}
export interface OrdersQuery {
  account?: string | null;
  ready?: boolean | null;
}
export interface IncreaseOrderQuery {
  account: string;
  order_index: Uint128;
}
export interface UsdoMinPriceQuery {
  other_token: string;
}
export interface ValidatePositionOrderPriceQuery {
  index_token: string;
  maximize_price: boolean;
  should_raise: boolean;
  trigger_above_threshold: boolean;
  trigger_price: Uint128;
}
export interface ValidateSwapOrderPriceQuery {
  path: SwapPath;
  trigger_ratio: Uint128;
}
export interface MigrateMsg {}
export type Order = {
  swap: SwapOrder;
} | {
  increase: IncreaseOrder;
} | {
  decrease: DecreaseOrder;
};
export type TupleOfUint128AndBoolean = [Uint128, boolean];
export type Boolean = boolean;