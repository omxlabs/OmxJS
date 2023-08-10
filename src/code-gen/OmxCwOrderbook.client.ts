/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { Uint128, InstantiateMsg, ExecuteMsg, Addr, PositionCollateral, SwapPath, ValidatedSwapPath, VaultSwapInternalExec, PurchaseTokenAmount, SetAdminExec, SetMinExecutionFeeExec, SetMinPurchaseTokenAmountUsdExec, CancelDecreaseOrderExec, CancelIncreaseOrderExec, CancelSwapOrderExec, CreateDecreaseOrderInternalExec, CreateDecreaseOrderExec, CreateIncreaseOrderInternalExec, CreateIncreaseOrderExec, CreateSwapOrderExec, CreateSwapOrderInternalExec, ExecuteDecreaseOrderExec, ExecuteDecreaseOrderCbExec, DecreaseOrder, ExecuteIncreaseOrderExec, ExecuteIncreaseOrderCbExec, IncreaseOrder, ExecuteSwapOrderExec, ExecuteSwapOrderCbExec, SwapOrder, SwapInternalExec, TransferInOsmoInternalExec, TransferOutOsmoInternalExec, UpdateDecreaseOrderExec, UpdateIncreaseOrderExec, UpdateSwapOrderExec, SwapInternalCbExec, CreateIncreaseOrderSwapCbExec, CreateIncreaseOrderCbExec, QueryMsg, SwapOrderQuery, DecreaseOrderQuery, OrdersQuery, IncreaseOrderQuery, UsdoMinPriceQuery, ValidatePositionOrderPriceQuery, ValidateSwapOrderPriceQuery, MigrateMsg, Order, TupleOfUint128AndBoolean, Boolean } from "./OmxCwOrderbook.types";
export interface OmxCwOrderbookReadOnlyInterface {
  contractAddress: string;
  swapOrder: ({
    account,
    orderIndex
  }: {
    account: string;
    orderIndex: Uint128;
  }) => Promise<Uint128>;
  decreaseOrder: ({
    account,
    orderIndex
  }: {
    account: string;
    orderIndex: Uint128;
  }) => Promise<DecreaseOrder>;
  orders: ({
    ready
  }: {
    ready: boolean;
  }) => Promise<Order>;
  increaseOrder: ({
    account,
    orderIndex
  }: {
    account: string;
    orderIndex: Uint128;
  }) => Promise<IncreaseOrder>;
  usdoMinPrice: ({
    otherToken
  }: {
    otherToken: string;
  }) => Promise<Uint128>;
  validatePositionOrderPrice: ({
    indexToken,
    maximizePrice,
    shouldRaise,
    triggerAboveThreshold,
    triggerPrice
  }: {
    indexToken: string;
    maximizePrice: boolean;
    shouldRaise: boolean;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }) => Promise<TupleOfUint128AndBoolean>;
  validateSwapOrderPrice: ({
    path,
    triggerRatio
  }: {
    path: SwapPath;
    triggerRatio: Uint128;
  }) => Promise<Boolean>;
}
export class OmxCwOrderbookQueryClient implements OmxCwOrderbookReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.swapOrder = this.swapOrder.bind(this);
    this.decreaseOrder = this.decreaseOrder.bind(this);
    this.orders = this.orders.bind(this);
    this.increaseOrder = this.increaseOrder.bind(this);
    this.usdoMinPrice = this.usdoMinPrice.bind(this);
    this.validatePositionOrderPrice = this.validatePositionOrderPrice.bind(this);
    this.validateSwapOrderPrice = this.validateSwapOrderPrice.bind(this);
  }

  swapOrder = async ({
    account,
    orderIndex
  }: {
    account: string;
    orderIndex: Uint128;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      swap_order: {
        account,
        order_index: orderIndex
      }
    });
  };
  decreaseOrder = async ({
    account,
    orderIndex
  }: {
    account: string;
    orderIndex: Uint128;
  }): Promise<DecreaseOrder> => {
    return this.client.queryContractSmart(this.contractAddress, {
      decrease_order: {
        account,
        order_index: orderIndex
      }
    });
  };
  orders = async ({
    ready
  }: {
    ready: boolean;
  }): Promise<Order> => {
    return this.client.queryContractSmart(this.contractAddress, {
      orders: {
        ready
      }
    });
  };
  increaseOrder = async ({
    account,
    orderIndex
  }: {
    account: string;
    orderIndex: Uint128;
  }): Promise<IncreaseOrder> => {
    return this.client.queryContractSmart(this.contractAddress, {
      increase_order: {
        account,
        order_index: orderIndex
      }
    });
  };
  usdoMinPrice = async ({
    otherToken
  }: {
    otherToken: string;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      usdo_min_price: {
        other_token: otherToken
      }
    });
  };
  validatePositionOrderPrice = async ({
    indexToken,
    maximizePrice,
    shouldRaise,
    triggerAboveThreshold,
    triggerPrice
  }: {
    indexToken: string;
    maximizePrice: boolean;
    shouldRaise: boolean;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }): Promise<TupleOfUint128AndBoolean> => {
    return this.client.queryContractSmart(this.contractAddress, {
      validate_position_order_price: {
        index_token: indexToken,
        maximize_price: maximizePrice,
        should_raise: shouldRaise,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_price: triggerPrice
      }
    });
  };
  validateSwapOrderPrice = async ({
    path,
    triggerRatio
  }: {
    path: SwapPath;
    triggerRatio: Uint128;
  }): Promise<Boolean> => {
    return this.client.queryContractSmart(this.contractAddress, {
      validate_swap_order_price: {
        path,
        trigger_ratio: triggerRatio
      }
    });
  };
}
export interface OmxCwOrderbookInterface extends OmxCwOrderbookReadOnlyInterface {
  contractAddress: string;
  sender: string;
  setAdmin: ({
    admin
  }: {
    admin: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  setMinExecutionFee: ({
    value
  }: {
    value: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  setMinPurchaseTokenAmountUsd: ({
    value
  }: {
    value: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  cancelDecreaseOrder: ({
    orderIndex
  }: {
    orderIndex: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  cancelIncreaseOrder: ({
    orderIndex
  }: {
    orderIndex: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  cancelSwapOrder: ({
    orderIndex
  }: {
    orderIndex: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createDecreaseOrderInternal: ({
    account,
    collateralDelta,
    collateralToken,
    executionFee,
    indexToken,
    isLong,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    account: Addr;
    collateralDelta: Uint128;
    collateralToken: Addr;
    executionFee: Uint128;
    indexToken: Addr;
    isLong: boolean;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createDecreaseOrder: ({
    collateralDelta,
    collateralToken,
    indexToken,
    isLong,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    collateralDelta: Uint128;
    collateralToken: string;
    indexToken: string;
    isLong: boolean;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createIncreaseOrderInternal: ({
    account,
    collateralToken,
    executionFee,
    indexToken,
    isLong,
    purchaseToken,
    purchaseTokenAmount,
    sender,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    account: Addr;
    collateralToken: Addr;
    executionFee: Uint128;
    indexToken: Addr;
    isLong: boolean;
    purchaseToken: Addr;
    purchaseTokenAmount: Uint128;
    sender: Addr;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createIncreaseOrder: ({
    amountIn,
    collateralToken,
    executionFee,
    indexToken,
    isLong,
    minOut,
    path,
    shouldWrap,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    amountIn: Uint128;
    collateralToken: string;
    executionFee: Uint128;
    indexToken: string;
    isLong: boolean;
    minOut: Uint128;
    path: PositionCollateral;
    shouldWrap: boolean;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createSwapOrder: ({
    amountIn,
    executionFee,
    minOut,
    path,
    shouldUnwrap,
    shouldWrap,
    triggerAboveThreshold,
    triggerRatio
  }: {
    amountIn: Uint128;
    executionFee: Uint128;
    minOut: Uint128;
    path: SwapPath;
    shouldUnwrap: boolean;
    shouldWrap: boolean;
    triggerAboveThreshold: boolean;
    triggerRatio: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createSwapOrderInternal: ({
    account,
    amountIn,
    executionFee,
    minOut,
    nativeAmountIn,
    path,
    shouldUnwrap,
    triggerAboveThreshold,
    triggerRatio
  }: {
    account: Addr;
    amountIn: Uint128;
    executionFee: Uint128;
    minOut: Uint128;
    nativeAmountIn: Uint128;
    path: ValidatedSwapPath;
    shouldUnwrap: boolean;
    triggerAboveThreshold: boolean;
    triggerRatio: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  executeDecreaseOrder: ({
    address,
    feeReceiver,
    orderIndex
  }: {
    address: string;
    feeReceiver: string;
    orderIndex: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  executeDecreaseOrderCb: ({
    balanceBefore,
    currentPrice,
    feeReceiver,
    order,
    orderIndex
  }: {
    balanceBefore: Uint128;
    currentPrice: Uint128;
    feeReceiver: Addr;
    order: DecreaseOrder;
    orderIndex: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  executeIncreaseOrder: ({
    account,
    feeRecipient,
    orderIndex
  }: {
    account: string;
    feeRecipient: string;
    orderIndex: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  executeIncreaseOrderCb: ({
    balanceBefore,
    currentPrice,
    feeRecipient,
    order,
    orderIndex
  }: {
    balanceBefore: Uint128;
    currentPrice: Uint128;
    feeRecipient: Addr;
    order: IncreaseOrder;
    orderIndex: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  executeSwapOrder: ({
    account,
    feeRecipient,
    orderIndex
  }: {
    account: string;
    feeRecipient: string;
    orderIndex: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  executeSwapOrderCb: ({
    balanceBefore,
    feeRecipient,
    order,
    orderIndex,
    shouldUnwrap
  }: {
    balanceBefore: Uint128;
    feeRecipient: Addr;
    order: SwapOrder;
    orderIndex: Uint128;
    shouldUnwrap: boolean;
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
  transferInOsmoInternal: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  transferOutOsmoInternal: ({
    amountOut,
    recipient
  }: {
    amountOut: Uint128;
    recipient: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateDecreaseOrder: ({
    collateralDelta,
    orderIndex,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    collateralDelta: Uint128;
    orderIndex: Uint128;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateIncreaseOrder: ({
    orderIndex,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    orderIndex: Uint128;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateSwapOrder: ({
    minOut,
    orderIndex,
    triggerAboveThreshold,
    triggerRatio
  }: {
    minOut: Uint128;
    orderIndex: Uint128;
    triggerAboveThreshold: boolean;
    triggerRatio: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  vaultSwapInternal: (vaultSwapInternalExec: VaultSwapInternalExec, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  swapInternalCb: ({
    intermediateBalanceBefore,
    intermediateToken,
    minOut,
    recipient,
    tokenOut
  }: {
    intermediateBalanceBefore: Uint128;
    intermediateToken: Addr;
    minOut: Uint128;
    recipient: Addr;
    tokenOut: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createIncreaseOrderSwapCb: ({
    amountIn,
    collateralToken,
    executionFee,
    indexToken,
    isLong,
    minOut,
    path,
    purchaseToken,
    sender,
    shouldWrap,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    amountIn: Uint128;
    collateralToken: Addr;
    executionFee: Uint128;
    indexToken: Addr;
    isLong: boolean;
    minOut: Uint128;
    path: SwapPath;
    purchaseToken: Addr;
    sender: Addr;
    shouldWrap: boolean;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  createIncreaseOrderCb: ({
    amountIn,
    collateralToken,
    executionFee,
    indexToken,
    isLong,
    minOut,
    path,
    purchaseToken,
    purchaseTokenAmount,
    sender,
    shouldWrap,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    amountIn: Uint128;
    collateralToken: Addr;
    executionFee: Uint128;
    indexToken: Addr;
    isLong: boolean;
    minOut: Uint128;
    path: PositionCollateral;
    purchaseToken: Addr;
    purchaseTokenAmount: PurchaseTokenAmount;
    sender: Addr;
    shouldWrap: boolean;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class OmxCwOrderbookClient extends OmxCwOrderbookQueryClient implements OmxCwOrderbookInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.setAdmin = this.setAdmin.bind(this);
    this.setMinExecutionFee = this.setMinExecutionFee.bind(this);
    this.setMinPurchaseTokenAmountUsd = this.setMinPurchaseTokenAmountUsd.bind(this);
    this.cancelDecreaseOrder = this.cancelDecreaseOrder.bind(this);
    this.cancelIncreaseOrder = this.cancelIncreaseOrder.bind(this);
    this.cancelSwapOrder = this.cancelSwapOrder.bind(this);
    this.createDecreaseOrderInternal = this.createDecreaseOrderInternal.bind(this);
    this.createDecreaseOrder = this.createDecreaseOrder.bind(this);
    this.createIncreaseOrderInternal = this.createIncreaseOrderInternal.bind(this);
    this.createIncreaseOrder = this.createIncreaseOrder.bind(this);
    this.createSwapOrder = this.createSwapOrder.bind(this);
    this.createSwapOrderInternal = this.createSwapOrderInternal.bind(this);
    this.executeDecreaseOrder = this.executeDecreaseOrder.bind(this);
    this.executeDecreaseOrderCb = this.executeDecreaseOrderCb.bind(this);
    this.executeIncreaseOrder = this.executeIncreaseOrder.bind(this);
    this.executeIncreaseOrderCb = this.executeIncreaseOrderCb.bind(this);
    this.executeSwapOrder = this.executeSwapOrder.bind(this);
    this.executeSwapOrderCb = this.executeSwapOrderCb.bind(this);
    this.swapInternal = this.swapInternal.bind(this);
    this.transferInOsmoInternal = this.transferInOsmoInternal.bind(this);
    this.transferOutOsmoInternal = this.transferOutOsmoInternal.bind(this);
    this.updateDecreaseOrder = this.updateDecreaseOrder.bind(this);
    this.updateIncreaseOrder = this.updateIncreaseOrder.bind(this);
    this.updateSwapOrder = this.updateSwapOrder.bind(this);
    this.vaultSwapInternal = this.vaultSwapInternal.bind(this);
    this.swapInternalCb = this.swapInternalCb.bind(this);
    this.createIncreaseOrderSwapCb = this.createIncreaseOrderSwapCb.bind(this);
    this.createIncreaseOrderCb = this.createIncreaseOrderCb.bind(this);
  }

  setAdmin = async ({
    admin
  }: {
    admin: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_admin: {
        admin
      }
    }, fee, memo, _funds);
  };
  setMinExecutionFee = async ({
    value
  }: {
    value: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_min_execution_fee: {
        value
      }
    }, fee, memo, _funds);
  };
  setMinPurchaseTokenAmountUsd = async ({
    value
  }: {
    value: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_min_purchase_token_amount_usd: {
        value
      }
    }, fee, memo, _funds);
  };
  cancelDecreaseOrder = async ({
    orderIndex
  }: {
    orderIndex: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      cancel_decrease_order: {
        order_index: orderIndex
      }
    }, fee, memo, _funds);
  };
  cancelIncreaseOrder = async ({
    orderIndex
  }: {
    orderIndex: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      cancel_increase_order: {
        order_index: orderIndex
      }
    }, fee, memo, _funds);
  };
  cancelSwapOrder = async ({
    orderIndex
  }: {
    orderIndex: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      cancel_swap_order: {
        order_index: orderIndex
      }
    }, fee, memo, _funds);
  };
  createDecreaseOrderInternal = async ({
    account,
    collateralDelta,
    collateralToken,
    executionFee,
    indexToken,
    isLong,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    account: Addr;
    collateralDelta: Uint128;
    collateralToken: Addr;
    executionFee: Uint128;
    indexToken: Addr;
    isLong: boolean;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_decrease_order_internal: {
        account,
        collateral_delta: collateralDelta,
        collateral_token: collateralToken,
        execution_fee: executionFee,
        index_token: indexToken,
        is_long: isLong,
        size_delta: sizeDelta,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_price: triggerPrice
      }
    }, fee, memo, _funds);
  };
  createDecreaseOrder = async ({
    collateralDelta,
    collateralToken,
    indexToken,
    isLong,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    collateralDelta: Uint128;
    collateralToken: string;
    indexToken: string;
    isLong: boolean;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_decrease_order: {
        collateral_delta: collateralDelta,
        collateral_token: collateralToken,
        index_token: indexToken,
        is_long: isLong,
        size_delta: sizeDelta,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_price: triggerPrice
      }
    }, fee, memo, _funds);
  };
  createIncreaseOrderInternal = async ({
    account,
    collateralToken,
    executionFee,
    indexToken,
    isLong,
    purchaseToken,
    purchaseTokenAmount,
    sender,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    account: Addr;
    collateralToken: Addr;
    executionFee: Uint128;
    indexToken: Addr;
    isLong: boolean;
    purchaseToken: Addr;
    purchaseTokenAmount: Uint128;
    sender: Addr;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_increase_order_internal: {
        account,
        collateral_token: collateralToken,
        execution_fee: executionFee,
        index_token: indexToken,
        is_long: isLong,
        purchase_token: purchaseToken,
        purchase_token_amount: purchaseTokenAmount,
        sender,
        size_delta: sizeDelta,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_price: triggerPrice
      }
    }, fee, memo, _funds);
  };
  createIncreaseOrder = async ({
    amountIn,
    collateralToken,
    executionFee,
    indexToken,
    isLong,
    minOut,
    path,
    shouldWrap,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    amountIn: Uint128;
    collateralToken: string;
    executionFee: Uint128;
    indexToken: string;
    isLong: boolean;
    minOut: Uint128;
    path: PositionCollateral;
    shouldWrap: boolean;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_increase_order: {
        amount_in: amountIn,
        collateral_token: collateralToken,
        execution_fee: executionFee,
        index_token: indexToken,
        is_long: isLong,
        min_out: minOut,
        path,
        should_wrap: shouldWrap,
        size_delta: sizeDelta,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_price: triggerPrice
      }
    }, fee, memo, _funds);
  };
  createSwapOrder = async ({
    amountIn,
    executionFee,
    minOut,
    path,
    shouldUnwrap,
    shouldWrap,
    triggerAboveThreshold,
    triggerRatio
  }: {
    amountIn: Uint128;
    executionFee: Uint128;
    minOut: Uint128;
    path: SwapPath;
    shouldUnwrap: boolean;
    shouldWrap: boolean;
    triggerAboveThreshold: boolean;
    triggerRatio: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_swap_order: {
        amount_in: amountIn,
        execution_fee: executionFee,
        min_out: minOut,
        path,
        should_unwrap: shouldUnwrap,
        should_wrap: shouldWrap,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_ratio: triggerRatio
      }
    }, fee, memo, _funds);
  };
  createSwapOrderInternal = async ({
    account,
    amountIn,
    executionFee,
    minOut,
    nativeAmountIn,
    path,
    shouldUnwrap,
    triggerAboveThreshold,
    triggerRatio
  }: {
    account: Addr;
    amountIn: Uint128;
    executionFee: Uint128;
    minOut: Uint128;
    nativeAmountIn: Uint128;
    path: ValidatedSwapPath;
    shouldUnwrap: boolean;
    triggerAboveThreshold: boolean;
    triggerRatio: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_swap_order_internal: {
        account,
        amount_in: amountIn,
        execution_fee: executionFee,
        min_out: minOut,
        native_amount_in: nativeAmountIn,
        path,
        should_unwrap: shouldUnwrap,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_ratio: triggerRatio
      }
    }, fee, memo, _funds);
  };
  executeDecreaseOrder = async ({
    address,
    feeReceiver,
    orderIndex
  }: {
    address: string;
    feeReceiver: string;
    orderIndex: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      execute_decrease_order: {
        address,
        fee_receiver: feeReceiver,
        order_index: orderIndex
      }
    }, fee, memo, _funds);
  };
  executeDecreaseOrderCb = async ({
    balanceBefore,
    currentPrice,
    feeReceiver,
    order,
    orderIndex
  }: {
    balanceBefore: Uint128;
    currentPrice: Uint128;
    feeReceiver: Addr;
    order: DecreaseOrder;
    orderIndex: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      execute_decrease_order_cb: {
        balance_before: balanceBefore,
        current_price: currentPrice,
        fee_receiver: feeReceiver,
        order,
        order_index: orderIndex
      }
    }, fee, memo, _funds);
  };
  executeIncreaseOrder = async ({
    account,
    feeRecipient,
    orderIndex
  }: {
    account: string;
    feeRecipient: string;
    orderIndex: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      execute_increase_order: {
        account,
        fee_recipient: feeRecipient,
        order_index: orderIndex
      }
    }, fee, memo, _funds);
  };
  executeIncreaseOrderCb = async ({
    balanceBefore,
    currentPrice,
    feeRecipient,
    order,
    orderIndex
  }: {
    balanceBefore: Uint128;
    currentPrice: Uint128;
    feeRecipient: Addr;
    order: IncreaseOrder;
    orderIndex: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      execute_increase_order_cb: {
        balance_before: balanceBefore,
        current_price: currentPrice,
        fee_recipient: feeRecipient,
        order,
        order_index: orderIndex
      }
    }, fee, memo, _funds);
  };
  executeSwapOrder = async ({
    account,
    feeRecipient,
    orderIndex
  }: {
    account: string;
    feeRecipient: string;
    orderIndex: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      execute_swap_order: {
        account,
        fee_recipient: feeRecipient,
        order_index: orderIndex
      }
    }, fee, memo, _funds);
  };
  executeSwapOrderCb = async ({
    balanceBefore,
    feeRecipient,
    order,
    orderIndex,
    shouldUnwrap
  }: {
    balanceBefore: Uint128;
    feeRecipient: Addr;
    order: SwapOrder;
    orderIndex: Uint128;
    shouldUnwrap: boolean;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      execute_swap_order_cb: {
        balance_before: balanceBefore,
        fee_recipient: feeRecipient,
        order,
        order_index: orderIndex,
        should_unwrap: shouldUnwrap
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
  transferInOsmoInternal = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      transfer_in_osmo_internal: {}
    }, fee, memo, _funds);
  };
  transferOutOsmoInternal = async ({
    amountOut,
    recipient
  }: {
    amountOut: Uint128;
    recipient: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      transfer_out_osmo_internal: {
        amount_out: amountOut,
        recipient
      }
    }, fee, memo, _funds);
  };
  updateDecreaseOrder = async ({
    collateralDelta,
    orderIndex,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    collateralDelta: Uint128;
    orderIndex: Uint128;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_decrease_order: {
        collateral_delta: collateralDelta,
        order_index: orderIndex,
        size_delta: sizeDelta,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_price: triggerPrice
      }
    }, fee, memo, _funds);
  };
  updateIncreaseOrder = async ({
    orderIndex,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    orderIndex: Uint128;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_increase_order: {
        order_index: orderIndex,
        size_delta: sizeDelta,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_price: triggerPrice
      }
    }, fee, memo, _funds);
  };
  updateSwapOrder = async ({
    minOut,
    orderIndex,
    triggerAboveThreshold,
    triggerRatio
  }: {
    minOut: Uint128;
    orderIndex: Uint128;
    triggerAboveThreshold: boolean;
    triggerRatio: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_swap_order: {
        min_out: minOut,
        order_index: orderIndex,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_ratio: triggerRatio
      }
    }, fee, memo, _funds);
  };
  vaultSwapInternal = async (vaultSwapInternalExec: VaultSwapInternalExec, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      vault_swap_internal: vaultSwapInternalExec
    }, fee, memo, _funds);
  };
  swapInternalCb = async ({
    intermediateBalanceBefore,
    intermediateToken,
    minOut,
    recipient,
    tokenOut
  }: {
    intermediateBalanceBefore: Uint128;
    intermediateToken: Addr;
    minOut: Uint128;
    recipient: Addr;
    tokenOut: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      swap_internal_cb: {
        intermediate_balance_before: intermediateBalanceBefore,
        intermediate_token: intermediateToken,
        min_out: minOut,
        recipient,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  createIncreaseOrderSwapCb = async ({
    amountIn,
    collateralToken,
    executionFee,
    indexToken,
    isLong,
    minOut,
    path,
    purchaseToken,
    sender,
    shouldWrap,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    amountIn: Uint128;
    collateralToken: Addr;
    executionFee: Uint128;
    indexToken: Addr;
    isLong: boolean;
    minOut: Uint128;
    path: SwapPath;
    purchaseToken: Addr;
    sender: Addr;
    shouldWrap: boolean;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_increase_order_swap_cb: {
        amount_in: amountIn,
        collateral_token: collateralToken,
        execution_fee: executionFee,
        index_token: indexToken,
        is_long: isLong,
        min_out: minOut,
        path,
        purchase_token: purchaseToken,
        sender,
        should_wrap: shouldWrap,
        size_delta: sizeDelta,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_price: triggerPrice
      }
    }, fee, memo, _funds);
  };
  createIncreaseOrderCb = async ({
    amountIn,
    collateralToken,
    executionFee,
    indexToken,
    isLong,
    minOut,
    path,
    purchaseToken,
    purchaseTokenAmount,
    sender,
    shouldWrap,
    sizeDelta,
    triggerAboveThreshold,
    triggerPrice
  }: {
    amountIn: Uint128;
    collateralToken: Addr;
    executionFee: Uint128;
    indexToken: Addr;
    isLong: boolean;
    minOut: Uint128;
    path: PositionCollateral;
    purchaseToken: Addr;
    purchaseTokenAmount: PurchaseTokenAmount;
    sender: Addr;
    shouldWrap: boolean;
    sizeDelta: Uint128;
    triggerAboveThreshold: boolean;
    triggerPrice: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_increase_order_cb: {
        amount_in: amountIn,
        collateral_token: collateralToken,
        execution_fee: executionFee,
        index_token: indexToken,
        is_long: isLong,
        min_out: minOut,
        path,
        purchase_token: purchaseToken,
        purchase_token_amount: purchaseTokenAmount,
        sender,
        should_wrap: shouldWrap,
        size_delta: sizeDelta,
        trigger_above_threshold: triggerAboveThreshold,
        trigger_price: triggerPrice
      }
    }, fee, memo, _funds);
  };
}