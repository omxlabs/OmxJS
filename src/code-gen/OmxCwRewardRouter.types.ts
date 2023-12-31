/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  admin?: string | null;
  bn_omx: string;
  bonus_omx_tracker: string;
  es_omx: string;
  fee_olp_tracker: string;
  fee_omx_tracker: string;
  olp: string;
  olp_manager: string;
  omx: string;
  staked_olp_tracker: string;
  staked_omx_tracker: string;
  wosmo: string;
}
export type ExecuteMsg = {
  set_admin: SetAdminExec;
} | {
  unstake_cb: UnstakeCb;
} | {
  compound_cb: CompoundCb;
} | {
  compound_omx_cb: CompoundOmxCb;
} | {
  stake_omx_for_account: StakeOmxForAccountExec;
} | {
  stake_omx: StakeOmxExec;
} | {
  stake_es_omx: StakeEsOmxExec;
} | {
  unstake_omx: UnstakeOmxExec;
} | {
  unstake_es_omx: UnstakeEsOmxExec;
} | {
  claim: ClaimExec;
} | {
  claim_es_omx: ClaimEsOmxExec;
} | {
  claim_fees: ClaimFeesExec;
} | {
  compound: CompoundExec;
} | {
  compound_for_account: CompoundForAccountExec;
} | {
  mint_and_stake_olp: MintAndStakeOlpExec;
} | {
  mint_and_stake_olp_cb: MintAndStakeOlpCb;
} | {
  unstake_and_redeem_olp: UnstakeAndRedeemOlpExec;
} | {
  unstake_and_redeem_olp_osmo: UnstakeAndRedeemOlpOsmoExec;
} | {
  unstake_and_redeem_olp_osmo_cb: UnstakeAndRedeemOlpOsmoCb;
};
export type UnstakeCb = {
  stake_fee_omx_tracker: {
    account: Addr;
    amount: Uint128;
    balance: Uint128;
    balance_before: Uint128;
    reward_token: Addr;
  };
} | {
  unstake_fee_omx_tracker: {
    account: Addr;
    amount: Uint128;
    balance: Uint128;
  };
};
export type Addr = string;
export type Uint128 = string;
export type UnstakeAndRedeemOlpOsmoCb = {
  remove_liquidity: {
    account: Addr;
    min_out: Uint128;
    olp_amount: Uint128;
    recipient: string;
  };
} | {
  withdraw: {
    olp_amount: Uint128;
    osmo_balance_before: Uint128;
    recipient: string;
  };
};
export interface SetAdminExec {
  admin: string;
}
export interface CompoundCb {
  account: Addr;
  balance_before: Uint128;
  reward_token: Addr;
  stake_token: Addr;
}
export interface CompoundOmxCb {
  account: Addr;
  balance_before: Uint128;
  bn_omx: Addr;
  fee_omx_tracker: Addr;
}
export interface StakeOmxForAccountExec {
  account: string;
  amount: Uint128;
}
export interface StakeOmxExec {
  amount: Uint128;
}
export interface StakeEsOmxExec {
  amount: Uint128;
}
export interface UnstakeOmxExec {
  amount: Uint128;
}
export interface UnstakeEsOmxExec {
  amount: Uint128;
}
export interface ClaimExec {}
export interface ClaimEsOmxExec {}
export interface ClaimFeesExec {}
export interface CompoundExec {}
export interface CompoundForAccountExec {
  account: string;
}
export interface MintAndStakeOlpExec {
  amount: Uint128;
  min_olp: Uint128;
  min_usdo: Uint128;
  token: string;
}
export interface MintAndStakeOlpCb {
  account: Addr;
  olp_balance_before: Uint128;
  token: Addr;
}
export interface UnstakeAndRedeemOlpExec {
  min_out: Uint128;
  olp_amount: Uint128;
  recipient: string;
  token_out: string;
}
export interface UnstakeAndRedeemOlpOsmoExec {
  min_out: Uint128;
  olp_amount: Uint128;
  recipient: string;
}
export type QueryMsg = {
  admin: AdminQuery;
};
export interface AdminQuery {}
export interface MigrateMsg {}