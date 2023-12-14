import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface AnaliseTermica extends BaseForm {
  amostra: number;
  identificacao: string;
  caracteristicas: string;
  massaAmostra: string;
  tecnica: string;
  atmosferaFluxo: string;
  taxaAquecimento: string;
  intervaloTemperatura: string;
}

export const ANALISE_TERMICA_EMPTY = {
  ...BASE_FORM_EMPTY,
  amostra: 0,
  identificacao: "",
  caracteristicas: "",
  massaAmostra: "",
  tecnica: "",
  atmosferaFluxo: "",
  taxaAquecimento: "",
  intervaloTemperatura: ""
}
