import { IHttpService } from '@evmos-task/common/data-access';

import { CoinGeckoService } from './coin-gecko.service';

describe('CoinGeckoService', () => {
  const http: IHttpService = { get: <T>() => Promise.resolve(null as T) };
  const service = new CoinGeckoService(http);

  describe('fetchCoinList', () => {
    it('should return list of coins', async () => {
      const res = await service.fetchCoinList();
      expect(res).toBeInstanceOf(Array);
      res.forEach((coin) => {
        expect(coin).toHaveProperty('id');
        expect(coin).toHaveProperty('symbol');
        expect(coin).toHaveProperty('name');
      });
    });
  });

  describe('fetchCoinData', () => {
    it('should return coin data', async () => {
      const res = await service.fetchCoinData('evmos');
      expect(res).toHaveProperty('id');
      expect(res).toHaveProperty('symbol');
      expect(res).toHaveProperty('name');
      expect(res).toHaveProperty('market_data');
    });
  });

  describe('fetchCoinDataList', () => {
    it('should return list of coin data', async () => {
      const res = await service.fetchCoinDataList(['cosmos', 'evmos']);
      expect(res).toBeInstanceOf(Array);
      res.forEach((coin) => {
        expect(coin).toHaveProperty('id');
        expect(coin).toHaveProperty('symbol');
        expect(coin).toHaveProperty('name');
        expect(coin).toHaveProperty('market_data');
      });
    });
  });
});
