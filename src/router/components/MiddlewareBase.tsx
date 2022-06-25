import { Navigate, useLocation } from "react-router-dom";

export default function MiddlewareBase({
  children,
  redirect
}: {
  redirect: {
    to: string,
    condition: boolean
  };
  children: JSX.Element;
}) {
  let location = useLocation();

  if (redirect.condition) {
    return <Navigate to={redirect.to} state={{ from: location }} replace />;
  }

  return children;
}
