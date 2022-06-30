import { GenericEnumObjectType } from "../@types";

export function enumToObject<T>(
  target: T,
  options?: {
    name: (item: T, key: string | number | symbol, index: number) => any;
  }
): GenericEnumObjectType<T> {
  const {
    name = (item: T, key: string | number | symbol) => (item as any)[key],
  } = options ?? {};
  const keys = Object.keys(target) as (keyof T)[];

  let obj = {} as GenericEnumObjectType<T>;

  keys
    .slice(0, Math.floor(keys.length / 2))
    .forEach((key, index) => (obj[key] = name(target, key, index)));

  return obj;
}
