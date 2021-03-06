import MiddlewareBase from "./MiddlewareBase"
import { useAuth } from "../../hooks/useAuth";

export default function Unauth({ children }: { children: JSX.Element }) {
  const { isLogged } = useAuth()
  const redirect = {
    to: "/",
    condition: isLogged
  }

  return <MiddlewareBase redirect={redirect} children={children} />
}
