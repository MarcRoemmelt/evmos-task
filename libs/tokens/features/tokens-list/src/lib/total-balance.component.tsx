import { observer } from 'mobx-react-lite';

import { Currency, getCurrencySymbol } from '@evmos-task/common/util';
import { useTokens } from '@evmos-task/tokens/domain';

export const TotalBalance = observer(() => {
  const tokensFacade = useTokens();

  const address = tokensFacade.store.currentAccountAddress;

  return (
    <section>
      <p>
        {address
          ? `Total Balance: ${tokensFacade.store.getTotalValue(Currency.EUR)} ${getCurrencySymbol(Currency.EUR)}`
          : 'Please enter an address'}
      </p>
    </section>
  );
});
