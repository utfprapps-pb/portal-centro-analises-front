import { BaseForm } from "@/components/forms/BaseForm";

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
  nomeAluno: "",
  nomeOrientador: "",
  projeto: 0,
  descricao: "",
  natureza: "",
  otherProjectNature: "",
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
