import { Button, Stack } from "@mui/material";
import {
  IField,
  OnSubmitFnType,
  useFormBuilderValidation,
} from "../../../hooks/useFormBuilderValidation";
import FormBuilder from "../builders/builder";

export interface IFormBaseProps {
  onSubmit: OnSubmitFnType;
  fields: IField[];
}

export default function FormBase({ onSubmit, fields }: IFormBaseProps) {
  const builder = useFormBuilderValidation(fields, onSubmit);

  return (
    <Stack component="form" onSubmit={builder.handleSubmit()} spacing={4}>
      <FormBuilder builder={builder} />

      <Button variant="contained" type="submit">
        Entrar
      </Button>
    </Stack>
  );
}
