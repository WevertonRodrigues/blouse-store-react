import { useNavigate } from "../hooks/useNavigate";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store";
import { setUser } from "../store/user";
import { useAlert } from "../hooks/useAlert";
import { User } from "../services/models";
import { RegisterContainer, SignupForm } from "../components";
import { OnSubmitFnType } from "../hooks/useFormBuilderValidation";

export default function SignupPage() {
  const { signup: onSignup } = useAuth();
  const { alert, showAlert, closeAlert } = useAlert();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigate();

  const signup = (async (credentials: User & { passwordRepeat?: string }) => {
    delete credentials.passwordRepeat;

    await onSignup(credentials)
      .then(({ user }) => {
        dispatch(setUser(user));
        navigate();
      })
      .catch(({ message: content }: Error) => {
        showAlert(content, { type: "error" });
      });
  }) as any as OnSubmitFnType<User>;

  return (
    <RegisterContainer
      title="Registre-se"
      alert={{ ...alert, close: closeAlert }}
      link={{ to: "/login", content: "Possui conta?" }}
    >
      <SignupForm onSignup={signup} />
    </RegisterContainer>
  );
}
