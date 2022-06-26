import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { UseAlertState } from "../hooks/useAlert";

interface LinkContext {
  to: string;
  content: string;
}

interface RegisterContainerProps {
  link: LinkContext;
  alert: UseAlertState & { close: () => void };
  children: ReactNode;
  title: string;
}

const style: Record<"container" | "stack" | "card", React.CSSProperties> = {
  container: { height: "100%" },
  stack: {
    height: "100%",
  },
  card: {
    maxHeight: "max-content",
    width: "30vw",
  },
};

export default function RegisterContainer({
  title,
  link,
  alert,
  children,
}: RegisterContainerProps) {
  return (
    <Container className="RegisterContainer" style={style.container}>
      <Stack justifyContent="center" alignItems="center" style={style.stack}>
        <Card style={style.card}>
          <CardHeader title={title}></CardHeader>
          <CardContent component={Stack} spacing={2}>
            {children}
            <Collapse in={alert.show}>
              <Alert
                sx={{ alignItems: "center" }}
                severity={alert.type}
                onClose={alert.close}
              >
                {alert.content}
              </Alert>
            </Collapse>
            <Link to={link.to}>{link.content}</Link>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
