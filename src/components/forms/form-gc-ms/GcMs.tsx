import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface GcMs extends BaseForm {
  coluna: string;
  gas: string;
  fluxo: string;
  volume: string;
  temperatura: string;
  tempo: string;
  aquecimento: string;
  injecao: string;
  quantidade: string;
}

export const GC_MS_EMPTY = {
  ...BASE_FORM_EMPTY,
  coluna: "",
  gas: "",
  fluxo: "",
  volume: "",
  temperatura: "",
  tempo: "",
  aquecimento: "",
  injecao: "",
  quantidade: ""
}
