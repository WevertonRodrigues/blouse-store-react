import { Product } from "../../services";
import { productIsSelected, useAppSelector } from "../../store";
import AddProductToCartBtn from "./addProductToCartBtn";
import HoverFloating from "./hoverFloating";
import ImgProduct from "./ImgProduct";

interface ImgProductWithFloatingBtnProps {
  product: Product;
}

export default function ImgProductWithFloatingBtn({
  product,
}: ImgProductWithFloatingBtnProps) {
  const isSelected = useAppSelector((state) =>
    productIsSelected(state, product.id)
  );

  return (
    <HoverFloating
      enableFloating={!isSelected}
      floating={<AddProductToCartBtn product={product} />}
    >
      <ImgProduct width="20em" height="25em" src={product.images?.[0]} />
    </HoverFloating>
  );
}
