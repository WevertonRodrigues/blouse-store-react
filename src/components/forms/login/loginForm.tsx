import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User } from "../../../services/models";

export type LoginCredentials = Pick<User, 'email' | 'password'> 

interface ILoginProps {
    onLogin(data: LoginCredentials): Promise<void>
}

function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginForm({ onLogin }: ILoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({ resolver: yupResolver(schema) });

  
  const [showPassword, setShowPassword] = useState(false);

  const passwordData = {
    get data(): {
        icon: typeof Visibility | typeof VisibilityOff;
        type: string;
      } {
        return showPassword
          ? { icon: VisibilityOff, type: "text" }
          : { icon: Visibility, type: "password" };
      },
      get endAdornment() {
        const Icon = passwordData.data.icon;     
        
        return (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              size="small"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              onMouseDown={handleMouseDownPassword}
            >
              <Icon />
            </IconButton>
          </InputAdornment>
        );
      },
  }


  return (
    <Stack component="form" onSubmit={handleSubmit(onLogin)} spacing={4}>
      {/* Username */}
      <TextField
        label="Nome de usuário"
        variant="standard"
        error={!!errors.email?.message}
        helperText={errors.email?.message || ""}
        InputProps={{
          ...register("email"),
        }}
      />

      {/* Password */}
      <TextField
        label="Senha"
        variant="standard"
        type={passwordData.data.type}
        error={!!errors.password?.message}
        helperText={errors.password?.message || ""}
        InputProps={{
          ...register("password"),
          endAdornment: passwordData.endAdornment,
        }}
      />

      {/* Button */}
      <Button variant="contained" type="submit">
        Entrar
      </Button>
    </Stack>
  );
}
