/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { InstantiateMsg, ExecuteMsg, Uint128, Addr, SetAdminExec, SetPrivateModeExec, SetShortsTrackerExec, SetAveragePriceWeightExec, SetHandlerExec, SetCooldownDurationExec, SetAumAdjustmentExec, RemoveLiquidityCb, RemoveLiquidityExec, RemoveLiquidityForAccountExec, AddLiquidityCb, AddLiquidityExec, AddLiquidityForAccountExec, QueryMsg, GlobalShortDeltaQuery, GlobalShortAveragePriceQuery, AumInUsdoQuery, AumQuery, AddCdEndQuery, LastAddedAtQuery, CdDurationQuery, MigrateMsg, Timestamp, Uint64, TupleOfUint128AndBoolean } from "./OmxCwOlpManager.types";
export interface OmxCwOlpManagerReadOnlyInterface {
  contractAddress: string;
  globalShortDelta: ({
    price,
    size,
    token
  }: {
    price: Uint128;
    size: Uint128;
    token: string;
  }) => Promise<TupleOfUint128AndBoolean>;
  globalShortAveragePrice: ({
    token
  }: {
    token: string;
  }) => Promise<Uint128>;
  aumInUsdo: ({
    maximize
  }: {
    maximize: boolean;
  }) => Promise<Uint128>;
  aum: ({
    maximize
  }: {
    maximize: boolean;
  }) => Promise<Uint128>;
  addCdEnd: ({
    account
  }: {
    account: string;
  }) => Promise<Timestamp>;
  lastAddedAt: ({
    account
  }: {
    account: string;
  }) => Promise<Timestamp>;
  cdDuration: () => Promise<Uint64>;
}
export class OmxCwOlpManagerQueryClient implements OmxCwOlpManagerReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.globalShortDelta = this.globalShortDelta.bind(this);
    this.globalShortAveragePrice = this.globalShortAveragePrice.bind(this);
    this.aumInUsdo = this.aumInUsdo.bind(this);
    this.aum = this.aum.bind(this);
    this.addCdEnd = this.addCdEnd.bind(this);
    this.lastAddedAt = this.lastAddedAt.bind(this);
    this.cdDuration = this.cdDuration.bind(this);
  }

  globalShortDelta = async ({
    price,
    size,
    token
  }: {
    price: Uint128;
    size: Uint128;
    token: string;
  }): Promise<TupleOfUint128AndBoolean> => {
    return this.client.queryContractSmart(this.contractAddress, {
      global_short_delta: {
        price,
        size,
        token
      }
    });
  };
  globalShortAveragePrice = async ({
    token
  }: {
    token: string;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      global_short_average_price: {
        token
      }
    });
  };
  aumInUsdo = async ({
    maximize
  }: {
    maximize: boolean;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      aum_in_usdo: {
        maximize
      }
    });
  };
  aum = async ({
    maximize
  }: {
    maximize: boolean;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      aum: {
        maximize
      }
    });
  };
  addCdEnd = async ({
    account
  }: {
    account: string;
  }): Promise<Timestamp> => {
    return this.client.queryContractSmart(this.contractAddress, {
      add_cd_end: {
        account
      }
    });
  };
  lastAddedAt = async ({
    account
  }: {
    account: string;
  }): Promise<Timestamp> => {
    return this.client.queryContractSmart(this.contractAddress, {
      last_added_at: {
        account
      }
    });
  };
  cdDuration = async (): Promise<Uint64> => {
    return this.client.queryContractSmart(this.contractAddress, {
      cd_duration: {}
    });
  };
}
export interface OmxCwOlpManagerInterface extends OmxCwOlpManagerReadOnlyInterface {
  contractAddress: string;
  sender: string;
  setAdmin: ({
    admin
  }: {
    admin: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  setPrivateMode: ({
    inPrivateMode
  }: {
    inPrivateMode: boolean;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  setShortsTracker: ({
    shortsTracker
  }: {
    shortsTracker: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  setAveragePriceWeight: ({
    value
  }: {
    value: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  setHandler: ({
    account,
    isHandler
  }: {
    account: string;
    isHandler: boolean;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  setCooldownDuration: ({
    value
  }: {
    value: number;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  setAumAdjustment: ({
    aumAddition,
    aumDeduction
  }: {
    aumAddition: Uint128;
    aumDeduction: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  removeLiquidityCb: ({
    account,
    aumInUsdo,
    balanceBefore,
    minOut,
    olpAmount,
    olpSupply,
    receiver,
    tokenOut
  }: {
    account: string;
    aumInUsdo: Uint128;
    balanceBefore: Uint128;
    minOut: Uint128;
    olpAmount: Uint128;
    olpSupply: Uint128;
    receiver: string;
    tokenOut: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  removeLiquidity: ({
    minOut,
    olpAmount,
    receiver,
    tokenOut
  }: {
    minOut: Uint128;
    olpAmount: Uint128;
    receiver: string;
    tokenOut: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  removeLiquidityForAccount: ({
    account,
    minOut,
    olpAmount,
    recipient,
    tokenOut
  }: {
    account: string;
    minOut: Uint128;
    olpAmount: Uint128;
    recipient: string;
    tokenOut: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  addLiquidityCb: ({
    account,
    amount,
    aumInUsdo,
    balanceBefore,
    minOlp,
    minUsdo,
    olpSupply,
    token
  }: {
    account: Addr;
    amount: Uint128;
    aumInUsdo: Uint128;
    balanceBefore: Uint128;
    minOlp: Uint128;
    minUsdo: Uint128;
    olpSupply: Uint128;
    token: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  addLiquidity: ({
    amount,
    minOlp,
    minUsdo,
    token
  }: {
    amount: Uint128;
    minOlp: Uint128;
    minUsdo: Uint128;
    token: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  addLiquidityForAccount: ({
    account,
    amount,
    fundingAccount,
    minOlp,
    minUsdo,
    token
  }: {
    account: string;
    amount: Uint128;
    fundingAccount: string;
    minOlp: Uint128;
    minUsdo: Uint128;
    token: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class OmxCwOlpManagerClient extends OmxCwOlpManagerQueryClient implements OmxCwOlpManagerInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.setAdmin = this.setAdmin.bind(this);
    this.setPrivateMode = this.setPrivateMode.bind(this);
    this.setShortsTracker = this.setShortsTracker.bind(this);
    this.setAveragePriceWeight = this.setAveragePriceWeight.bind(this);
    this.setHandler = this.setHandler.bind(this);
    this.setCooldownDuration = this.setCooldownDuration.bind(this);
    this.setAumAdjustment = this.setAumAdjustment.bind(this);
    this.removeLiquidityCb = this.removeLiquidityCb.bind(this);
    this.removeLiquidity = this.removeLiquidity.bind(this);
    this.removeLiquidityForAccount = this.removeLiquidityForAccount.bind(this);
    this.addLiquidityCb = this.addLiquidityCb.bind(this);
    this.addLiquidity = this.addLiquidity.bind(this);
    this.addLiquidityForAccount = this.addLiquidityForAccount.bind(this);
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
  setPrivateMode = async ({
    inPrivateMode
  }: {
    inPrivateMode: boolean;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_private_mode: {
        in_private_mode: inPrivateMode
      }
    }, fee, memo, _funds);
  };
  setShortsTracker = async ({
    shortsTracker
  }: {
    shortsTracker: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_shorts_tracker: {
        shorts_tracker: shortsTracker
      }
    }, fee, memo, _funds);
  };
  setAveragePriceWeight = async ({
    value
  }: {
    value: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_average_price_weight: {
        value
      }
    }, fee, memo, _funds);
  };
  setHandler = async ({
    account,
    isHandler
  }: {
    account: string;
    isHandler: boolean;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_handler: {
        account,
        is_handler: isHandler
      }
    }, fee, memo, _funds);
  };
  setCooldownDuration = async ({
    value
  }: {
    value: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_cooldown_duration: {
        value
      }
    }, fee, memo, _funds);
  };
  setAumAdjustment = async ({
    aumAddition,
    aumDeduction
  }: {
    aumAddition: Uint128;
    aumDeduction: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_aum_adjustment: {
        aum_addition: aumAddition,
        aum_deduction: aumDeduction
      }
    }, fee, memo, _funds);
  };
  removeLiquidityCb = async ({
    account,
    aumInUsdo,
    balanceBefore,
    minOut,
    olpAmount,
    olpSupply,
    receiver,
    tokenOut
  }: {
    account: string;
    aumInUsdo: Uint128;
    balanceBefore: Uint128;
    minOut: Uint128;
    olpAmount: Uint128;
    olpSupply: Uint128;
    receiver: string;
    tokenOut: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      remove_liquidity_cb: {
        account,
        aum_in_usdo: aumInUsdo,
        balance_before: balanceBefore,
        min_out: minOut,
        olp_amount: olpAmount,
        olp_supply: olpSupply,
        receiver,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  removeLiquidity = async ({
    minOut,
    olpAmount,
    receiver,
    tokenOut
  }: {
    minOut: Uint128;
    olpAmount: Uint128;
    receiver: string;
    tokenOut: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      remove_liquidity: {
        min_out: minOut,
        olp_amount: olpAmount,
        receiver,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  removeLiquidityForAccount = async ({
    account,
    minOut,
    olpAmount,
    recipient,
    tokenOut
  }: {
    account: string;
    minOut: Uint128;
    olpAmount: Uint128;
    recipient: string;
    tokenOut: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      remove_liquidity_for_account: {
        account,
        min_out: minOut,
        olp_amount: olpAmount,
        recipient,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  addLiquidityCb = async ({
    account,
    amount,
    aumInUsdo,
    balanceBefore,
    minOlp,
    minUsdo,
    olpSupply,
    token
  }: {
    account: Addr;
    amount: Uint128;
    aumInUsdo: Uint128;
    balanceBefore: Uint128;
    minOlp: Uint128;
    minUsdo: Uint128;
    olpSupply: Uint128;
    token: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      add_liquidity_cb: {
        account,
        amount,
        aum_in_usdo: aumInUsdo,
        balance_before: balanceBefore,
        min_olp: minOlp,
        min_usdo: minUsdo,
        olp_supply: olpSupply,
        token
      }
    }, fee, memo, _funds);
  };
  addLiquidity = async ({
    amount,
    minOlp,
    minUsdo,
    token
  }: {
    amount: Uint128;
    minOlp: Uint128;
    minUsdo: Uint128;
    token: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      add_liquidity: {
        amount,
        min_olp: minOlp,
        min_usdo: minUsdo,
        token
      }
    }, fee, memo, _funds);
  };
  addLiquidityForAccount = async ({
    account,
    amount,
    fundingAccount,
    minOlp,
    minUsdo,
    token
  }: {
    account: string;
    amount: Uint128;
    fundingAccount: string;
    minOlp: Uint128;
    minUsdo: Uint128;
    token: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      add_liquidity_for_account: {
        account,
        amount,
        funding_account: fundingAccount,
        min_olp: minOlp,
        min_usdo: minUsdo,
        token
      }
    }, fee, memo, _funds);
  };
}