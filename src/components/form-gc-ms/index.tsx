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
  telefoneOrientador: yup.string().email("Email inválido").required("Informe o telefone do seu orientador"),
  departamento: yup.string().required("Informe o departamento"),
  naturezaProjeto: yup.string().required("Informe a natureza do projeto"),
  descricao: yup.string().required("Informe a descrição"),
  coluna: yup.string().required("Informe a coluna"),
  gas: yup.string().required("Informe o gás"),
  fluxo: yup.string().required("Informe o fluxo"),
  volume: yup.string().required("Informe o volume"),
  temperatura: yup.string().required("Informe a temperatura"),
  tempo: yup.string().required("Informe o tempo"),
  aquecimento: yup.string().required("Informe a taxa"),
  injecao: yup.string().required("Informe o modo"),
  quantidade: yup.string().required("Informe a quantidade")
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
  coluna: string;
  gas: string;
  fluxo: string;
  volume: string;
  temperatura: string;
  tempo: string;
  aquecimento: string;
  injecao: string;
  quantidade: string;
}) {
  try {
    // CHAMADA DA API
  } catch (error) {
    console.error("error", error);
  }
}

export const FormGcMs: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>GC-MS</h1>
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
          coluna: "",
          gas: "",
          fluxo: "",
          volume: "",
          temperatura: "",
          tempo: "",
          aquecimento: "",
          injecao: "",
          quantidade: ""
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
        <Form className={styles.inputs_container}>
          <div className={styles.inputs_box}>
            <FormHeader />
            <h3 className={styles.sub_title}>METODOLOGIA ANALÍTICA: CONDIÇÕES A SEREM UTILIZADAS </h3>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Coluna</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="coluna"
                    className={styles.form_error}
                  />
                  <Field
                    name="coluna"
                    placeholder='DB5-MS Apolar 30 m x 0,25 mm '
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Gás</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="gas"
                    className={styles.form_error}
                  />
                  <Field
                    name="gas"
                    placeholder='Hélio'
                    className={styles.input_form}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Fluxo do gás (mL min-1)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="fluxo"
                    className={styles.form_error}
                  />
                  <Field
                    name="fluxo"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Volume injetado (µL)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="volume"
                    className={styles.form_error}
                  />
                  <Field
                    name="volume"
                    placeholder='1'
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Temperatura do injetor (°C)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="temperatura"
                    className={styles.form_error}
                  />
                  <Field
                    name="temperatura"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Tempo de análise (min)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="tempo"
                    className={styles.form_error}
                  />
                  <Field
                    name="tempo"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Taxa de aquecimento (°C min-1)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="aquecimento"
                    className={styles.form_error}
                  />
                  <Field
                    name="aquecimento"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box_2}>
                <p>Modo de injeção</p>
                <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="injecao" value="chama" />
                    Split
                  </label>
                  <label>
                    <Field type="radio" name="injecao" value="geradorHidretos" />
                    Splitless
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Quantidade de amostras incluindo pontos de curva de calibração (aproximadamente)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="quantidade"
                    className={styles.form_error}
                  />
                  <Field
                    name="quantidade"
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
