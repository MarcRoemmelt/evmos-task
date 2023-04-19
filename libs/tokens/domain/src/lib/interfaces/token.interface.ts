import type { CoinFullInfo } from 'coingecko-api-v3';

import type { ContractOwner, IEvmosDenomMetadata } from './evmos.service.interface';

export interface ITokenPair {
  erc20Address: string;
  denom: string;
  enabled: boolean;
  contractOwner: ContractOwner;
}

export interface IToken extends CoinFullInfo {
  id: string;
  name: string;
  symbol: string;

  denomMetadata: IEvmosDenomMetadata;
}
