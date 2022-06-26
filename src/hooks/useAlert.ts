import { AlertColor } from "@mui/material";
import { ReactNode, useState } from "react";

export interface UseAlertState {
  show: boolean;
  content: ReactNode;
  type: AlertColor;
}

export function useAlert() {
  const [alert, setAlert] = useState<UseAlertState>({
    show: false,
    content: "",
    type: "error",
  });

  const showAlert = (
    content: ReactNode,
    options: { type: AlertColor } = { type: "error" }
  ) => {
    setAlert({
      ...alert,
      ...options,
      show: true,
      content,
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
    closeAlert,
  };
}
