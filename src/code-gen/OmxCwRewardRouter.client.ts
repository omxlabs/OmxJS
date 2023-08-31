/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { InstantiateMsg, ExecuteMsg, UnstakeCb, Addr, Uint128, UnstakeAndRedeemOlpOsmoCb, SetAdminExec, CompoundCb, CompoundOmxCb, StakeOmxForAccountExec, StakeOmxExec, StakeEsOmxExec, UnstakeOmxExec, UnstakeEsOmxExec, ClaimExec, ClaimEsOmxExec, ClaimFeesExec, CompoundExec, CompoundForAccountExec, MintAndStakeOlpExec, MintAndStakeOlpCb, UnstakeAndRedeemOlpExec, UnstakeAndRedeemOlpOsmoExec, QueryMsg, AdminQuery, MigrateMsg } from "./OmxCwRewardRouter.types";
export interface OmxCwRewardRouterReadOnlyInterface {
  contractAddress: string;
  admin: () => Promise<Addr>;
}
export class OmxCwRewardRouterQueryClient implements OmxCwRewardRouterReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.admin = this.admin.bind(this);
  }

  admin = async (): Promise<Addr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      admin: {}
    });
  };
}
export interface OmxCwRewardRouterInterface extends OmxCwRewardRouterReadOnlyInterface {
  contractAddress: string;
  sender: string;
  setAdmin: ({
    admin
  }: {
    admin: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unstakeCb: (unstakeCb: UnstakeCb, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  compoundCb: ({
    account,
    balanceBefore,
    rewardToken,
    stakeToken
  }: {
    account: Addr;
    balanceBefore: Uint128;
    rewardToken: Addr;
    stakeToken: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  compoundOmxCb: ({
    account,
    balanceBefore,
    bnOmx,
    feeOmxTracker
  }: {
    account: Addr;
    balanceBefore: Uint128;
    bnOmx: Addr;
    feeOmxTracker: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  stakeOmxForAccount: ({
    account,
    amount
  }: {
    account: string;
    amount: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  stakeOmx: ({
    amount
  }: {
    amount: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  stakeEsOmx: ({
    amount
  }: {
    amount: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unstakeOmx: ({
    amount
  }: {
    amount: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unstakeEsOmx: ({
    amount
  }: {
    amount: Uint128;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claim: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claimEsOmx: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claimFees: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  compound: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  compoundForAccount: ({
    account
  }: {
    account: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  mintAndStakeOlp: ({
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
  mintAndStakeOlpCb: ({
    account,
    olpBalanceBefore,
    token
  }: {
    account: Addr;
    olpBalanceBefore: Uint128;
    token: Addr;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unstakeAndRedeemOlp: ({
    minOut,
    olpAmount,
    recipient,
    tokenOut
  }: {
    minOut: Uint128;
    olpAmount: Uint128;
    recipient: string;
    tokenOut: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unstakeAndRedeemOlpOsmo: ({
    minOut,
    olpAmount,
    recipient
  }: {
    minOut: Uint128;
    olpAmount: Uint128;
    recipient: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unstakeAndRedeemOlpOsmoCb: (unstakeAndRedeemOlpOsmoCb: UnstakeAndRedeemOlpOsmoCb, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class OmxCwRewardRouterClient extends OmxCwRewardRouterQueryClient implements OmxCwRewardRouterInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.setAdmin = this.setAdmin.bind(this);
    this.unstakeCb = this.unstakeCb.bind(this);
    this.compoundCb = this.compoundCb.bind(this);
    this.compoundOmxCb = this.compoundOmxCb.bind(this);
    this.stakeOmxForAccount = this.stakeOmxForAccount.bind(this);
    this.stakeOmx = this.stakeOmx.bind(this);
    this.stakeEsOmx = this.stakeEsOmx.bind(this);
    this.unstakeOmx = this.unstakeOmx.bind(this);
    this.unstakeEsOmx = this.unstakeEsOmx.bind(this);
    this.claim = this.claim.bind(this);
    this.claimEsOmx = this.claimEsOmx.bind(this);
    this.claimFees = this.claimFees.bind(this);
    this.compound = this.compound.bind(this);
    this.compoundForAccount = this.compoundForAccount.bind(this);
    this.mintAndStakeOlp = this.mintAndStakeOlp.bind(this);
    this.mintAndStakeOlpCb = this.mintAndStakeOlpCb.bind(this);
    this.unstakeAndRedeemOlp = this.unstakeAndRedeemOlp.bind(this);
    this.unstakeAndRedeemOlpOsmo = this.unstakeAndRedeemOlpOsmo.bind(this);
    this.unstakeAndRedeemOlpOsmoCb = this.unstakeAndRedeemOlpOsmoCb.bind(this);
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
  unstakeCb = async (unstakeCb: UnstakeCb, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unstake_cb: unstakeCb
    }, fee, memo, _funds);
  };
  compoundCb = async ({
    account,
    balanceBefore,
    rewardToken,
    stakeToken
  }: {
    account: Addr;
    balanceBefore: Uint128;
    rewardToken: Addr;
    stakeToken: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      compound_cb: {
        account,
        balance_before: balanceBefore,
        reward_token: rewardToken,
        stake_token: stakeToken
      }
    }, fee, memo, _funds);
  };
  compoundOmxCb = async ({
    account,
    balanceBefore,
    bnOmx,
    feeOmxTracker
  }: {
    account: Addr;
    balanceBefore: Uint128;
    bnOmx: Addr;
    feeOmxTracker: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      compound_omx_cb: {
        account,
        balance_before: balanceBefore,
        bn_omx: bnOmx,
        fee_omx_tracker: feeOmxTracker
      }
    }, fee, memo, _funds);
  };
  stakeOmxForAccount = async ({
    account,
    amount
  }: {
    account: string;
    amount: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      stake_omx_for_account: {
        account,
        amount
      }
    }, fee, memo, _funds);
  };
  stakeOmx = async ({
    amount
  }: {
    amount: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      stake_omx: {
        amount
      }
    }, fee, memo, _funds);
  };
  stakeEsOmx = async ({
    amount
  }: {
    amount: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      stake_es_omx: {
        amount
      }
    }, fee, memo, _funds);
  };
  unstakeOmx = async ({
    amount
  }: {
    amount: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unstake_omx: {
        amount
      }
    }, fee, memo, _funds);
  };
  unstakeEsOmx = async ({
    amount
  }: {
    amount: Uint128;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unstake_es_omx: {
        amount
      }
    }, fee, memo, _funds);
  };
  claim = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim: {}
    }, fee, memo, _funds);
  };
  claimEsOmx = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim_es_omx: {}
    }, fee, memo, _funds);
  };
  claimFees = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim_fees: {}
    }, fee, memo, _funds);
  };
  compound = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      compound: {}
    }, fee, memo, _funds);
  };
  compoundForAccount = async ({
    account
  }: {
    account: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      compound_for_account: {
        account
      }
    }, fee, memo, _funds);
  };
  mintAndStakeOlp = async ({
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
      mint_and_stake_olp: {
        amount,
        min_olp: minOlp,
        min_usdo: minUsdo,
        token
      }
    }, fee, memo, _funds);
  };
  mintAndStakeOlpCb = async ({
    account,
    olpBalanceBefore,
    token
  }: {
    account: Addr;
    olpBalanceBefore: Uint128;
    token: Addr;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      mint_and_stake_olp_cb: {
        account,
        olp_balance_before: olpBalanceBefore,
        token
      }
    }, fee, memo, _funds);
  };
  unstakeAndRedeemOlp = async ({
    minOut,
    olpAmount,
    recipient,
    tokenOut
  }: {
    minOut: Uint128;
    olpAmount: Uint128;
    recipient: string;
    tokenOut: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unstake_and_redeem_olp: {
        min_out: minOut,
        olp_amount: olpAmount,
        recipient,
        token_out: tokenOut
      }
    }, fee, memo, _funds);
  };
  unstakeAndRedeemOlpOsmo = async ({
    minOut,
    olpAmount,
    recipient
  }: {
    minOut: Uint128;
    olpAmount: Uint128;
    recipient: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unstake_and_redeem_olp_osmo: {
        min_out: minOut,
        olp_amount: olpAmount,
        recipient
      }
    }, fee, memo, _funds);
  };
  unstakeAndRedeemOlpOsmoCb = async (unstakeAndRedeemOlpOsmoCb: UnstakeAndRedeemOlpOsmoCb, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unstake_and_redeem_olp_osmo_cb: unstakeAndRedeemOlpOsmoCb
    }, fee, memo, _funds);
  };
}