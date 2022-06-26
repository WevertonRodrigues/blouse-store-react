import {
  IField,
  OnSubmitFnType,
} from "../../../hooks/useFormBuilderValidation";
import { User } from "../../../services/models";
import FormBase from "./base";

export type LoginCredentials = Pick<User, "email" | "password">;

interface ILoginProps {
  onLogin: OnSubmitFnType<LoginCredentials>;
}

const fields: IField[] = [
  {
    field: "email",
    label: "E-mail",
    validations: ["email", "required"],
  },
  {
    field: "password",
    label: "Senha",
    type: "password",
    validations: ["required"],
  },
];

export default function LoginForm({ onLogin }: ILoginProps) {
  return <FormBase fields={fields} onSubmit={onLogin}></FormBase>;
}
