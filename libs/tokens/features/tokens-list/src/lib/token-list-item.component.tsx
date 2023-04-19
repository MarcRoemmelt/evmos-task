import { Currency, getCurrencySymbol } from '@evmos-task/common/util';
import { Token } from '@evmos-task/tokens/domain';

import { StyledBalance, StyledH2, StyledLi, StyledSymbol, StyledType } from './token-list-item.styles';

export const TokenListItem = ({ token }: { token: Token }) => {
  return (
    <StyledLi id={token.id}>
      <StyledType>{token.type}</StyledType>
      <StyledH2 title="Token Name">
        {token.name} <StyledSymbol title="Token Symbol">({token.symbol})</StyledSymbol>
      </StyledH2>
      <StyledBalance>
        <span title={token.balance.toString()}>{token.balance.toFixed(4)}</span> /{' '}
        <span>
          {token.valueInCurrency(Currency.EUR)} {getCurrencySymbol(Currency.EUR)}
        </span>
      </StyledBalance>
    </StyledLi>
  );
};
