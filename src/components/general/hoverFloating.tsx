import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";

interface HoverFloatingProps {
  children: ReactNode;
  floating: ReactNode;
}
export default function HoverFloating({
  children,
  floating,
}: HoverFloatingProps) {
  return (
    <Box className="hoverable" width="fit-content" height="fit-content">
      <Stack position="relative" width="fit-content">
        {children}
        <Box
          className="hoverable"
          position="absolute"
          top="5%"
          left="80%"
          width="fit-content"
        >
          {floating}
        </Box>
      </Stack>
    </Box>
  );
}
