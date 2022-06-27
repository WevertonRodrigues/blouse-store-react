import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormResetField,
} from "react-hook-form";
import * as yup from "yup";

export interface ValidationRule {
  rule: string;
  values: any;
}

export type Validation = ValidationRule | string;

export interface IFormBaseProps<T = any> {
  onSubmit(data: T): Promise<void>;
  fields: IField[];
}

export interface IField {
  label: string;
  field: string;
  type?: "text" | "password" | undefined;
  validations?: Validation[];
}

function composeValidation(yup: any, validations: Validation[]): any {
  if (!validations.length) {
    return yup;
  }

  const validationTarget: Validation = validations.shift()!;

  const validation: Validation =
    typeof validationTarget === "object"
      ? validationTarget
      : {
          rule: validationTarget,
          values: undefined,
        };

  if (!validation.values) {
    return composeValidation(yup[validation.rule](), validations);
  }

  const values = [].concat(validation.values);

  return composeValidation(yup[validation.rule](...values), validations);
}

export function composeSchema(fields: IField[]) {
  const composeSchema = fields.reduce((acc, field) => {
    const key = field.field;
    const type =
      !field.type || field.type === "password" ? "string" : field.type;

    const validations = ([] as Validation[]).concat(
      type,
      field.validations ?? []
    );

    acc = {
      ...acc,
      [key]: composeValidation(yup, validations),
    };

    return acc;
  }, {});

  return yup.object(composeSchema).required();
}

export type OnSubmitFnType<T = any> = () => SubmitHandler<T>;

export interface UseFormBuilderReturn<D = any, T = any> {
  register: UseFormRegister<T>;
  fields: IField[];
  errors: FieldErrors<T>;
  handleSubmit: () => SubmitHandler<D>;
  onHandleSubmit: UseFormHandleSubmit<T>;
  resetField: UseFormResetField<T>;
}

export function useFormBuilderValidation<D = any, T = any>(
  fields: IField[],
  onSubmit?: () => SubmitHandler<D>
) {
  const schema = composeSchema(fields);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<T>({ resolver: yupResolver(schema) });

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit ?? (() => null)),
    onHandleSubmit: handleSubmit,
    errors,
    fields,
    resetField,
  } as unknown as UseFormBuilderReturn<D, T>;
}
