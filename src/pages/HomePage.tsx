import { Stack } from "@mui/material";
import { PageContainer } from "../components";
import { useAppSelector } from "../store";
import { selectUser } from "../store/user";

export default function HomePage() {
  const user = useAppSelector(selectUser);

  return (
    <PageContainer>
      <Stack alignItems="center" justifyContent="center" height="100%">
        <h3>Seja bem vindo(a), {<span>{user?.name}</span>}!</h3>
      </Stack>
    </PageContainer>
  );
}
