import { api } from "@/libs";

const requestEmail = async (email: String) => {
  try {
    const response = await api.post('/emailconfirm/request_verification', { email: email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const RequestVerificationEmail = {
  requestEmail,
}

export default RequestVerificationEmail;