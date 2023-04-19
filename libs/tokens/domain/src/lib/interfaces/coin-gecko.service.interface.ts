import type { CoinFullInfo, CoinListResponseItem } from 'coingecko-api-v3';

export interface ICoinGeckoService {
  /** Returns list of all coins on CoinGecko */
  fetchCoinList(): Promise<CoinListResponseItem[]>;

  /** Returns data for a coin on CoinGecko */
  fetchCoinData(coinId: string): Promise<CoinFullInfo>;

  /** Returns data for a list of coins on CoinGecko */
  fetchCoinDataList(coinIds: string[]): Promise<CoinFullInfo[]>;
}
