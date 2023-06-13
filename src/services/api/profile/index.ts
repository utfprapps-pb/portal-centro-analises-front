import { api } from "@/libs";

export const getProfileData = async () => {
  const { data } = await api.get("/users/findSelfUser");

  return data;
};
