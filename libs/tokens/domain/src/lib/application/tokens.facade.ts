import '@total-typescript/ts-reset';

import type { CoinListResponseItem } from 'coingecko-api-v3';

import { Address } from '@evmos-task/common/value-objects';

import { Token } from '../entities/token.entity';
import type { ICoinGeckoService } from '../interfaces/coin-gecko.service.interface';
import type { IEvmosDenomMetadata, IEvmosService } from '../interfaces/evmos.service.interface';
import type { ITokenFacade } from '../interfaces/tokens.facade.interface';
import { store } from './tokens.store';

/**
 * Facade for token-related operations
 */
export class TokensFacade implements ITokenFacade {
  public store = store;

  constructor(private evmosService: IEvmosService, private coinGeckoService: ICoinGeckoService) {}

  async loadTokenList(): Promise<void> {
    const denomMetadata = await this.evmosService.fetchEvmosDenomMetadata();

    const coinGeckoCoinList = await this.coinGeckoService.fetchCoinList();
    const coinIds = coinGeckoCoinList
      .filter((coin) => findDenomMetadataForToken(coin, denomMetadata))
      .map((coin) => coin.id)
      .filter(Boolean);

    const tokenData = await this.coinGeckoService.fetchCoinDataList(coinIds);
    const tokenList = tokenData.map((token) =>
      Token.create({ ...token, denomMetadata: findDenomMetadataForToken(token, denomMetadata) }),
    );

    this.store.upsertTokenList(tokenList);
  }

  isValidAddressString(maybeAddress: unknown): maybeAddress is string {
    return Address.safeParse(maybeAddress).success;
  }

  setAccountAddress(maybeAddress: unknown): void {
    if (!this.isValidAddressString(maybeAddress)) {
      this.store.setAddress(null);
    } else {
      const address = new Address(maybeAddress);
      this.store.setAddress(address);
    }
  }

  subscribeBalanceListForAccount(interval = 5000): () => void {
    let intervalId: null | NodeJS.Timer = null;
    const updateTokens = async (address: Address) => {
      try {
        const erc20Balances = await this.evmosService.fetchErc20TokenBalanceListForAddress(address);
        const evmosBalances = await this.evmosService.fetchEvmosTokenBalanceListForAddress(address);
        this.store.updateTokenBalances([...evmosBalances, ...erc20Balances]);
      } catch (e) {
        this.store.setUpdateTokenError(e as Error);
      }
    };

    const onChange = async (address: Address | null) => {
      if (intervalId) clearInterval(intervalId);
      this.store.resetTokenBalances();
      this.store.setUpdateTokenError(null);

      if (address) {
        updateTokens(address);
        intervalId = setInterval(updateTokens, interval, address);
      }
    };
    const dispose = this.store.onAccountAddressChange(onChange);

    return () => {
      dispose();
      if (intervalId) clearInterval(intervalId);
    };
  }
}

const findDenomMetadataForToken = (
  coin: Pick<CoinListResponseItem, 'name' | 'symbol'>,
  denomMetadata: IEvmosDenomMetadata[],
) => {
  return denomMetadata.find(
    (metadata) =>
      metadata.name?.toLowerCase() === coin.name?.toLowerCase() ||
      metadata.symbol?.toLowerCase() === coin.symbol?.toLowerCase(),
  );
};
