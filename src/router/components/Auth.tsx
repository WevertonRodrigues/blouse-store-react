import { useAuth } from "../../hooks/useAuth";
import MiddlewareBase from "./MiddlewareBase";

export default function Auth({ children }: { children: JSX.Element }) {
  const { isLogged } = useAuth();

  const redirect = {
    to: "/login",
    condition: !isLogged,
  };

  return <MiddlewareBase redirect={redirect} children={children} />;
}
