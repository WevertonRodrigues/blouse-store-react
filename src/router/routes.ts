import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";

const routes = [
  {
    path: "/",
    sidebarName: "Home",
    component: HomePage,
    options: {
      index: true,
    },
  },
  {
    path: "/list",
    sidebarName: "List",
    component: ListPage,
  },
];

export default routes;
