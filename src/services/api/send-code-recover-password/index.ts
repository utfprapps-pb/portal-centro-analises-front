import { api } from "@/libs";

export const send = (email: string) => {
  return api.post(`/users/send-code-recover-password/email/${email}`);
}

const SendCodeRecoverPasswordService = {
  send,
}

export default SendCodeRecoverPasswordService;