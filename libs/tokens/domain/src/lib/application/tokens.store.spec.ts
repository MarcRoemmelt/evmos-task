import { Currency } from '@evmos-task/common/util';
import { Address } from '@evmos-task/common/value-objects';

import { Token } from '../entities/token.entity';
import { store as tokenStore } from './tokens.store';
describe('TokensStore', () => {
  const store = tokenStore;

  describe('setAddress', () => {
    it('should set current account address', () => {
      const address = new Address('0xf1829676DB577682E944fc3493d451B67Ff3E29F');
      store.setAddress(address);
      expect(store.currentAccountAddress).toEqual(address);
    });
  });

  describe('upsertTokenList', () => {
    it('should upsert token list', () => {
      const tokenList = [
        Token.create({
          id: 'aevmos',
          name: 'Evmos',
          symbol: 'AEVMOS',
          balance: 0,
        }),
      ];
      store.upsertTokenList(tokenList);
      expect(store.tokenMap.get('aevmos')).toEqual(tokenList[0]);
    });
  });

  describe('onAccountAddressChange', () => {
    it('should add a MobX reaction to current account address', () => {
      const address = new Address('0xf1829676DB577682E944fc3493d451B67Ff3E29F');
      const cb = vi.fn();
      store.onAccountAddressChange(cb);
      store.setAddress(address);
      expect(cb).toBeCalledWith(address);
    });
  });

  describe('getTotalValue', () => {
    it('should return total value of all tokens in given currency', () => {
      const tokenList = [
        Token.create({
          id: 'aevmos',
          name: 'Evmos',
          symbol: 'AEVMOS',
          balance: 1,
          market_data: {
            current_price: {
              [Currency.USD]: 1,
            },
          },
        }),
        Token.create({
          id: 'cosmos',
          name: 'Cosmos',
          symbol: 'COSMOS',
          balance: 1,
          market_data: {
            current_price: {
              [Currency.USD]: 2,
            },
          },
        }),
      ];
      store.upsertTokenList(tokenList);
      expect(store.getTotalValue(Currency.USD)).toEqual(3);
    });
  });

  describe('get tokenList', () => {
    it('should return token list', () => {
      store.tokenMap = new Map();
      const tokenList = [
        Token.create({
          id: 'aevmos',
          name: 'Evmos',
          symbol: 'AEVMOS',
          balance: 0,
        }),
      ];
      store.upsertTokenList(tokenList);
      expect(store.tokenList).toEqual(tokenList);
    });
  });

  describe('updateTokenError', () => {
    it('should set updateTokenError', () => {
      const error = new Error('test');
      store.updateTokenError = error;
      expect(store.updateTokenError).toEqual(error);
    });
  });

  describe('resetTokenBalances', () => {
    it('should reset token balances', () => {
      const tokenList = [
        Token.create({
          id: 'aevmos',
          name: 'Evmos',
          symbol: 'AEVMOS',
          balance: 1,
        }),
      ];
      store.upsertTokenList(tokenList);
      store.resetTokenBalances();
      expect(store.tokenList[0].balance).toEqual(0);
    });
  });
});
