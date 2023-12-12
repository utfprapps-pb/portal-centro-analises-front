import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface Mev extends BaseForm {
  aproximacao: string;
  tipoMaterial: string;
  cuidadosEspeciais: string;
  qtdFotos: string;
}

export const MEV_EMPTY = {
  ...BASE_FORM_EMPTY,
  aproximacao: "",
  tipoMaterial: "",
  cuidadosEspeciais: "",
  qtdFotos: ""
}
