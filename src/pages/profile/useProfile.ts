import { getProfileData } from "@/services/api/profile";
import { Profile } from "@/services/api/profile/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import * as yup from "yup";

export const useProfile = () => {
  const [profileData, setProfileData] = useState<Profile>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validations = yup.object().shape({
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

  const handleOnSubmit = useCallback((formData: Profile) => {
    console.log(formData);
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
