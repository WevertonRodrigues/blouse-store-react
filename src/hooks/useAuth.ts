import api from "../services/api";
import { AxiosResponse } from "axios";
import { User } from "../services/models";
import { useStorage } from "./useStorage";
import { normalizeRequestResponseMessages } from "../util";
import { LoginCredentials } from "../components/forms/login/loginForm";
import { useAppSelector } from "../store";
import { selectUser } from "../store/user";

interface JWTResponse {
  accessToken: string;
  user: User;
}

export function useAuth() {
  const user = useAppSelector(selectUser)


  return {
    user,
    get isLogged(){
      return !!user
    },
    login: useFetchLogin,
    signup: useFetchSignup,
  };
}

async function useJwtRequest(route: string, credentials: LoginCredentials) {
  const { setItems } = useStorage();

  return await api
    .post<LoginCredentials, AxiosResponse>(
      route,
      credentials
    )
    .then(({ data }: AxiosResponse<JWTResponse>) => {
      setItems({ blouse_shop: {token: data.accessToken} });

      return data;
    })
    .catch((err) => {
      const data = err.response.data;

      return Promise.reject(Error(normalizeRequestResponseMessages(data)))
    });
}

async function useFetchSignup(credentials: LoginCredentials) {
  return useJwtRequest("/signup", credentials);
}

async function useFetchLogin(credentials: LoginCredentials) {
  return useJwtRequest("/login", credentials);
}
