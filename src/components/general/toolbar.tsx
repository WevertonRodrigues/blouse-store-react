import { AppBar, Badge, IconButton, Typography } from "@mui/material";
import ToolbarMui from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  closeSidebar,
  openSidebar,
  isOpen,
  useAppDispatch,
  useAppSelector,
  selectCartProducts,
} from "../../store";
import { useAuth } from "../../hooks";
import { ShoppingCart } from "@mui/icons-material";

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const sidebarOpened = useAppSelector(isOpen);
  const { isLogged } = useAuth();
  const cart = useAppSelector(selectCartProducts);

  if (!isLogged) {
    return <span></span>;
  }

  const handleClick = sidebarOpened ? closeSidebar : openSidebar;

  return (
    <AppBar position="fixed">
      <ToolbarMui>
        {/* Menu btn */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => dispatch(handleClick())}
        >
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Loja de Blusas
        </Typography>

        {/* Cart btn */}
        <Badge badgeContent={cart.length} color="secondary" showZero>
          <IconButton size="small" color="secondary">
            <ShoppingCart />
          </IconButton>
        </Badge>
      </ToolbarMui>
    </AppBar>
  );
}
