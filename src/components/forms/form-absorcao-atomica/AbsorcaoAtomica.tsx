import { BaseForm } from "@/components/forms/BaseForm";

export interface AbsorcaoAtomica extends BaseForm {
  limites: string;
  condicoes: string;
  elementos: string;
  concentracao: string;
  observacoes: string;
}

export const ABSORCAO_ATOMICA_EMPTY = {
  nomeAluno: "",
  nomeOrientador: "",
  projeto: 1,
  descricao: "",
  natureza: "",
  otherProjectNature: "",
  limites: "",
  condicoes: "",
  elementos: "",
  concentracao: "",
  observacoes: ""
}
