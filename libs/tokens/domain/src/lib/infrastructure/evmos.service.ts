import { QueryClient } from '@tanstack/react-query';

import { IHttpService } from '@evmos-task/common/data-access';
import { Address } from '@evmos-task/common/value-objects';

import { IEthersService } from '../interfaces/ethers.service.interface';
import type {
  IEvmosBalance,
  IEvmosDenomMetadata,
  IEvmosService,
  IEvmosTokenPair,
} from '../interfaces/evmos.service.interface';

const TOKEN_PAIRS_URL = 'https://rest.bd.evmos.org:1317/evmos/erc20/v1/token_pairs';
const DENOM_METADATA_URL = 'https://rest.bd.evmos.org:1317/cosmos/bank/v1beta1/denoms_metadata';
const BALANCES_URL = 'https://rest.bd.evmos.org:1317/cosmos/bank/v1beta1/balances';
const RPC_URL = 'https://eth.bd.evmos.org:8545';

/**
 * This service is used to fetch data from Evmos API.
 */
export class EvmosService implements IEvmosService {
  #queryClient: QueryClient;
  constructor(private http: IHttpService, private ethersService: IEthersService) {
    this.#queryClient = new QueryClient();
  }

  async fetchEvmosTokenPairList(): Promise<IEvmosTokenPair[]> {
    const query = () => this.http.get<{ token_pairs: IEvmosTokenPair[] }>(TOKEN_PAIRS_URL);
    const res = await this.#queryClient.fetchQuery(['tokenPairs'], query, { staleTime: 1000 * 60 * 60 });
    return res.token_pairs;
  }

  async fetchEvmosDenomMetadata(): Promise<IEvmosDenomMetadata[]> {
    const query = () => this.http.get<{ metadatas: IEvmosDenomMetadata[] }>(DENOM_METADATA_URL);
    const res = await this.#queryClient.fetchQuery(['denomMetadata'], query, { staleTime: 1000 * 60 * 60 });
    return res.metadatas;
  }

  async fetchEvmosTokenBalanceListForAddress(address: Address): Promise<IEvmosBalance[]> {
    const query = () =>
      this.http.get<{ balances: IEvmosBalance[] }>(`${BALANCES_URL}/${address.toBech32EvmosAddress()}`);
    const res = await this.#queryClient.fetchQuery(['evmosTokenList', address.toBech32EvmosAddress()], query);
    return res.balances.map(({ denom, amount }) => ({ denom, amount: this.ethersService.parseEth(amount) }));
  }

  async fetchErc20TokenBalanceListForAddress(address: Address): Promise<IEvmosBalance[]> {
    /* We are only fetching ERC20 Tokens if they are white-listed by Evmos */
    const tokenPairs = await this.fetchEvmosTokenPairList();
    const erc20Tokens = tokenPairs.filter(({ denom }) => denom.startsWith('erc20'));

    const query = () =>
      Promise.all(
        erc20Tokens.map(async ({ denom, erc20_address }) => ({
          denom,
          amount: await this.ethersService.getBalanceForToken({ networkUrl: RPC_URL, token: erc20_address, address }),
        })),
      );

    const result = await this.#queryClient.fetchQuery(['erc20TokenList', address.toHex()], query);
    return result;
  }
}
