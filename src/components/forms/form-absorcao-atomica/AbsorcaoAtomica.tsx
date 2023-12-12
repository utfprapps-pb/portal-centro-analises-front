import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface AbsorcaoAtomica extends BaseForm {
  limites: string;
  condicoes: string;
  elementos: string;
  concentracao: string;
  observacoes: string;
}

export const ABSORCAO_ATOMICA_EMPTY = {
  ...BASE_FORM_EMPTY,
  limites: "",
  condicoes: "",
  elementos: "",
  concentracao: "",
  observacoes: ""
}
