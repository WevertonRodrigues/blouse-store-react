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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Loja
        </Typography>
      </ToolbarMui>
    </AppBar>
  );
}
