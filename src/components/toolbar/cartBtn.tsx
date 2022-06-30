import styled from "@emotion/styled";
import { ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  IconButton,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";

import { selectCartProducts, useAppSelector } from "../../store";
import CartProductList from "../general/cart/cartProductList";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    minWidth: "25vw",
  },
});

export default function CartBtn() {
  const cart = useAppSelector(selectCartProducts);

  return (
    <CustomWidthTooltip
      title={<CartProductList />}
      placement="left"
      color="inherit"
      arrow
    >
      <Badge badgeContent={cart.length} color="secondary" showZero>
        <IconButton size="small" color="inherit">
          <ShoppingCart />
        </IconButton>
      </Badge>
    </CustomWidthTooltip>
  );
}
