export interface IHttpOptions {
  baseUrl?: string;
}

export interface IHttpService {
  get<T>(url: string, options?: RequestInit): Promise<T>;

  /* ...other methods... */
}
