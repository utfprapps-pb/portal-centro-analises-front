import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'

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
  emailOrientador: string;
  telefoneOrientador: string;
  departamento: string;
  naturezaProjeto: string;
  descricao: string;
}) {
  try {
    // CHAMADA DA API
  } catch (error) {
    console.error("error", error);
  }
}

export const FormAtividadeAgua: React.FC = () => (
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