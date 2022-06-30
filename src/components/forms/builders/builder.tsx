import { Stack, TextField } from "@mui/material";
import { UseFormBuilderReturn } from "../../../hooks/useFormBuilderValidation";
import PasswordInput from "../fields/passwordInput";

export interface IFormBuilderProps {
  defaultValue?: any;
  builder: UseFormBuilderReturn;
}

export default function FormBuilder({
  defaultValue = {},
  builder: { fields, errors, register },
}: IFormBuilderProps) {
  return (
    <Stack spacing={4}>
      {fields.map((field) => {
        const message: any = errors?.[field.field]?.message || "";

        if (field.type === "password") {
          return (
            <PasswordInput
              key={field.field}
              register={register(field.field)}
              field={field}
              error={message}
            />
          );
        }

        return (
          <TextField
            key={field.field}
            label={field.label}
            variant="standard"
            defaultValue={defaultValue?.[field.field] ?? undefined}
            error={!!message}
            helperText={message}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              ...register(field.field),
            }}
          />
        );
      })}
    </Stack>
  );
}
