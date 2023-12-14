import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface Cr extends BaseForm {
  amostra: string;
  numeroMedicao: string;
  localizacao: string;
  leitura: string;
}

export const CR_EMPTY = {
  ...BASE_FORM_EMPTY,
  amostra: "",
  numeroMedicao: "",
  localizacao: "",
  leitura: ""
}
