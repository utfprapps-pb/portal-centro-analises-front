import { api } from "@/libs";
import { RecoverPasswordDTO } from "@/services/api/user/types";

class UserService {

  private static BASE_URL = '/users';

  public sendEmailCodeRecoverPassword = (email: string) => {
    return api.post(`${UserService.BASE_URL}/send-code-recover-password/email/${email}`);
  }

  public recoverPassword = (recoverPasswordDTO: RecoverPasswordDTO) => {
    return api.post(`${UserService.BASE_URL}/recover-password`, recoverPasswordDTO);
  }

}

export default new UserService();