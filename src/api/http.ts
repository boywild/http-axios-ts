import Request from "@/libs/http/request";
// import type { AxiosResponse } from "axios";
import type { HttpResponse, HttpConfig } from "@/libs/http/types";
// 多baseUrl
// 自定义Header
// 自定义配置项
// 入参限制
// 出参智能提示
// log日志
// 加解密
// 装饰器
// 取消请求

// 上传
// 下载
// 表单

const request = new Request({
  baseURL: "",
  timeout: 5000,
  interceptors: {
    requestInterceptors: (config) => config,
    responseInterceptors: (res) => res,
  }
});

function Http<T = any, D = any>(config: HttpConfig<T, D>) {
  return request.request<HttpResponse<D>>(config);
}

// request.cancelRequest();
// request.cancelAllRequest();

export default Http;
