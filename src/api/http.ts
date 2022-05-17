import "reflect-metadata";
import Request from "@/libs/http/request";
import { getPathMetaData, getMethodMetaData } from "@/libs/http/decorator";
// import type { AxiosResponse } from "axios";
import type { HttpResponse, HttpConfig } from "@/libs/http/types";
import Logger from "@/libs/logger";

export function useHttpDecorator<
  T extends { new (...arg: any[]): void },
  K extends keyof T
>(obj: T) {
  let res: { [index: string]: Function } = {};
  let property = Object.getOwnPropertyNames(obj);
  property = property.filter(
    (p) => ["name", "length", "prototype"].indexOf(p) === -1
  );
  property.forEach((k) => {
    if (k === "name" || k === "length" || k === "prototype") return;
    const controller = getPathMetaData(obj.prototype);
    const path = getPathMetaData(obj.prototype, k);
    const method = getMethodMetaData(obj.prototype, k);
    Logger.log(method);
    const url = controller + path;
    Logger.log(url);
    const func = (obj as any)[k];

    // type GetType<T> = T extends (...arg: infer P) => void ? P : string;
    // type StateType = GetType<typeof func>;

    // return { controller, path, method, url, func, funcName: k };
    res[k] = async (data, config) => {
      return await func(data, { ...config, method, url });
    };
  });
  console.log(res);
  return res;
}

const request = new Request({
  baseURL: "",
  timeout: 5000,
  interceptors: {
    requestInterceptors: (config) => config,
    responseInterceptors: (res) => res,
  },
});

function Http<T = any, D = any>(config: HttpConfig<T, D>) {
  return request.request<HttpResponse<D>>(config);
}

// request.cancelRequest();
// request.cancelAllRequest();

export default Http;
