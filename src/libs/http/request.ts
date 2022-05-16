import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import type {
  RequestConfig,
  RequestInterceptors,
  CancelRequestSource,
} from "./types";

export default class Request {
  private instance: AxiosInstance;
  private interceptorObj?: RequestInterceptors<AxiosResponse>;
  private requestUrlList?: string[];
  private cancelSource?: CancelRequestSource[];

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorObj = config.interceptors;
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => config,
      (err: any) => err
    );

    this.instance.interceptors.request.use(
      this.interceptorObj?.requestInterceptors,
      this.interceptorObj?.responseInterceptorsError
    );
    this.instance.interceptors.response.use(
      this.interceptorObj?.responseInterceptors,
      this.interceptorObj?.responseInterceptorsError
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res.data,
      (err: any) => err
    );
  }

  public request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      const url = config.url;
      if (url) {
        this.requestUrlList?.push(url);
        config.cancelToken = new axios.CancelToken((c) => {
          this.cancelSource?.push({ [url]: c });
        });
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        })
        .finally(() => {
          url && this.delUrl(url);
        });
    });
  }

  /**
   * 取消部分请求
   * @param url Sting|String[]
   */
  public cancelRequest(url: string | string[]): void {
    if (typeof url === "string") {
      const index = this.getSourceIndex(url);
      index >= 0 && this.cancelSource?.[index][url]();
    } else {
      url.forEach((u) => {
        const index = this.getSourceIndex(u);
        index >= 0 && this.cancelSource?.[index][u]();
      });
    }
  }

  /**
   * 取消全部请求
   */
  public cancelAllRequest(): void {
    this.cancelSource?.forEach((source) => {
      const url = Object.keys(source)[0];
      source[url]();
    });
  }

  private delUrl(url: string): void {
    const index = this.requestUrlList?.findIndex((ele) => ele === url);
    const cancelIndex = this.getSourceIndex(url);

    index !== -1 && this.requestUrlList?.splice(index as number, 1);
    cancelIndex !== -1 && this.cancelSource?.splice(cancelIndex as number, 1);
  }

  /**
   * 匹配当前请求的url索引
   * @param url
   * @returns Number
   */
  private getSourceIndex(url: string): number {
    const index = this.cancelSource?.findIndex((ele) => {
      const urlKey = Object.keys(ele)[0] || "";
      return urlKey === url;
    }) as number;
    return index;
  }
}
