import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import LoginPage from "../pages/LoginPage";
import Auth from "./components/Auth";
import EnsureUnauth from "./components/EnsureUnauth";

interface Route {
  path: string;
  component: (() => JSX.Element) | typeof ListPage;
  middleware?: string;
  sidebarName?: string;
  options?: {
    index: boolean;
  };
}

export const middlewares = {
  auth: Auth,
  'ensure-unauth': EnsureUnauth,
};

const routes: Route[] = [
  {
    path: "/",
    sidebarName: "Home",
    middleware: 'auth',
    component: HomePage,
    options: {
      index: true,
    },
  },
  {
    path: "/list",
    sidebarName: "List",
    middleware: 'auth',
    component: ListPage,
  },
  {
    path: "/login",
    middleware: "ensure-unauth",
    component: LoginPage,
  },
];

export default routes;
