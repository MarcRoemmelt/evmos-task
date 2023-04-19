import { QueryClient } from '@tanstack/react-query';
import type { CoinFullInfo, CoinListResponseItem } from 'coingecko-api-v3';

import type { IHttpService } from '@evmos-task/common/data-access';

import { ICoinGeckoService } from '../interfaces/coin-gecko.service.interface';

/**
 * This service is used to fetch data from CoinGecko API.
 *
 * *Note:* The public API is heavily rate-limited, so we use a local mock API to fetch data.
 */
export class CoinGeckoService implements ICoinGeckoService {
  #queryClient: QueryClient;

  constructor(private http: IHttpService) {
    this.#queryClient = new QueryClient();
  }

  async fetchCoinList(): Promise<CoinListResponseItem[]> {
    // const query = () => this.http.get<CoinListResponseItem[]>('/coins/list');
    const query = () => import('./api-responses/coins.list.json').then((module) => module.default);
    const res = await this.#queryClient.fetchQuery(['coinGeckoCoinList'], query, { staleTime: Infinity });
    return res;
  }

  async fetchCoinData(coinId: string): Promise<CoinFullInfo> {
    // const query = () => this.http.get<CoinFullInfo>(`/coins/${coinId}?market_data=true`);
    const query = () => import(`./api-responses/coins.${coinId}.json`).then((module) => module.default);
    const res = await this.#queryClient.fetchQuery(['coinGeckoCoin', coinId], query, { staleTime: Infinity });
    return res;
  }

  async fetchCoinDataList(coinIds: string[]): Promise<CoinFullInfo[]> {
    return Promise.all(coinIds.map((id) => this.fetchCoinData(id)));
  }
}
