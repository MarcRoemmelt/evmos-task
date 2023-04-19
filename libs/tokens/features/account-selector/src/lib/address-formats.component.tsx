import { observer } from 'mobx-react-lite';

import { useTokens } from '@evmos-task/tokens/domain';

export const AddressFormats = observer(() => {
  const tokensFacade = useTokens();

  const address = tokensFacade.store.currentAccountAddress;
  if (!address) return null;

  const hex = address.toHex();
  const bech32 = address.toBech32EvmosAddress();
  return (
    <section>
      <p>
        <strong>Hex: </strong>
        <span data-cy="hex-address">{hex}</span>
      </p>
      <p>
        <strong>Bech32: </strong>
        <span data-cy="bech32-address">{bech32}</span>
      </p>
    </section>
  );
});
