import { User } from "../../../services/models";
import * as yup from "yup";
import FormBase from "./base";
import {
  IField,
  OnSubmitFnType,
} from "../../../hooks/useFormBuilderValidation";

interface ISignupProps {
  onSignup: OnSubmitFnType<User>;
}

const fields: IField[] = [
  {
    field: "name",
    label: "Nome",
    validations: ["required"],
  },
  {
    field: "email",
    label: "E-mail",
    validations: ["email", "required"],
  },
  {
    field: "password",
    label: "Senha",
    type: "password",
    validations: ["required", { rule: "min", values: 8 }],
  },
  {
    field: "passwordRepeat",
    label: "Repita a senha",
    type: "password",
    validations: [
      "required",
      {
        rule: "oneOf",
        values: [[yup.ref("password"), null], "Senhas não conferem"],
      },
    ],
  },
];

export default function SignupForm({ onSignup }: ISignupProps) {
  return <FormBase fields={fields} onSubmit={onSignup}></FormBase>;
}
