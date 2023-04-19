import type { CoinFullInfo } from 'coingecko-api-v3';

import { Currency } from '@evmos-task/common/util';

import { Token } from './token.entity';

const invalidData: CoinFullInfo = {
  id: 'incomplete',
};
const validData: CoinFullInfo = {
  id: '1',
  name: 'Test',
  symbol: 'TST',
};

describe('TokenEntity', () => {
  it('should throw error if invalid data is passed', () => {
    const fn = () => Token.create(invalidData);
    expect(fn).toThrowError();
  });

  it('should return instance of Token if successful', () => {
    const entity = Token.create(validData);
    expect(entity).toBeInstanceOf(Token);
    expect(entity.id).toBe(validData.id);
  });

  describe('valueInCurrency', () => {
    it('should return 0 if no market data is available', () => {
      const entity = Token.create(validData);
      expect(entity.valueInCurrency(Currency.USD)).toBe(0);
    });

    it('should return 0 if no price is available', () => {
      const entity = Token.create(validData);
      entity.market_data = {
        current_price: {
          usd: 0,
        },
      };
      expect(entity.valueInCurrency(Currency.USD)).toBe(0);
    });

    it('should return correct value', () => {
      const entity = Token.create(validData);
      entity.market_data = {
        current_price: {
          usd: 1,
        },
      };
      entity.balance = 1;
      expect(entity.valueInCurrency(Currency.USD)).toBe(1);
    });
  });
});
