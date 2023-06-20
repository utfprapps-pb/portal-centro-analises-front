import { useHistory } from "@/hooks";
import { changePassword, getProfileData } from "@/services/api/profile";
import { Profile } from "@/services/api/profile/types";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import * as yup from "yup";

export const useProfile = () => {
  const { navigate } = useHistory()

  const [profileData, setProfileData] = useState<Profile>({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const validations = yup.object().shape({
    oldPassword: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 carácteres")
      .required("Campo obrigatório"),
    confirmPassword: yup
      .string()
      .min(6, "Mínimo de 6 carácteres")
      .required("Campo obrigatório")
      .oneOf([yup.ref("password")], "As senhas precisam ser iguais"),
  });

  const handleOnSubmit = useCallback(async (formData: Profile) => {
    try {
      const { password: newPassword, oldPassword } = formData

      await changePassword({
        newPassword,
        oldPassword
      })

      toast.success("Senha alterada com sucesso")
      navigate("/")
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      console.log('axiosError: ', axiosError);
      toast.error(axiosError.response?.data?.message ?? "Erro ao alterar senha")
    }
  }, []);

  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const profile = await getProfileData();
        setProfileData(profile);
      } catch {
        toast.error("Erro ao buscar seus dados");
      }
    };

    handleGetProfile();
  }, []);

  return {
    profileData,
    validations,
    handleOnSubmit,
  };
};
