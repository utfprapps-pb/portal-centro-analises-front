import { api } from "@/libs";
import { ChangePassword } from "./types";

export const getProfileData = async () => {
  const { data } = await api.get("/users/findSelfUser");

  return data;
};

export const changePassword: ChangePassword = async ({
  newPassword,
  oldPassword
}) => {
  const payload = {
    newPassword,
    oldPassword
  }

  await api.post("/users/change-password", payload)
}