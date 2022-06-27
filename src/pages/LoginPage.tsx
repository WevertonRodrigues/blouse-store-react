import { useNavigate } from "../hooks/useNavigate";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store";
import { setUser } from "../store/user";
import { useAlert } from "../hooks/useAlert";
import { LoginForm, RegisterContainer } from "../components";
import { LoginCredentials } from "../components/forms/forms/login";
import { OnSubmitFnType } from "../hooks/useFormBuilderValidation";

export default function LoginPage() {
  const { login: onLogin } = useAuth();
  const { alert, showAlert, closeAlert } = useAlert();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigate();

  const login = (async (credentials: LoginCredentials) => {
    await onLogin(credentials)
      .then(({ user }) => {
        dispatch(setUser(user));
        navigate();
      })
      .catch(({ message: content }: Error) => {
        showAlert(content, { type: "error" });
      });
  }) as unknown as OnSubmitFnType<LoginCredentials>;

  return (
    <RegisterContainer
      title="Entrar"
      alert={{ ...alert, close: closeAlert }}
      link={{ to: "/signup", content: "Não possui conta?" }}
    >
      <LoginForm onLogin={login} />
    </RegisterContainer>
  );
}
