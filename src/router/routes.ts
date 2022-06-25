import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import LoginPage from "../pages/LoginPage";
import Auth from "./components/Auth";
import Unauth from "./components/Unauth";

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
  unauth: Unauth,
};

const routes: Route[] = [
  {
    path: "/",
    sidebarName: "Home",
    middleware: 'unauth',
    component: HomePage,
    options: {
      index: true,
    },
  },
  {
    path: "/list",
    sidebarName: "List",
    middleware: 'unauth',
    component: ListPage,
  },
  {
    path: "/login",
    middleware: "auth",
    component: LoginPage,
  },
];

export default routes;
