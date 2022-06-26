import api from "../services/api";
import { AxiosResponse } from "axios";
import { User } from "../services/models";
import { useStorage } from "./useStorage";
import { normalizeRequestResponseMessages } from "../util";
import { useAppSelector } from "../store";
import { selectUser } from "../store/user";
import { LoginCredentials } from "../components/forms/forms/login";

interface JWTResponse {
  accessToken: string;
  user: User;
}

export function useAuth() {
  const user = useAppSelector(selectUser);

  return {
    user,
    get isLogged() {
      return !!user;
    },
    login: useLogin,
    signup: useSignup,
    logout: useLogout,
  };
}

async function useJwtRequest(route: string, credentials: LoginCredentials) {
  const { setItem } = useStorage();

  return await api
    .post<LoginCredentials, AxiosResponse>(route, credentials)
    .then(({ data }: AxiosResponse<JWTResponse>) => {
      setItem("blouse_shop", { token: data.accessToken });

      return Promise.resolve(data);
    })
    .catch((err) => {
      const data = err.response.data;

      return Promise.reject({
        message: normalizeRequestResponseMessages(data),
      });
    });
}

async function useSignup(credentials: User) {
  return useJwtRequest("/signup", credentials);
}

async function useLogin(credentials: LoginCredentials) {
  return useJwtRequest("/login", credentials);
}

async function useLogout() {
  /* const { navigate } = useNavigate("/login");
  navigate(); */
}
