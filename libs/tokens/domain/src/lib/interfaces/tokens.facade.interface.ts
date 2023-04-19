export interface ITokenFacade {
  /**
   * Loads and stores all relevant token data for Evmos-listed tokens
   */
  loadTokenList(): Promise<void>;

  /**
   * HelperFN to check if a given value is a valid address string
   */
  isValidAddressString(account: unknown): boolean;

  /**
   * Sets current account address
   */
  setAccountAddress(account: unknown): void;

  /**
   * Polls token balances for current address - if set.
   * Otherwise resets balances.
   *
   * @param interval - refetch-interval in ms
   * @returns dispose function to cancel subscription
   */
  subscribeBalanceListForAccount(interval: number): () => void;
}
