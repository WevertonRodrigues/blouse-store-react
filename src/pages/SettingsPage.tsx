import { Card, CardContent, CardHeader, Container } from "@mui/material";
import { Box } from "@mui/system";

export default function SettingsPage() {
  return (
    <Container className="page-container">
      <Box>
        <Card>
          <CardHeader>Atualize as informações</CardHeader>
          <CardContent>Conteúdo</CardContent>
        </Card>
      </Box>
    </Container>
  );
}
