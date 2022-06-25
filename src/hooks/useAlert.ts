import { AlertColor } from "@mui/material";
import { useState } from "react";

export function useAlert() {
  const [alert, setAlert] = useState<{
    show: boolean;
    msg: string;
    type: AlertColor;
  }>({
    show: false,
    msg: "",
    type: "error",
  });

  const showAlert = (
    msg: string,
    options: { type: AlertColor } = { type: "error" }
  ) => {
    setAlert({
      ...alert,
      ...options,
      show: true,
      msg,
    });
  };

  const closeAlert = () => {
    setAlert({
      ...alert,
      show: false,
    });
  };

  return {
    alert,
    setAlert,
    showAlert,
    closeAlert
  };
}
