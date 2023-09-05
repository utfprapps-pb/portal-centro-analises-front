import { api } from "@/libs";
import { ConfigEmail } from "@/services/api/config-email/types";

class ConfigEmailService {

  private static BASE_URL = '/email/config';

  public find = () => {
    return api.get(`${ConfigEmailService.BASE_URL}`);
  }

  public save = (configEmail: ConfigEmail) => {
    return api.put(`${ConfigEmailService.BASE_URL}`, configEmail);
  }

}

export default new ConfigEmailService();