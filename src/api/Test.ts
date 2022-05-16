import "reflect-metadata";
import Http from "./http";
import Log from "@/libs/log";
import {
  Controller,
  Get,
  getPathMetaData,
  getMethodMetaData,
} from "@/libs/http/decorator";
import type { IGetParams, IGetRes } from "./interface";
export type { IGetParams, IGetRes } from "./interface";

// export const getAddrs = (data: IGetParams) => {
//   return Http<IGetParams, IGetRes>({
//     url: "/top/artists",
//     method: "GET",
//     data,
//   });
// };

// @Reflect.metadata("name", "chentian")
@Controller("/api")
class Test {
  @Get("/top/artists")
  static getAddrs(data: IGetParams) {
    console.log(data);
    // return Http<IGetParams, IGetRes>({ data });
  }
}

function a(obj) {
  let res = {};
  const property = Object.getOwnPropertyNames(obj);
  property.forEach((k) => {
    if (k === "name" || k === "length" || k === "prototype") return;
    const controller = getPathMetaData(obj.prototype);
    const path = getPathMetaData(Test.prototype, k);
    const method = getMethodMetaData(Test.prototype, k);
    Log.log(method);
    const url = controller + path;
    Log.log(url);
    res[k] = (data) => {
      console.log(data);
      return Http<IGetParams, IGetRes>({ method, url, data });
    };
  });
  return res;
}
type ResType = typeof Test;
const res: ResType = a(Test);
console.log(res);
export default res;
