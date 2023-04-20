import { fromBech32, toBech32 } from '@harmony-js/crypto';
import { Buffer } from 'buffer';
import { z } from 'zod';
import { ValueObject } from 'zod-value-object';

window.Buffer = Buffer;

const AddressSchema = z.lazy(() =>
  z
    .union([
      /* TODO: Are these satisfying? It seems stronger validation is required */
      z.string().regex(/^0x[0-9a-fA-F]{40}$/),
      z.string().regex(/^evmos1[0-9a-z]{38}$/),
    ])
    /* TODO: Replace this is improved validation. Might require calling the network */
    .refine((maybeAddress) => {
      try {
        try {
          fromBech32(maybeAddress, 'evmos');
        } catch (e) {
          toBech32(maybeAddress, 'evmos');
        }
      } catch (_) {
        return false;
      }
      return true;
    }),
);

export class Address extends ValueObject('Address', AddressSchema) {
  toHex() {
    return this.value.startsWith('evmos1') ? fromBech32(this.value, 'evmos') : this.value;
  }
  toBech32EvmosAddress() {
    return this.value.startsWith('evmos1') ? this.value : toBech32(this.value, 'evmos');
  }
}
