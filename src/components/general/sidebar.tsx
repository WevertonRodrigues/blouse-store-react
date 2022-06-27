import {
  Button,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import routes from "../../router/routes";
import {
  closeSidebar,
  openSidebar,
  isOpen,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { resetUser } from "../../store/user";

const style: React.CSSProperties = {
  width: "100%",
};

export default function Sidebar() {
  const { isLogged } = useAuth();
  const dispatch = useAppDispatch();
  const opened = useAppSelector(isOpen);

  if (!isLogged) {
    return <span></span>;
  }

  const onLogout = () => {
    dispatch(resetUser());
  };

  return (
    <SwipeableDrawer
      open={opened}
      onOpen={() => dispatch(openSidebar())}
      onClose={() => dispatch(closeSidebar())}
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "1em 0.5em",
        }}
      >
        <List>
          {routes
            .filter((route) => route.sidebarName)
            .map((route) => (
              <ListItem key={route.path} disablePadding>
                <Link className="no-link-style" to={route.path} style={style}>
                  <ListItemButton LinkComponent={Link} style={style}>
                    {route.sidebarName}
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
        </List>
        <Link className="no-link-style" to="/login">
          <Button sx={{ width: "100%" }} variant="contained" onClick={onLogout}>
            Sair
          </Button>
        </Link>
      </Box>
    </SwipeableDrawer>
  );
}
