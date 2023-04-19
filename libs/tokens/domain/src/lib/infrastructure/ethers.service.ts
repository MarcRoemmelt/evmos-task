import { ethers } from 'ethers';

import { IEthersService, IGetBalanceForTokenOptions } from '../interfaces/ethers.service.interface';
import erc20Abi from './erc20-abi.json';

export class EthersService implements IEthersService {
  parseEth(value: ethers.BigNumberish): number {
    return parseFloat(ethers.formatEther(value));
  }
  async getBalanceForToken(options: IGetBalanceForTokenOptions) {
    const ethersProvider = ethers.getDefaultProvider(options.networkUrl);
    const contract = new ethers.Contract(options.token, erc20Abi, ethersProvider);
    const amount = await contract['balanceOf'](options.address.toHex());
    return parseFloat(ethers.formatEther(amount));
  }
}
