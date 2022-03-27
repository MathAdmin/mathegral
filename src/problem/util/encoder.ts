import { encode as b36enc, decode as b36dec } from "@abcnews/base-36-text";

export const encode = (obj: object): string => {
  return b36enc(JSON.stringify(obj));
};

export const decode = (str: string): object => {
  return JSON.parse(b36dec(str));
};
