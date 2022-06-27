import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { IField } from "../../../hooks/useFormBuilderValidation";
import { User } from "../../../services";
import { handleMouseDownPassword } from "../../../util";

interface PasswordInputProps {
  field: IField;
  register: any;
  error: any;
}

export type UserPasswordRepeat = User & { passwordRepeat?: string };

export default function PasswordInput({
  field,
  register,
  error: errors,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const data = {
    get options(): {
      icon: typeof Visibility | typeof VisibilityOff;
      type: string;
    } {
      return showPassword
        ? { icon: VisibilityOff, type: "text" }
        : { icon: Visibility, type: "password" };
    },
    get endAdornment() {
      const Icon = data.options.icon;

      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            size="small"
            onClick={() => setShowPassword(!showPassword)}
            onMouseDown={handleMouseDownPassword}
          >
            <Icon />
          </IconButton>
        </InputAdornment>
      );
    },
  };

  return (
    <TextField
      label={field.label}
      variant="standard"
      type={data.options.type}
      error={!!errors}
      helperText={errors}
      InputProps={{
        ...register,
        endAdornment: data.endAdornment,
      }}
    />
  );
}
