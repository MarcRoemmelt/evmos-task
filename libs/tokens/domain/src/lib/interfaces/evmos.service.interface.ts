import { Address } from '@evmos-task/common/value-objects';

export interface IEvmosService {
  /** Returns list of all officially supported tokens on evmos */
  fetchEvmosTokenPairList(): Promise<IEvmosTokenPair[]>;

  /** Returns list of all officially supported tokens on evmos with metadata (but without address) */
  fetchEvmosDenomMetadata(): Promise<IEvmosDenomMetadata[]>;

  /** Returns list of ibc/Cosmos balances for specified address */
  fetchEvmosTokenBalanceListForAddress(address: Address): Promise<IEvmosBalance[]>;

  /** Returns list of ERC20 balances for address */
  fetchErc20TokenBalanceListForAddress(address: Address): Promise<IEvmosBalance[]>;
}

export enum ContractOwner {
  EXTERNAL = 'OWNER_EXTERNAL',
  MODULE = 'OWNER_MODULE',
  UNSPECIFIED = 'OWNER_UNSPECIFIED',
}

export interface IEvmosTokenPair {
  erc20_address: string;
  denom: string;
  enabled: boolean;
  contract_owner: ContractOwner;
}

export interface IEvmosBalance {
  denom: string;
  amount: number;
}
export interface IEvmosDenomMetadata {
  description: string;
  denom_units: IEvmosDenumUnit[];
  base: string;
  display: string;
  name?: string;
  symbol: string;
  uri: string;
  uri_hash: string;
}
export interface IEvmosDenumUnit {
  denom: string;
  exponent: number;
  aliases: string[];
}
