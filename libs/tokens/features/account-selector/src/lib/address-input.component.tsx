import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { useTokens } from '@evmos-task/tokens/domain';

import { StyledError, StyledForm, StyledInput, StyledSubmit } from './account-selector.styles';

export const AddressInput = observer(() => {
  const [currentInput, setInput] = useState('');
  const tokensFacade = useTokens();

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (event.key === 'Enter' && target.value) {
      tokensFacade.setAccountAddress(target.value);
    }
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tokensFacade.setAccountAddress(currentInput);
  };

  const isValid = !tokensFacade.store.updateTokenError || tokensFacade.isValidAddressString(currentInput);

  return (
    <StyledForm onSubmit={submit}>
      <StyledInput
        data-cy="address-input"
        type="text"
        placeholder="Evmos address in hex or Bech32 format"
        isValid={isValid}
        isEmpty={!currentInput}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleEnter}
      />
      <StyledSubmit type="submit" value="Search" disabled={!isValid} />

      <Error hasError={!isValid} message={tokensFacade.store.updateTokenError?.message} />
    </StyledForm>
  );
});

const Error = ({ message, hasError }: { message?: string; hasError: boolean }) => {
  return hasError ? <StyledError>This address appears invalid. {message}</StyledError> : null;
};
