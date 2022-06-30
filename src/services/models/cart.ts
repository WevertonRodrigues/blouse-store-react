import { ProductCart } from "./productCart";

export interface Cart {
  owner: number;
  products: ProductCart[];
}
