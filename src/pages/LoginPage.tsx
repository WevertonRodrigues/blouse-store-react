import { Alert, Card, CardContent, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm, {
  LoginCredentials,
} from "../components/forms/login/loginForm";
import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store";
import { setUser } from "../store/user";

export default function LoginPage() {
  const style: Record<"container" | "stack" | "card", React.CSSProperties> = {
    container: { height: "100%" },
    stack: {
      height: "100%",
    },
    card: {
      maxHeight: "25em",
      width: "25em",
    },
  };

  const { login: onLogin } = useAuth();
  const { alert, showAlert, closeAlert } = useAlert();
  let navigate = useNavigate();
  let location = useLocation();
  const dispatch = useAppDispatch()

  const login = async (credentials: LoginCredentials) => {
    await onLogin(credentials)
      .then(({user}) => {
        dispatch(setUser(user))

        let from = (location.state as any)?.from?.pathname || "/";

        navigate(from, { replace: true })
      })
      .catch(({ message: msg }: Error) => showAlert(msg, { type: "error" }));
  };

  return (
    <Container className="LoginPage" style={style.container}>
      <Stack justifyContent="center" alignItems="center" style={style.stack}>
        <Card style={style.card}>
          <CardContent component={Stack} spacing={2}>
            <LoginForm onLogin={login} />

            {alert.show && (
              <Alert severity={alert.type} onClose={closeAlert}>
                {alert.msg}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
