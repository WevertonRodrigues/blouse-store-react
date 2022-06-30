import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";

import { selectCartProducts, useAppSelector } from "../../store";
import CartProductList from "../general/cart/cartProductList";

export default function CartBtn() {
  const cart = useAppSelector(selectCartProducts);

  return (
    <Tooltip
      title={<CartProductList />}
      placement="left"
      color="inherit"
      arrow
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            bgcolor: "text.primary",
            minWidth: "25vw",
            "& .MuiTextField-root": {
              "& .MuiInput-input, & .counter-input": {
                color: "white",
              },
            },
          },
        },
      }}
    >
      <Badge badgeContent={cart.length} color="secondary" showZero>
        <IconButton size="small" color="inherit">
          <ShoppingCart />
        </IconButton>
      </Badge>
    </Tooltip>
  );
}
