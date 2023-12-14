import { api } from "@/libs";
import toast from "react-hot-toast";

export const sendSolicitationForm = async (payload: any, solicitation, id) => {
  try {
    if (id) {
      payload = {
        ...payload,
        id,
        createdBy: solicitation.createdBy,
        status: solicitation.status,
      }
      await api.put('/solicitation', payload);
    } else {
      await api.post('/solicitation', payload);
    }

    toast.success('Solicitação efetuada com sucesso!');
  } catch (error) {
    toast.error('Erro ao realizar solicitação');
    console.error("error", error);
  }
}

const convertJsonFieldsToObject = (solicitation) => {
  if (solicitation.fields) {
    return JSON.parse(solicitation.fields);
  }

  return undefined;
}

export const loadFormBySolicitation = (solicitation): any => {
  if (!solicitation) {
    return {};
  }
  const fields = convertJsonFieldsToObject(solicitation);
  if (!fields) {
    return {};
  }

  return {
    nomeAluno: solicitation.createdBy?.name,
    nomeOrientador: solicitation.project?.teacher?.name,
    projeto: solicitation.project?.id,
    descricao: solicitation.description,
    natureza: solicitation.projectNature,
    otherProjectNature: solicitation.otherProjectNature,
    ...fields,
  };
}
