export type SendEmailCodeRecoverPassword = {
  message: string;
  email: string;
}

export type RecoverPasswordDTO = {
  email: string;
  code: string;
  newPassword: string;
}