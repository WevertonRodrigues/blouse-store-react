import { Alert, Collapse } from "@mui/material";
import { FormBuilder, PageContainer, UserPasswordRepeat } from "../components";
import {
  IField,
  useAlert,
  useAuth,
  useFormBuilderValidation,
  useObjectDiff,
} from "../hooks";
import { User } from "../services/models";
import { selectUser, setUser, useAppDispatch, useAppSelector } from "../store";
import * as yup from "yup";
import { IAction } from "../components/general/pageContainer";

const fields: IField[] = [
  {
    field: "name",
    label: "Nome",
    validations: ["required"],
  },
  {
    field: "email",
    label: "E-mail",
    validations: ["required", "email"],
  },
  {
    field: "password",
    label: "Nova senha",
    type: "password",
    validations: [
      {
        rule: "matches",
        values: [/^(|.{8,})$/, "Senha deve conter pelo menos 8 caracteres"],
      },
    ],
  },
  {
    field: "passwordRepeat",
    label: "Repita a senha",
    type: "password",
    validations: [
      {
        rule: "oneOf",
        values: [[yup.ref("password"), null], "Senhas não conferem"],
      },
    ],
  },
];

const actions: IAction[] = [
  {
    text: "Salvar alterações",
    type: "submit",
  },
];

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { alert, showAlert, closeAlert } = useAlert();
  const { updateProfile } = useAuth();
  const user = useAppSelector(selectUser) as User;
  const { objectDiff } = useObjectDiff();

  const builder = useFormBuilderValidation(fields);

  const update = async (data: User) => {
    const { diff } = objectDiff<UserPasswordRepeat, UserPasswordRepeat>(
      user,
      data
    );

    if (!diff.password) {
      delete diff.password;
      delete diff.passwordRepeat;
    }

    await updateProfile({ ...diff, id: user.id } as User).then((res) => {
      if (diff.password) {
        ["password", "passwordRepeat"].forEach((key) =>
          builder.resetField(key, { keepDirty: false })
        );
      }

      showAlert("Suas alterações foram salvas!", {
        type: "success",
      });
      dispatch(setUser(res));
    });
  };

  return (
    <PageContainer
      onSubmit={builder.onHandleSubmit(update)}
      title="Atualize as informações"
      actions={actions}
    >
      <Collapse in={alert.show}>
        <Alert
          sx={{ alignItems: "center" }}
          severity={alert.type}
          onClose={closeAlert}
        >
          {alert.content}
        </Alert>
      </Collapse>

      <FormBuilder builder={builder} defaultValue={user} />
    </PageContainer>
  );
}
