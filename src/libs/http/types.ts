import type { AxiosRequestConfig, AxiosResponse } from "axios";
export interface RequestInterceptors<T> {
  requestInterceptors?(config: AxiosRequestConfig): AxiosRequestConfig;
  requestInterceptorsError?(err: any): string;

  responseInterceptors?(res: T): T;
  responseInterceptorsError?(err: any): any;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
}

export interface CancelRequestSource {
  [index: string]: any;
}

export interface HttpResponse<T> {
  code: number;
  more: boolean;
  artists: T[];
}

export interface HttpConfig<T, D> extends RequestConfig<HttpResponse<D>> {
  data: T;
}

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DEL"
  | "HEAD"
  | "PATCH"
  | "OPTIONS";
