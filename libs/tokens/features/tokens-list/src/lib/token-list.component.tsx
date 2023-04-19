import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { TokensProvider, useTokens } from '@evmos-task/tokens/domain';

import { StyledError, StyledSection, StyledUl } from './token-list.styles';
import { TokenListItem } from './token-list-item.component';
import { TotalBalance } from './total-balance.component';

const TokenListC = observer(() => {
  const [error, setError] = useState<Error>();
  const tokensFacade = useTokens();

  useEffect(() => {
    /* Fetch Token Data immediately - capture error if this fails */
    tokensFacade.loadTokenList().catch(setError);

    /* Update balances for current account */
    const dispose = tokensFacade.subscribeBalanceListForAccount();

    /* Cancel subscription (actually polling) */
    return dispose;
  }, [tokensFacade]);

  return (
    <StyledSection>
      <TotalBalance />

      {error && <StyledError>Failed to load tokens: {error.message}</StyledError>}

      <List />
    </StyledSection>
  );
});

/** Alwys keep iterated lists in separate component */
const List = observer(() => {
  const tokensFacade = useTokens();

  return (
    <StyledUl>
      {tokensFacade.store.tokenList
        .sort((a, b) => b.balance - a.balance)
        .map((token) => (
          <TokenListItem key={token.id} token={token} />
        ))}
    </StyledUl>
  );
});

/**
 * List of all Evmos Tokens
 *
 * Optionally includes balances/values for each tokens and the total balance if an address is provided
 */
export const TokenList = () => {
  return (
    /**
     * Wrap our feature with Domain Provider
     * Could also move the Provider to the root of the app
     */
    <TokensProvider>
      <TokenListC />
    </TokensProvider>
  );
};
