export interface BaseForm {
  nomeAluno: string;
  nomeOrientador: string;
  projeto: number;
  descricao: string;
  natureza: string;
  otherProjectNature: string;
}

export const BASE_FORM_EMPTY = {
  nomeAluno: "",
  nomeOrientador: "",
  projeto: 1,
  descricao: "",
  natureza: "",
  otherProjectNature: ""
}
