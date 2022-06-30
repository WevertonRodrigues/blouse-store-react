import { tissuesStrings } from "./strings";
import { Size, Tissue } from "../services";
import { enumToObject } from "./parse";

export const sizes = enumToObject(Size);

export const tissues = enumToObject(Tissue, {
  name: (_, __, index) => tissuesStrings[index],
});
