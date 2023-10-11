import { useHistory } from "@/hooks";
import ProfessorService from "@/services/api/professor/ProfessorService";
import {
  ProfessorParams,
  StudentProfessorParams,
} from "@/services/api/professor/professor.type";
import {
  changePassword,
  getProfileData,
} from "@/services/api/profile";
import { Profile } from "@/services/api/profile/types";
import { StudentsParams } from "@/services/api/students/student.type";
import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/contexts";

import * as yup from "yup";
import StudentProfessorLinkService from "@/services/api/studentProfessorLink/StudentProfessorLinkService";
import { ROLES } from "@/commons/roles";

export const useProfile = () => {
  "use strict";
  const { navigate } = useHistory();
  const { authenticatedUser } = useContext(AuthContext);

  const [profileData, setProfileData] = useState<Profile>({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [professors, setProfessors] = useState<ProfessorParams[]>([]);
  const [professorSelected, setProfessorSelected] = useState<ProfessorParams>();
  const [studentTeacherLink, setStudentTeacherLink] =
    useState<StudentProfessorParams>();

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

  const handleOnSubmitProfessorLink = async () => {
    const student: StudentsParams = {
      id: authenticatedUser?.id!,
      email: "",
      name: "",
      ra: "",
    };

    if (professorSelected != null) {
      const studentProfessor: StudentProfessorParams = {
        id: studentTeacherLink?.id ?? undefined,
        teacher: professorSelected,
        student: student,
      };

      try {
        const response = await StudentProfessorLinkService.saveLink(
          studentProfessor
        );

        if (response.data) {
          setProfessorSelected(response.data);
        }

        toast.success("Sucesso ao solicitar vínculo ao professor");
      } catch (error) {
        toast.error("Falha ao solicitar vínculo ao professor");
        console.log(error);
      }

      loadStudentProfessorLink

    } else {
      toast.error("Nenhum professor identificado");
    }
  };

  const handleOnSubmit = useCallback(async (formData: Profile) => {
    try {
      const { password: newPassword, oldPassword } = formData;

      await changePassword({
        newPassword,
        oldPassword,
      });

      toast.success("Senha alterada com sucesso");
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log("axiosError: ", axiosError);
      toast.error(
        axiosError.response?.data?.message ?? "Erro ao alterar senha"
      );
    }
  }, []);

  const excludeProfessorLink = async () => {
    if (studentTeacherLink != null) {
      try {
        const response = await StudentProfessorLinkService.deleteLink(
          studentTeacherLink.id!
        );

        if (response.data) {
          setProfessorSelected(undefined);
          setStudentTeacherLink(undefined);
        }
        toast.success("Vinculo removido");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loadStudentProfessorLink = async () => {
    const student: StudentsParams = {
      id: authenticatedUser?.id!,
      email: "",
      name: "",
      ra: "",
    };

    try {
      const response = await StudentProfessorLinkService.findByProfessorLink(
        student
      );

      if (response.data.length > 0) {
        setProfessorSelected(response.data[0].teacher);
        setStudentTeacherLink(response.data[0]);
      }
    } catch (error) {
      toast.error("Falha ao carregar professor vinculado");
      console.log(error);
    }
  };

  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const profile = await getProfileData();
        setProfileData(profile);
      } catch {
        toast.error("Erro ao buscar seus dados");
      }
    };

    const loadProfessors = async () => {
      try {
        const response = await ProfessorService.findAll();

        if (response.data) {
          setProfessors(response.data);
        }
      } catch (error) {
        toast.error("Falha ao carregar lista de professores");
        console.log(error);
      }
    };

    if (authenticatedUser?.role == ROLES.Student) {
      loadStudentProfessorLink();
      loadProfessors();
    }
    handleGetProfile();
  }, []);

  return {
    profileData,
    validations,
    handleOnSubmit,
    professors,
    professorSelected,
    setProfessorSelected,
    handleOnSubmitProfessorLink,
    excludeProfessorLink,
  };
};
