import { Button, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import routes from "../../router/routes";
import { useAppDispatch } from "../../store";
import { resetUser } from "../../store/user";

const style: React.CSSProperties = {
  width: "100%",
};

export default function Sidebar() {
  const { isLogged } = useAuth();
  const dispatch = useAppDispatch();

  if (!isLogged) {
    return <span></span>;
  }

  const onLogout = () => {
    dispatch(resetUser());
  };

  return (
    <Drawer variant="permanent" anchor="left">
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
              <ListItem key={route.path}>
                <Link to={route.path} style={style}>
                  <ListItemButton>{route.sidebarName}</ListItemButton>
                </Link>
              </ListItem>
            ))}
        </List>
        <Button variant="contained" onClick={onLogout}>
          <Link to="/login">Sair</Link>
        </Button>
      </Box>
    </Drawer>
  );
}
