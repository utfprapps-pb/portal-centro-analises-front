import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface Nir extends BaseForm {
  onda: string;
  resolucao: string;
  acumulacao: string;
  parametro: string;
  amostra: string;
  solvente: string;
}

export const NIR_EMPTY = {
  ...BASE_FORM_EMPTY,
  onda: "",
  resolucao: "",
  acumulacao: "",
  parametro: "",
  amostra: "",
  solvente: ""
}
