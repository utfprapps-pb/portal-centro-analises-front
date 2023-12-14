import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface Hpcl extends BaseForm {
  coluna: string;
  fluxo: string;
  tempoAnalise: string;
  volume: string;
  temperaturaForno: string;
  temperaturaRi: string;
  fluorescenciaEmissao: string;
  fluorescenciaExcitacao: string;
  comprimentoOnda: string;
  composicao: string;
  gradiente: string;
}

export const HPCL_EMPTY = {
  ...BASE_FORM_EMPTY,
  coluna: "",
  fluxo: "",
  tempoAnalise: "",
  volume: "",
  temperaturaForno: "",
  temperaturaRi: "",
  fluorescenciaEmissao: "",
  fluorescenciaExcitacao: "",
  comprimentoOnda: "",
  composicao: "",
  gradiente: ""
}
