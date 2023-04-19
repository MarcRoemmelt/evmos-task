import { IReactionDisposer, makeAutoObservable, observable, reaction, set } from 'mobx';

import { Currency } from '@evmos-task/common/util';
import { Address } from '@evmos-task/common/value-objects';

import { Token } from '../entities/token.entity';
import { IEvmosBalance } from '../interfaces/evmos.service.interface';

class Store {
  constructor() {
    makeAutoObservable(this, { currentAccountAddress: observable.ref });
  }

  /**
   * Current account address
   * Used to fetch token balances
   */
  currentAccountAddress: Address | null = null;
  tokenMap: Map<string, Token> = new Map();
  /**
   * Error that occurred during token balance update
   */
  updateTokenError: Error | null = null;

  /**
   * @param currency - currency to convert to
   * @returns Total value of all tokens in given currency
   */
  getTotalValue(currency: Currency) {
    return this.tokenList.reduce((acc, token) => acc + token.valueInCurrency(currency), 0);
  }

  get tokenList(): Token[] {
    return Array.from(this.tokenMap.values());
  }

  /**
   * Set current account address
   * @param address - address to set
   */
  setAddress(address: Address | null): void {
    this.currentAccountAddress = address;
  }

  /**
   * Upsert Tokens based on token.id
   * @param tokenList - list of tokens
   */
  upsertTokenList(tokenList: Token[]): void {
    tokenList.forEach((token) => set(this.tokenMap, token.id, token));
  }

  /**
   * Adds a MobX reaction to current account address
   */
  onAccountAddressChange(cb: (address: Address | null) => void): IReactionDisposer {
    return reaction(
      () => this.currentAccountAddress,
      (address) => cb(address),
      { fireImmediately: true },
    );
  }

  /**
   * Sets token balance update error
   * @param error - error to set
   */
  setUpdateTokenError(error: Error | null): void {
    this.updateTokenError = error;
  }

  /**
   * Sets balances for current account
   * @param balances - balances for current account
   */
  updateTokenBalances(balances: IEvmosBalance[]): void {
    const balancesMap = balances.reduce((acc, { denom, amount }) => acc.set(denom, amount), new Map<string, number>());
    this.tokenMap.forEach((token) => {
      if (balancesMap.has(token.denomMetadata.base)) {
        set(this.tokenMap, token.id, Token.create({ ...token, balance: balancesMap.get(token.denomMetadata.base) }));
      }
    });
  }

  /**
   * Resets all token balances to 0
   */
  resetTokenBalances() {
    this.tokenMap.forEach((token) => {
      set(this.tokenMap, token.id, Token.create({ ...token, balance: 0 }));
    });
  }
}

/**
 * MobX store for token-related data
 */
export const store = new Store();
