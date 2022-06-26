import { Link } from "react-router-dom";

const messages = {
  incorrect_password: "Credenciais do usuário estão incorretas!",
  password_is_too_short: "A senha fornecida é muito curta!",
  email_already_exists: [
    <span>Este usuário já consta na base de dados!&nbsp;</span>,
    <Link to="/login">Acesso-o aqui!</Link>,
  ],
  cannot_find_user: [
    <span>Usuário não consta na base de dados! Tente novamente ou&nbsp;</span>,
    <Link to="/signup">Registre-se aqui!</Link>,
  ],
};

export function normalizeRequestResponseMessages(key: keyof typeof messages) {
  key = key.toLowerCase().replace(/\s/gm, "_") as keyof typeof messages;
  return (
    <p style={{ textAlign: "start" }}>{messages?.[key]}</p> ||
    "Um erro ocorreu com sua solicitação!"
  );
}
