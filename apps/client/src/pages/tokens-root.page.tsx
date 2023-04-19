import { AccountSelector } from '@evmos-task/tokens/features/account-selector';
import { TokenList } from '@evmos-task/tokens/features/tokens-list';

export const TokensRootPage = () => {
  return (
    <main>
      <h1>List Evmos Tokens for account</h1>
      <AccountSelector />
      <TokenList />
    </main>
  );
};
