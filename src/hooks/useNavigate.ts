import {
  useLocation,
  useNavigate as useNavigateReactRouterDOM,
} from "react-router-dom";

export function useNavigate(to?: string) {
  let navigate = useNavigateReactRouterDOM();
  let location = useLocation();

  const path = to || (location.state as any)?.from?.pathname || "/";

  const navigateTo = () => navigate(path, { replace: true });

  return {
    navigate: navigateTo,
  };
}
