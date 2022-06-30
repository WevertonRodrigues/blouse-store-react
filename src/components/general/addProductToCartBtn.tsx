import { AddShoppingCart, Check } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Product } from "../../services";
import {
  addToCart,
  productIsSelected,
  useAppDispatch,
  useAppSelector,
} from "../../store";

interface AddProductToCartBtnProps {
  product: Product;
  style?: React.CSSProperties;
  tooltipPlacement?: string;
}

export default function AddProductToCartBtn({
  product,
  style,
  tooltipPlacement = "top",
}: AddProductToCartBtnProps) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    productIsSelected(state, product.id)
  );

  const data: {
    title: string;
    icon: typeof Check | typeof AddShoppingCart;
    color: "primary" | "success";
    click: (event: any) => any;
    style?: React.CSSProperties;
  } = isSelected
    ? {
        title: "Produto já adicionado ao carrinho!",
        icon: Check,
        color: "success",
        click: (event: MouseEvent) => event.preventDefault(),
        style: {
          cursor: "not-allowed",
        },
      }
    : {
        title: "Adicione este produto ao carrinho",
        icon: AddShoppingCart,
        color: "primary",
        click: (event: MouseEvent) => {
          event.preventDefault();
          dispatch(addToCart({ ...product, quantity: 1 }));
        },
      };

  return (
    <Tooltip
      title={<Typography children={data.title} />}
      arrow
      placement={tooltipPlacement as any}
    >
      <IconButton
        aria-label="cart"
        color={data.color}
        size="large"
        sx={{
          outline: "1px solid",
          ...data.style,
          ...style,
        }}
        onClick={data.click}
      >
        <data.icon />
      </IconButton>
    </Tooltip>
  );
}
