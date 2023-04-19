import ky from 'ky';
import type { Options } from 'ky/distribution/types/options';

import type { IHttpOptions, IHttpService } from './http.interface';

export class JSONApi implements IHttpService {
  constructor(private readonly options: IHttpOptions) {}

  async get<T>(url: string, options?: Options) {
    const result = await ky.get(`${this.options.baseUrl ?? ''}${url}`, options);
    return result.json<T>();
  }

  /* ...and so on */
}
