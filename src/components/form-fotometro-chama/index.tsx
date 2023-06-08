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
  descricao: yup.string().required("Informe a descrição"),
  limites: yup.string().required("Informe os limites"),
  elementosAnalisados: yup.string().required("Informe os elementos a serem analisados"),
  concentracoes: yup.string().required("Informe a concentração da curva")
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
  limites: string;
  elementosAnalisados: string;
  concentracoes: string;
}) {
  try {
    // CHAMADA DA API
  } catch (error) {
    console.error("error", error);
  }
}

export const FormFotometroChama: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Fotômetro de Chama</h1>
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
          descricao: "",
          limites: "",
          elementosAnalisados: "",
          concentracoes: ""
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
        <Form className={styles.inputs_container}>
          <div className={styles.inputs_box}>
            <FormHeader />

            <div className={styles.field_box}>
              <p>Limites Mínimo e Máximo da concentração das Amostras</p>
              <div className={styles.input_box}>
                <ErrorMessage
                  component={CustomErrorMessage}
                  name="limites"
                  className={styles.form_error}
                />
                <Field
                  name="limites"
                  placeholder=''
                  className={styles.input_form}
                />
              </div>
            </div>

            <div className={styles.field_box}>
              <p>Elementos a serem analisados</p>
              <div className={styles.input_box}>
                <ErrorMessage
                  component={CustomErrorMessage}
                  name="elementosAnalisados"
                  className={styles.form_error}
                />
                <Field
                  name="elementosAnalisados"
                  placeholder=''
                  className={styles.input_form}
                />
              </div>
            </div>

            <div className={styles.field_box}>
              <p>Concentrações da curva de calibração</p>
              <div className={styles.input_box}>
                <ErrorMessage
                  component={CustomErrorMessage}
                  name="concentracoes"
                  className={styles.form_error}
                />
                <Field
                  name="concentracoes"
                  placeholder=''
                  className={styles.input_form}
                />
              </div>
            </div>

          </div>
          <FormFooter />
        </Form>
      </Formik>
    </div>
  </div>
)