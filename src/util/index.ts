const messages = {
    'incorrect_password': 'Credenciais do usuário estão incorretas!',
    'password_is_too_short': 'A senha fornecida é muito curta!'
}

export function normalizeRequestResponseMessages(key: keyof typeof messages){
    key = key.toLowerCase().replace(/\s/gm, '_') as keyof typeof messages
    return messages?.[key] || 'Um erro ocorreu com sua solicitação!'
}