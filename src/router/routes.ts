import HomePage from "../pages/HomePage";
import { ListPage, ListId } from "../pages/ListPage";
import LoginPage from "../pages/LoginPage";
import SettingsPage from "../pages/SettingsPage";
import SignupPage from "../pages/SignupPage";
import Auth from "./components/Auth";
import EnsureUnauth from "./components/EnsureUnauth";

export const middlewares = {
  auth: Auth,
  "ensure-unauth": EnsureUnauth,
};

export interface SourceRoute {
  path?: string;
  component?: () => JSX.Element;
  middleware?: keyof typeof middlewares;
  sidebarName?: string;
  children?: SourceRoute[];
  index?: boolean;
}

const routes: SourceRoute[] = [
  {
    path: "/",
    sidebarName: "Home",
    middleware: "auth",
    component: HomePage,
    index: true,
  },
  {
    path: "/list",
    sidebarName: "Lista",
    children: [
      {
        component: ListPage,
        middleware: "auth",
        index: true,
      },
      {
        path: ":id",
        component: ListId,
        middleware: "auth",
      },
    ],
  },
  {
    path: "/settings",
    sidebarName: "Configurações",
    middleware: "auth",
    component: SettingsPage,
  },
  {
    path: "/login",
    middleware: "ensure-unauth",
    component: LoginPage,
  },
  {
    path: "/signup",
    middleware: "ensure-unauth",
    component: SignupPage,
  },
];

export const sidebar = routes.filter((route) => route.sidebarName);

export default routes;
