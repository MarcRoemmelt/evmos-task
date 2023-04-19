import { createContext, useContext, useMemo } from 'react';

import { IHttpOptions, IHttpService } from './http.interface';
import { JSONApi } from './json-api';

interface IHttpContext {
  HttpClient: new (options: IHttpOptions) => IHttpService;
  defaultOptions?: IHttpOptions;
}
const HttpContext = createContext<IHttpContext>({
  HttpClient: JSONApi,
});

/**
 * Use the Http Service
 * Optionally provide options to override the default options
 */
export const useHttp = (options?: IHttpOptions) => {
  const { HttpClient, defaultOptions } = useContext(HttpContext);
  const client = useMemo(
    () => new HttpClient({ ...defaultOptions, ...(options ?? {}) }),
    [HttpClient, defaultOptions, options],
  );
  return client;
};

export interface IApiProviderOptions {
  children: React.ReactNode;
  defaultOptions?: IHttpOptions;
  HttpClient?: new (options: IHttpOptions) => IHttpService;
}

export const HttpProvider = ({ children, HttpClient = JSONApi, defaultOptions = {} }: IApiProviderOptions) => {
  return <HttpContext.Provider value={{ HttpClient, defaultOptions }}>{children}</HttpContext.Provider>;
};
