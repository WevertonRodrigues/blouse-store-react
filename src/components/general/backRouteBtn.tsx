import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Tooltip } from "@mui/material";
import { To, useNavigate, useNavigationType } from "react-router-dom";

export default function BackRouteBtn({
  parentRoute,
}: {
  parentRoute?: string;
}) {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  return (
    <Tooltip arrow title="Voltar para página anterior">
      <Box display="flex">
        <Button
          variant="outlined"
          onClick={() =>
            navigate(
              (navigationType === "PUSH" ? -1 : parentRoute || "/") as To
            )
          }
        >
          <ArrowBack /> Voltar
        </Button>
      </Box>
    </Tooltip>
  );
}
