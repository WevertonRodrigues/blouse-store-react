import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import BackRouteBtn from "./backRouteBtn";

export interface IAction<C = any> {
  text: string;
  icon?: string;
  click?: (ctx: C) => void;
  type?: undefined | "submit";
}

interface IPageContainerProps {
  title?: string;
  children: ReactNode;
  onSubmit?: any;
  actions?: IAction[];
  backRoute?: boolean;
  loading?: boolean;
}

export default function PageContainer({
  title,
  actions,
  onSubmit,
  children,
  loading,
}: IPageContainerProps) {
  const options = onSubmit
    ? {
        component: "form",
        onSubmit,
      }
    : {};

  const location = useLocation();

  return (
    <Box sx={{ overflow: "hidden", height: "100%", padding: "1em" }}>
      <Card
        variant="outlined"
        {...options}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        {/* header - back route btn, title */}
        {(location.pathname !== "/" || title) && (
          <CardHeader
            title={
              <Stack direction="row">
                {location.pathname !== "/" && (
                  <BackRouteBtn
                    parentRoute={
                      location.pathname !== "/list" ? "/list" : undefined
                    }
                  />
                )}
                <Box flex={1}>{title}</Box>
              </Stack>
            }
          ></CardHeader>
        )}

        {/* content */}
        <CardContent
          component={Stack}
          overflow="auto"
          height="100%"
          spacing={2}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            children
          )}
        </CardContent>

        {/* actions */}
        {actions?.length && (
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="contained"
                type={action.type}
                onClick={action.click ?? (() => null)}
              >
                {action.text}
              </Button>
            ))}
          </CardActions>
        )}
      </Card>
    </Box>
  );
}
