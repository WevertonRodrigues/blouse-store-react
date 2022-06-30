import { Product } from "../../services";
import AddProductToCartBtn from "./addProductToCartBtn";
import HoverFloating from "./hoverFloating";
import ImgProduct from "./ImgProduct";

interface ImgProductWithFloatingBtnProps {
  product: Product;
}

export default function ImgProductWithFloatingBtn({
  product,
}: ImgProductWithFloatingBtnProps) {
  return (
    <HoverFloating floating={<AddProductToCartBtn product={product} />}>
      <ImgProduct width="20em" height="25em" src={product.images?.[0]} />
    </HoverFloating>
  );
}
