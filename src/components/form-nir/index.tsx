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
  onda: yup.string().required("Informe o número de onda"),
  resolucao: yup.string().required("Informe a resolução"),
  acumulacao: yup.string().required("Informe as acumulações"),
  parametro: yup.string().required("Informe o parâmetro"),
  amostra: yup.string().required("Informe o tipo da amostra"),
  solvente: yup.string().required("Informe o solvente")
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
  onda: string;
  resolucao: string;
  acumulacao: string;
  parametro: string;
  amostra: string;
  solvente: string;
}) {
  try {
    // CHAMADA DA API
  } catch (error) {
    console.error("error", error);
  }
}

export const FormNir: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Infravermelho-NIR</h1>
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
          onda: "",
          resolucao: "",
          acumulacao: "",
          parametro: "",
          amostra: "",
          solvente: ""
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
        <Form className={styles.inputs_container}>
          <div className={styles.inputs_box}>
            <FormHeader />
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Número de onda (cm-1)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="onda"
                    className={styles.form_error}
                  />
                  <Field
                    name="onda"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Resolução (cm-1)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="resolucao"
                    className={styles.form_error}
                  />
                  <Field
                    name="resolucao"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Acumulações</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="acumulacao"
                    className={styles.form_error}
                  />
                  <Field
                    name="acumulacao"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.row_box}>
                <div className={styles.field_box_2}>
                  <p>Parâmetros Ópticos</p>
                  <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="parametro" value="solida" />
                      Absorbância(A)
                    </label>
                    <label>
                      <Field type="radio" name="parametro" value="liquida" />
                      Transmitância(T%)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.row_box}>
                <div className={styles.field_box_2}>
                  <p>Amostra</p>
                  <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="amostra" value="solida" />
                      Amostra sólida
                    </label>
                    <label>
                      <Field type="radio" name="amostra" value="liquida" />
                      Amostra líquida
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Solvente utilizado</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="solvente"
                    className={styles.form_error}
                  />
                  <Field
                    name="solvente"
                    placeholder=''
                    className={styles.input_form}
                  />
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