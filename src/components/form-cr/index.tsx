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
  amostra: yup.string().required("Informe a amostra"),
  numeroMedicao: yup.string().required("Informe o número de medições"),
  localizacao: yup.string().required("Informe a localização"),
  leitura: yup.string().required("Informe a leitura")
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
  amostra: string;
  numeroMedicao: string;
  localizacao: string;
  leitura: string;
}) {
  try {
    // CHAMADA DA API
  } catch (error) {
    console.error("error", error);
  }
}

export const FormCr: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Colorímetro CR 400</h1>
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
          amostra: "",
          numeroMedicao: "",
          localizacao: "",
          leitura: ""
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
        <Form className={styles.inputs_container}>
          <div className={styles.inputs_box}>
            <FormHeader />
            <div className={styles.field_box}>
              <p>Amostra</p>
              <div className={styles.input_box}>
                <ErrorMessage
                  component={CustomErrorMessage}
                  name="amostra"
                  className={styles.form_error}
                />
                <Field
                  name="amostra"
                  placeholder=''
                  className={styles.input_form}
                />
              </div>
            </div>
            <div className={styles.field_box}>
              <p>Número de medições em cada amostra</p>
              <div className={styles.input_box}>
                <ErrorMessage
                  component={CustomErrorMessage}
                  name="numeroMedicao"
                  className={styles.form_error}
                />
                <Field
                  name="numeroMedicao"
                  placeholder=''
                  className={styles.input_form}
                />
              </div>
            </div>
            <div className={styles.field_box}>
              <p>Localização das medições</p>
              <div className={styles.input_box}>
                <ErrorMessage
                  component={CustomErrorMessage}
                  name="localizacao"
                  className={styles.form_error}
                />
                <Field
                  name="localizacao"
                  placeholder='frutas, medições na região lateral, superior, inferior, etc..'
                  className={styles.input_form}
                />
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.row_box}>
                <div className={styles.field_box_2}>
                  <p>Leitura</p>
                  <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="leitura" value="solida" />
                      CIE : L*a*b*
                    </label>
                    <label>
                      <Field type="radio" name="leitura" value="liquida" />
                      Hunter Lab: L a b
                    </label>
                  </div>
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