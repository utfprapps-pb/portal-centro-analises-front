import RequestVerificationEmail from "@/services/api/request-email"
import { useFormikContext } from "formik"
import { toast } from "react-hot-toast"

interface FormValues {
  email: string;
  password: string;
}

export const RequestVerifyEmail = () => {

  const { values } = useFormikContext<FormValues>();


  const handleSendEmail = () => {
    let validEmail = values.email !== "";

    if (!validEmail) {
      toast.error('Email inválido. Informe um email válido para receber o código.');

      return;
    }

    RequestVerificationEmail.requestEmail(values.email)
      .then((response) => {
        toast.success('E-mail de verificação enviado com sucesso. Verifique sua caixa de entrada.');
      })
      .catch((error) => {
        toast.error('E-mail inválido');
      });
  }

  return <a onClick={() => handleSendEmail()}>
  Solicitar e-mail para validar seu e-mail?
</a>
}


