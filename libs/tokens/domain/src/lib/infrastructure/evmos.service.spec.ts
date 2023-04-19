import { Address } from '@evmos-task/common/value-objects';

import { EvmosService } from './evmos.service';

const mockHttp = {
  result: void 0 as unknown,
  mockResult<T>(val: T) {
    this.result = val;
  },
  get<T>() {
    return Promise.resolve(this.result as T);
  },
};

const mockEthers = {
  parseEth() {
    return 1;
  },
  getBalanceForToken() {
    return Promise.resolve(1);
  },
};
const BIG_NUMBER = 7892197000000000;
describe('EvmosService', () => {
  const http = mockHttp;
  const ethers = mockEthers;
  const service = new EvmosService(http, ethers);

  describe('fetchEvmosTokenPairList', () => {
    it('should return token_pair list', async () => {
      const token_pairs = [{ denom: 'aevmos' }];
      http.mockResult({ token_pairs });
      const res = await service.fetchEvmosTokenPairList();
      expect(res).toEqual(token_pairs);
    });
  });

  describe('fetchEvmosDenomMetadata', () => {
    it('should return metadatas list', async () => {
      const metadatas = { name: 'Evmos' };
      http.mockResult({ metadatas });
      const res = await service.fetchEvmosDenomMetadata();
      expect(res).toEqual(metadatas);
    });
  });

  describe('fetchEvmosTokenBalanceListForAddress', () => {
    const address = new Address('0xf1829676DB577682E944fc3493d451B67Ff3E29F');
    it('should return tokenBalance list', async () => {
      const balances = [{ denom: 'aevmos', amount: BIG_NUMBER }];
      http.mockResult({ balances });
      const res = await service.fetchEvmosTokenBalanceListForAddress(address);
      res.forEach((balance) => {
        expect(balance).toHaveProperty('denom');
        expect(balance).toHaveProperty('amount');
        expect(balance.amount).toBeTypeOf('number');
      });
    });
  });

  describe('fetchErc20TokenBalanceListForAddress', () => {
    const address = new Address('0xf1829676DB577682E944fc3493d451B67Ff3E29F');
    it('should return tokenBalance list', async () => {
      const token_pairs = [{ denom: 'aevmos' }];
      http.mockResult({ token_pairs });
      const res = await service.fetchErc20TokenBalanceListForAddress(address);
      res.forEach((balance) => {
        expect(balance).toHaveProperty('denom');
        expect(balance).toHaveProperty('amount');
        expect(balance).toEqual({ denom: 'aevmos', amount: 1 });
      });
    });
  });
});
