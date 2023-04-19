import type { CoinFullInfo } from 'coingecko-api-v3';
import { z } from 'zod';

import { Currency } from '@evmos-task/common/util';

import type { IEvmosDenomMetadata } from '../interfaces/evmos.service.interface';
import type { IToken } from '../interfaces/token.interface';

const TokenSchema = z
  .object({
    id: z.string(),
    name: z.string(),

    balance: z.number().optional(),
  })
  /* TODO: Eventually explicitly define schema */
  .passthrough();
type TokenSchema = z.infer<typeof TokenSchema>;

export class Token implements IToken {
  id: string;
  name: string;
  symbol: string;

  balance = 0;
  denomMetadata: IEvmosDenomMetadata;
  market_data: IToken['market_data'];

  get type() {
    return this.denomMetadata.base.startsWith('erc20') ? 'erc20' : 'icb';
  }

  valueInCurrency(currency: Currency) {
    const price = this.market_data?.current_price?.[currency];
    return price ? Math.round(price * this.balance * 100) / 100 : 0;
  }

  private constructor(data: TokenSchema) {
    Object.assign(this, data);
  }

  static create(data: CoinFullInfo | Token): Token {
    const parsed = TokenSchema.parse(data);
    return new Token(parsed);
  }
}
