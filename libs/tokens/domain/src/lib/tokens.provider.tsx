import { createContext, useContext, useMemo } from 'react';

import { useHttp } from '@evmos-task/common/data-access';

import { TokensFacade } from './application/tokens.facade';
import { CoinGeckoService } from './infrastructure/coin-gecko.service';
import { EthersService } from './infrastructure/ethers.service';
import { EvmosService } from './infrastructure/evmos.service';

const TokensContext = createContext<TokensFacade>(null as unknown as TokensFacade);

export const useTokens = () => useContext(TokensContext);

export interface ITokensProviderOptions {
  children: React.ReactNode;
}

let cached: null | TokensFacade = null;
export const TokensProvider = ({ children }: ITokensProviderOptions) => {
  /* Use the common HttpService */
  const http = useHttp();

  /* Same but different baseURL for CoinGeckoService */
  const coinGeckoHttp = useHttp({ baseUrl: 'https://api.coingecko.com/api/v3' });

  /* Create Facade as entrypoint to domain for all features */
  const tokensFacade = useMemo(() => {
    if (cached) return cached;
    const ethersService = new EthersService();
    const coinGeckoService = new CoinGeckoService(coinGeckoHttp);
    const evmosService = new EvmosService(http, ethersService);
    return new TokensFacade(evmosService, coinGeckoService);
  }, [coinGeckoHttp, http]);

  /* Re-use our facade */
  cached = tokensFacade;

  return <TokensContext.Provider value={tokensFacade}>{children}</TokensContext.Provider>;
};
