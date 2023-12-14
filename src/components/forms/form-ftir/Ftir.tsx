import { BASE_FORM_EMPTY, BaseForm } from "@/components/forms/BaseForm";

export interface Ftir extends BaseForm {
  solventeUtilizado: string;
}

export const FTIR_EMPTY = {
  ...BASE_FORM_EMPTY,
  solventeUtilizado: ""
}
