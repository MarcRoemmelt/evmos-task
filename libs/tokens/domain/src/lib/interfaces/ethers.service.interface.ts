import { ethers } from 'ethers';

import { Address } from '@evmos-task/common/value-objects';

export interface IEthersService {
  parseEth(value: ethers.BigNumberish): number;
  getBalanceForToken(options: IGetBalanceForTokenOptions): Promise<number>;
}
export interface IGetBalanceForTokenOptions {
  networkUrl: string;
  token: string;
  address: Address;
}
