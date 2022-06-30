import { Delete } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useNumeral from "../../../hooks/useNumeral";
import { ProductCart } from "../../../services";
import {
  removeFromCart,
  selectCartProducts,
  setProductQuantity,
  totalCart,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import Counter from "../counter";
import ImgProduct from "../ImgProduct";

function CartEmpty() {
  return (
    <Typography textAlign="center">Não há produtos no carrinho</Typography>
  );
}

function Total({ label, number }: { label: string; number: number }) {
  const { currency } = useNumeral();

  return (
    <TextField
      label={label}
      variant="standard"
      sx={{
        flex: "1",
      }}
      value={currency(number)}
      InputProps={{
        readOnly: true,
      }}
    ></TextField>
  );
}

function ListItemProuctQuantityControl({ product }: { product: ProductCart }) {
  const dispatch = useAppDispatch();

  return (
    <Counter
      preventNegative
      label="Quantidade"
      counter={product.quantity}
      TextFieldProps={{
        color: "primary",
        focused: true,
      }}
      onSetCounter={(quantity: number) => {
        if (quantity > 0)
          dispatch(
            setProductQuantity({
              product,
              quantity,
            })
          );
        else dispatch(removeFromCart(product.id));
      }}
    />
  );
}

const PrimaryTextListItem = ({ product }: { product: ProductCart }) => (
  <Stack mb={1} spacing="4px">
    <Typography variant="body1">{product.name}</Typography>
    <ListItemProuctQuantityControl product={product} />
  </Stack>
);

function CartProductListItem({ product }: { product: ProductCart }) {
  const dispatch = useAppDispatch();
  const subTotal = product.price * product.quantity;

  return (
    <ListItem
      alignItems="flex-start"
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => dispatch(removeFromCart(product.id))}
        >
          <Delete color="primary" />
        </IconButton>
      }
    >
      <ListItemAvatar sx={{ mr: 2 }}>
        <ImgProduct src={product.images?.[0]} />
      </ListItemAvatar>

      <ListItemText
        primary={<PrimaryTextListItem product={product} />}
        secondary={<Total label="Sub-total" number={subTotal} />}
        disableTypography
      />
    </ListItem>
  );
}

export default function CartProductList() {
  const cart = useAppSelector(selectCartProducts);
  const total = useAppSelector(totalCart);

  return cart.length ? (
    <List>
      {/* items */}
      <Stack
        direction="column"
        maxHeight="70vh"
        minWidth="100%"
        sx={{
          overflowY: "auto",
        }}
      >
        {cart.map((product) => (
          <CartProductListItem key={product.id} product={product} />
        ))}
      </Stack>

      {/* total */}
      <Stack direction="row" mt={1} px={2}>
        <Total label="Total" number={total} />
      </Stack>
    </List>
  ) : (
    <CartEmpty />
  );
}
