import Http from "./http";
import { useHttpDecorator } from "./http";
import { Controller, Get } from "@/libs/http/decorator";
import type { RequestConfig } from "@/libs/http/types";
import type { IGetParams, IGetRes } from "./interface";
export type { IGetParams, IGetRes } from "./interface";

// export const getAddrs = (data: IGetParams) => {
//   return Http<IGetParams, IGetRes>({
//     url: "/top/artists",
//     method: "GET",
//     data,
//   });
// };

@Controller("/api")
class Test {
  @Get("/top/artists")
  static getAddrs(data: IGetParams, config: RequestConfig) {
    console.log(data);
    return Http<IGetParams, IGetRes>({ data, ...(config as {}) });
  }
}

// class Test2 {
//   getAddrs: number;
//   getAddrs2: number;
// }
// type a = Test2;

// const b: keyof Test2 = {
//   getAddrs() {},
// };
// type GetType<T> = T extends (...arg: infer P) => void ? P : string;
// type StateType = GetType<typeof Test>;
// const a = new Test();
const res = useHttpDecorator<typeof Test>(Test);
console.log(res);
export default res;
