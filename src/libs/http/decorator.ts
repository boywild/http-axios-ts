import "reflect-metadata";
// import Http from "@/api/http";
import type { Method } from "axios";

const PATH = Symbol("path");
const METHOD = Symbol("method");

export function Controller(path: string): ClassDecorator {
  path = normalizePath(path);
  return function (target: Function) {
    Reflect.defineMetadata(PATH, path, target.prototype);
  };
}

function methodDecorator(method: Method) {
  return (path: string) => {
    path = normalizePath(path);
    return (target: Function, propertyKey: string) => {
      Reflect.defineMetadata(PATH, path, target.prototype, propertyKey);
      Reflect.defineMetadata(METHOD, method, target.prototype, propertyKey);
      // const func = descriptor.value;
      // descriptor.value = (data: T) => {
      //   func(data);
      //   return Http<T, P>({ url: target.path + path, method, data });
      // };
    };
  };
}

function getMetaData(type: Symbol, target: Object, propertyKey?: string) {
  if (propertyKey) {
    return Reflect.getMetadata(type, target, propertyKey) || "";
  }
  return Reflect.getMetadata(type, target) || "";
}

export function getPathMetaData(target: Object, propertyKey?: string): string {
  return getMetaData(PATH, target, propertyKey);
}

export function getMethodMetaData(
  target: Object,
  propertyKey?: string
): string {
  return getMetaData(METHOD, target, propertyKey);
}

function normalizePath(path: string): string {
  if (!path) return "";
  return path.startsWith("/") ? path : "/" + path;
}

export const Get = methodDecorator("GET");
export const Post = methodDecorator("POST");
export const Put = methodDecorator("PUT");
export const Del = methodDecorator("DELETE");
export const Head = methodDecorator("HEAD");
export const Patch = methodDecorator("PATCH");
export const Options = methodDecorator("OPTIONS");
