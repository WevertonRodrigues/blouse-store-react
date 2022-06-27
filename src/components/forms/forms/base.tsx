import { Button, Stack } from "@mui/material";
import {
  IField,
  OnSubmitFnType,
  useFormBuilderValidation,
} from "../../../hooks/useFormBuilderValidation";
import FormBuilder from "../builders/builder";

export interface IFormBaseProps {
  defaultValue?: any;
  onSubmit: OnSubmitFnType;
  fields: IField[];
}

export default function FormBase({
  defaultValue,
  onSubmit,
  fields,
}: IFormBaseProps) {
  const builder = useFormBuilderValidation(fields, onSubmit);
  return (
    <Stack
      component="form"
      onSubmit={builder.handleSubmit() as OnSubmitFnType}
      spacing={4}
    >
      <FormBuilder defaultValue={defaultValue} builder={builder} />

      <Button variant="contained" type="submit">
        Entrar
      </Button>
    </Stack>
  );
}
