import { observer } from 'mobx-react-lite';

import { TokensProvider } from '@evmos-task/tokens/domain';

import { StyledSection } from './account-selector.styles';
import { AddressFormats } from './address-formats.component';
import { AddressInput } from './address-input.component';

const AccountSelectorC = observer(() => {
  return (
    <StyledSection>
      <AddressInput />
      <AddressFormats />
    </StyledSection>
  );
});

/**
 * Input form to provide an Evmos address in Hex or Bech32 format
 */
export const AccountSelector = () => {
  return (
    /**
     * Wrap our feature with Domain Provider
     * Could also move the Provider to the root of the app
     */
    <TokensProvider>
      <AccountSelectorC />
    </TokensProvider>
  );
};
