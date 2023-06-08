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
  varredura: yup.string().required("Informe o tipo de varredura"),
  comprimento: yup.string().required("Informe o comprimento"),
  cubeta: yup.string().required("Informe o tipo da cubeta"),
  amostra: yup.string().required("Informe o tipo da amostra")
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
  varredura: string;
  comprimento: string;
  cubeta: string;
  amostra: string;
}) {
  try {
    // CHAMADA DA API
  } catch (error) {
    console.error("error", error);
  }
}

export const FormUvVis: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>UV/VIS</h1>
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
          varredura: "",
          comprimento: "",
          cubeta: "",
          amostra: ""
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
        <Form className={styles.inputs_container}>
          <div className={styles.inputs_box}>
            <FormHeader />
            <div className={styles.field_box}>
              <p>Faixa de Varredura (nm)</p>
              <div className={styles.input_box}>
                <ErrorMessage
                  component={CustomErrorMessage}
                  name="varredura"
                  className={styles.form_error}
                />
                <Field
                  name="varredura"
                  placeholder=''
                  className={styles.input_form}
                />
              </div>
            </div>
            <div className={styles.field_box}>
              <p>Comprimento de onda fixo (nm)</p>
              <div className={styles.input_box}>
                <ErrorMessage
                  component={CustomErrorMessage}
                  name="comprimento"
                  className={styles.form_error}
                />
                <Field
                  name="comprimento"
                  placeholder=''
                  className={styles.input_form}
                />
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box_2}>
                <p>Amostra</p>
                <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="amostra" value="solida" />
                    Sólida
                  </label>
                  <label>
                    <Field type="radio" name="amostra" value="liquida" />
                    Liquida
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box_2}>
                <p>Cubetas</p>
                <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="cubeta" value="acrílico" />
                    Acrílico
                  </label>
                  <label>
                    <Field type="radio" name="cubeta" value="quartzo" />
                    Quartzo
                  </label>
                  <label>
                    <Field type="radio" name="cubeta" value="vidro" />
                    Vidro
                  </label>
                </div>
              </div>
            </div>
          </div>
          <FormFooter />
        </Form>
      </Formik>
    </div>
  </div>
)