import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface Drx extends BaseForm {
  amostra: number;
  identificacao: string;
  modo: string;
  faixa: string;
  velocidade: string;
  step: string;
  tempo: string;
}

export const DRX_EMPTY = {
  ...BASE_FORM_EMPTY,
  amostra: 0,
  identificacao: "",
  modo: "",
  faixa: "",
  velocidade: "",
  step: "",
  tempo: ""
}
