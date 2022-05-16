import "reflect-metadata";
import Http from "@/libs/http";
import Log from "@/libs/log";
import {
  Controller,
  Get,
  getPathMetaData,
  getMethodMetaData,
} from "@/libs/http/decorator";
import type { IGetParams, IGetRes } from "./interface";
export type { IGetParams, IGetRes } from "./interface";

export const getAddrs = (data: IGetParams) => {
  return Http<IGetParams, IGetRes>({
    url: "/top/artists",
    method: "GET",
    data,
  });
};

// @Reflect.metadata("name", "chentian")
@Controller("/api")
export default class Test {
  //   @getUserInfo
  private static path = "/api";

  @Get<IGetParams, IGetRes>("/top/artists")
  static getAddrs(data: IGetParams) {
    console.log(data);
    // return Http<IGetParams, IGetRes>({ data });
  }
}

// const a = new Test();
// Test.getAddrs({ offset: 0, limit: 1 });
const p = getPathMetaData(Test.prototype);
Log.log(p);
const p2 = getPathMetaData(Test.prototype, "getAddrs");
Log.log(p2);
const m = getMethodMetaData(Test.prototype, "getAddrs");
Log.log(m);
