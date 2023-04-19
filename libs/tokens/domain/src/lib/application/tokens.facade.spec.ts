import { Address } from '@evmos-task/common/value-objects';

import { Token } from '../entities/token.entity';
import { CoinGeckoService } from '../infrastructure/coin-gecko.service';
import { EvmosService } from '../infrastructure/evmos.service';
import { IEvmosDenomMetadata } from '../interfaces/evmos.service.interface';
import { TokensFacade } from './tokens.facade';

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
  balance: 0,
  parseEth() {
    return 22;
  },
  getBalanceForToken() {
    return Promise.resolve(this.balance);
  },
};
describe('TokensFacade', () => {
  const http = mockHttp;
  const ethers = mockEthers;
  const evmos = new EvmosService(http, ethers);
  const coinGecko = new CoinGeckoService(http);
  const facade = new TokensFacade(evmos, coinGecko);

  beforeEach(() => {
    facade.store.tokenMap = new Map();
    facade.setAccountAddress(null);
  });

  describe('loadTokenList', () => {
    it('should load token list and set it in the store', async () => {
      const metadatas = [
        {
          id: 'evmos',
          name: 'Evmos',
        },
      ];
      http.mockResult({ metadatas });

      expect(facade.store.tokenMap.get('evmos')).toBeUndefined();
      await facade.loadTokenList();
      expect(facade.store.tokenMap.get('evmos')).toBeDefined();
    });
  });

  describe('isValidAddressString', () => {
    it('should return true if address is valid', () => {
      expect(facade.isValidAddressString('0xf1829676DB577682E944fc3493d451B67Ff3E29F')).toBe(true);
    });
    it('should return false if address is invalid', () => {
      expect(facade.isValidAddressString('cosmos')).toBe(false);
    });
  });

  describe('setAccountAddress', () => {
    it('should set address if address is valid', () => {
      facade.setAccountAddress('0xf1829676DB577682E944fc3493d451B67Ff3E29F');
      expect(facade.store.currentAccountAddress).toEqual(new Address('0xf1829676DB577682E944fc3493d451B67Ff3E29F'));
    });

    it('should set address to null if address is invalid', () => {
      facade.setAccountAddress('cosmos');
      expect(facade.store.currentAccountAddress).toBeNull();
    });
  });

  describe('subscribeBalanceListForAccount', () => {
    it.skip('should set all balances to 0 if address is set to null', async () => {
      const tokenList = [
        Token.create({
          id: 'evmos',
          name: 'Evmos',
          symbol: 'AEVMOS',
          balance: 1,
        }),
      ];
      facade.setAccountAddress('0xf1829676DB577682E944fc3493d451B67Ff3E29F');

      const dispose = facade.subscribeBalanceListForAccount();
      facade.store.upsertTokenList(tokenList);
      expect(facade.store.tokenMap.get('evmos')?.balance).toBe(1);

      facade.setAccountAddress(null);
      expect(facade.store.tokenMap.get('evmos')?.balance).toBe(0);
      dispose();
    });

    it('should update balances if address is set', async () => {
      const tokenList = [
        Token.create({
          id: 'evmos',
          name: 'Evmos',
          symbol: 'AEVMOS',
          denomMetadata: {
            base: 'aevmos',
          } as IEvmosDenomMetadata,
        }),
      ];
      http.mockResult({ token_pairs: [], balances: [{ denom: 'aevmos', amount: 0x16 }] });

      facade.store.upsertTokenList(tokenList);
      const dispose = facade.subscribeBalanceListForAccount();
      facade.setAccountAddress('0xf1829676DB577682E944fc3493d451B67Ff3E29F');

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(facade.store.tokenMap.get('evmos')?.balance).toEqual(22);
      dispose();
    });
  });
});
