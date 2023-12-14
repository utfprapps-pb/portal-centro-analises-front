import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface UvVis extends BaseForm {
  varredura: string;
  comprimento: string;
  cubeta: string;
  amostra: string;
}

export const UV_VIS_EMPTY = {
  ...BASE_FORM_EMPTY,
  varredura: "",
  comprimento: "",
  cubeta: "",
  amostra: ""
}
