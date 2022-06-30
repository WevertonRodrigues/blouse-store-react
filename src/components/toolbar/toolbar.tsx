import { AppBar, IconButton, Typography } from "@mui/material";
import ToolbarMui from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  closeSidebar,
  openSidebar,
  isOpen,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { useAuth } from "../../hooks";
import ThemeSwitcher from "./themeSwitcher";
import CartBtn from "./cartBtn";

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const sidebarOpened = useAppSelector(isOpen);
  const { isLogged } = useAuth();

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

        {/* Actions */}
        {/* Cart controller */}
        <CartBtn />

        {/* Theme switcher */}
        <ThemeSwitcher />
      </ToolbarMui>
    </AppBar>
  );
}
