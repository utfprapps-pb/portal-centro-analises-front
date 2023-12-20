import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface FotometroChama extends BaseForm {
  limites: string;
  elementosAnalisados: string;
  concentracoes: string;
}

export const FOTOMETRO_CHAMA_EMPTY = {
  ...BASE_FORM_EMPTY,
  limites: "",
  elementosAnalisados: "",
  concentracoes: ""
}
