import { Size, Tissue } from "../enums";
import { IModel } from "./model";

export interface Product extends IModel {
  name: string;
  description: string;
  price: number;
  size: Size;
  tissue: Tissue;
  images: string[];
}
