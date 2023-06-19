import React from 'react'
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { api } from "../../libs/axiosBase";
import styles from "./styles.module.scss";
import { FormFooter, FormHeader } from '@/components'
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";

export const FormAtividadeAgua: React.FC = () => {
  const { navigate } = useHistory();

  const validationForm = yup.object().shape({
    nomeAluno: yup.string().required("Informe seu nome"),
    emailAluno: yup.string().email("Email inválido").required("Informe seu email"),
    telefoneAluno: yup.string().required("Informe seu telefone"),
    nomeOrientador: yup.string().required("Informe o nome do seu orientador"),
    emailOrientador: yup.string().email("Email inválido").required("Informe o email do seu orientador"),
    telefoneOrientador: yup.string().required("Informe o telefone"),
    departamento: yup.string().required("Informe o departamento"),
    naturezaProjeto: yup.string().required("Informe a natureza do projeto"),
    descricao: yup.string().required("Informe a descrição")
  });
  
  async function handleClickForm(values: {
    nomeAluno: string;
    emailAluno: string;
    telefoneAluno: string;
    nomeOrientador: string;
    projeto: number;
    descricao: string;
  }) {
    try {
  
      const payload = {
        equipment: {"id": 1},
        project: {"id": values.projeto},
        description : values.descricao,
        status : 0,
        fields: {}
      }
  
      await api.post("/solicitation", payload);
      toast.success('Solicitação efetuada com sucesso!');
      window.setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      toast.error('Erro ao realizar solicitação');
      console.error("error", error);
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Atividade de Água</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "",
            emailAluno: "",
            telefoneAluno: "",
            nomeOrientador: "",
            emailOrientador: "",
            telefoneOrientador: "",
            departamento: "",
            naturezaProjeto: "",
            descricao: ""
          }}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
        >
          <Form className={styles.inputs_container}>
            <div className={styles.inputs_box}>
              <FormHeader />
            </div>
            <FormFooter />
          </Form>
        </Formik>
      </div>
    </div>
  )
}