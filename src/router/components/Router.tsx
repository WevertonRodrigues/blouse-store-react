import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "../../App";
import routes, { middlewares } from "../routes";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {routes.map((route) => {
            const Page = route.component;

            let Middleware = null;

            if (route.middleware) {
              Middleware = (middlewares as any)[route.middleware];
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  Middleware ? <Middleware children={<Page />} /> : <Page />
                }
                {...route.options}
              ></Route>
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
