import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import LoginPage from "../pages/LoginPage";
import SettingsPage from "../pages/SettingsPage";
import SignupPage from "../pages/SignupPage";
import Auth from "./components/Auth";
import EnsureUnauth from "./components/EnsureUnauth";

export const middlewares = {
  auth: Auth,
  "ensure-unauth": EnsureUnauth,
};

interface Route {
  path: string;
  component: (() => JSX.Element) | typeof ListPage;
  middleware?: keyof typeof middlewares;
  sidebarName?: string;
  options?: {
    index: boolean;
  };
}

const routes: Route[] = [
  {
    path: "/",
    sidebarName: "Home",
    middleware: "auth",
    component: HomePage,
    options: {
      index: true,
    },
  },
  {
    path: "/list",
    sidebarName: "Lista",
    middleware: "auth",
    component: ListPage,
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

export default routes;
