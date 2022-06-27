import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { FormBuilder, UserPasswordRepeat } from "../components";
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
import { useEffect, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";

const fields: IField[] = [
  {
    field: "name",
    label: "Nome",
  },
  {
    field: "email",
    label: "E-mail",
    validations: ["email"],
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
    <Box sx={{ height: "100%", padding: "1em" }}>
      <Card
        variant="outlined"
        component="form"
        onSubmit={builder.onHandleSubmit(update)}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardHeader title="Atualize as informações"></CardHeader>
        <CardContent component={Stack} sx={{ height: "100%" }} spacing={2}>
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
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Salvar alterações
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
