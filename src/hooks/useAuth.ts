import { AxiosResponse } from "axios";
import { LoginCredentials } from "../components/forms/login/loginForm";
import api from "../services/api";
import { User } from "../services/models";
import { normalizeRequestResponseMessages } from "../util";
import { useStorage } from "./useStorage";

interface JWTResponse {
  accessToken: string;
  user: Pick<User, "id" | "email">;
}

let user: User | null = null


export function useAuth() {
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
    .post<LoginCredentials, AxiosResponse<JWTResponse | Error>>(
      route,
      credentials
    )
    .then(({ data }: AxiosResponse) => {
      user = data.user
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
