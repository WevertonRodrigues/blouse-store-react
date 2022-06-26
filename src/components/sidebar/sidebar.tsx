import { Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import routes from "../../router/routes";

export default function Sidebar() {
  const { isLogged } = useAuth()

  if(!isLogged){
    return <span></span>
  }
  
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {routes.filter(route => route.sidebarName).map((route) => (
          <ListItem key={route.path}>
            <ListItemButton>
            <Link to={route.path}>{route.sidebarName}</Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
