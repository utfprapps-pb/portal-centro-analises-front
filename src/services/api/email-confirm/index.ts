import { api } from "@/libs";

const checkHash = (hashKey: String) => {
  return api.get(`/emailconfirm/code/${hashKey}`);
}

const EmailConfirmService = {
  checkHash,
}
export default EmailConfirmService;