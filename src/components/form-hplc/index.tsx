import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { api } from "../../libs/axiosBase";
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";
import { FormFooterLoad } from '../form-footer-load';

export const FormHplc: React.FC = () => {
  const { navigate } = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  function startButtonLoad() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const validationForm = yup.object().shape({
    nomeAluno: yup.string().required("Informe seu nome"),
    nomeOrientador: yup.string().required("Informe o nome do seu orientador"),
    descricao: yup.string().required("Informe a descrição"),
    coluna: yup.string().required("Informe a coluna"),
    fluxo: yup.string().required("Informe o fluxo"),
    tempoAnalise: yup.string().required("Informe a descrição"),
    volume: yup.string().required("Informe o volume injetado"),
    temperaturaForno: yup.string().required("Informe a temperatura do forno"),
    temperaturaRi: yup.string(),
    fluorescenciaEmissao: yup.string(),
    fluorescenciaExcitacao: yup.string(),
    comprimentoOnda: yup.string(),
    composicao: yup.string(),
    gradiente: yup.string()
  });

  async function handleClickForm(values: {
    nomeAluno: string;
    nomeOrientador: string;
    projeto: number;
    descricao: string;
    //
    coluna: string;
    fluxo: string;
    tempoAnalise: string;
    volume: string;
    temperaturaForno: string;
    temperaturaRi: string;
    fluorescenciaEmissao: string;
    fluorescenciaExcitacao: string;
    comprimentoOnda: string;
    composicao: string;
    gradiente: string;
  }) {
    try {
      startButtonLoad();
      const { coluna, fluxo, tempoAnalise, volume, temperaturaForno, temperaturaRi, fluorescenciaEmissao, fluorescenciaExcitacao, comprimentoOnda, composicao, gradiente } = values;
      const fields = { coluna, fluxo, tempoAnalise, volume, temperaturaForno, temperaturaRi, fluorescenciaEmissao, fluorescenciaExcitacao, comprimentoOnda, composicao, gradiente };
      const fieldsStr = JSON.stringify(fields);

      const payload = {
        equipment: {"id": 1},
        project: {"id": values.projeto},
        description : values.descricao,
        status : 0,
        fields: fieldsStr
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
      <h1 className={styles.title}>HPLC</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "NOMEALUNO",
            nomeOrientador: "NOME",
            projeto: 0,
            descricao: "",
            coluna: "",
            fluxo: "",
            tempoAnalise: "",
            volume: "",
            temperaturaForno: "",
            temperaturaRi: "",
            fluorescenciaEmissao: "",
            fluorescenciaExcitacao: "",
            comprimentoOnda: "",
            composicao: "",
            gradiente: ""
          }}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
        >
          <Form className={styles.inputs_container}>
            <div className={styles.inputs_box}>
              <FormHeader />
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
                      placeholder=''
                      className={styles.input_form}
                    />
                  </div>
                </div>
                <div className={styles.field_box}>
                  <p>Fluxo (mL min-1)</p>
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
              </div>
              <div className={styles.row_box}>
                <div className={styles.field_box}>
                  <p>Tempo de análise (min)</p>
                  <div className={styles.input_box}>
                    <ErrorMessage
                      component={CustomErrorMessage}
                      name="tempoAnalise"
                      className={styles.form_error}
                    />
                    <Field
                      name="tempoAnalise"
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
                      placeholder=''
                      className={styles.input_form}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Temperatura do Forno da coluna (°C)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="temperaturaForno"
                    className={styles.form_error}
                  />
                  <Field
                    name="temperaturaForno"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
              <h3 className={styles.sub_title}>Detector(es) desejado(s):</h3>
              <div className={styles.field_box}>
                <p>RI - Temperatura (°C)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="temperaturaRi"
                    className={styles.form_error}
                  />
                  <Field
                    name="temperaturaRi"
                    placeholder='Caso não necessário, não preencha'
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.row_box}>
                <div className={styles.field_box}>
                  <p>Fluorescência - λ emissão</p>
                  <div className={styles.input_box}>
                    <ErrorMessage
                      component={CustomErrorMessage}
                      name="fluorescenciaEmissao"
                      className={styles.form_error}
                    />
                    <Field
                      name="fluorescenciaEmissao"
                      placeholder='Caso não necessário, não preencha'
                      className={styles.input_form}
                    />
                  </div>
                </div>
                <div className={styles.field_box}>
                  <p>Fluorescência - λ excitação</p>
                  <div className={styles.input_box}>
                    <ErrorMessage
                      component={CustomErrorMessage}
                      name="fluorescenciaExcitacao"
                      className={styles.form_error}
                    />
                    <Field
                      name="fluorescenciaExcitacao"
                      placeholder='Caso não necessário, não preencha'
                      className={styles.input_form}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.field_box}>
                <p>PDA - Comprimento de onda (nm)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="comprimentoOnda"
                    className={styles.form_error}
                  />
                  <Field
                    name="comprimentoOnda"
                    placeholder='Caso não necessário, não preencha'
                    className={styles.input_form}
                  />
                </div>
              </div>
              <h3 className={styles.sub_title}>Modo de eluição</h3>
              <div className={styles.field_box}>
                <p>Isocrático - Composição da fase móvel</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="composicao"
                    className={styles.form_error}
                  />
                  <Field
                    name="composicao"
                    placeholder='Caso não necessário, não preencha'
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Gradiente - Descrever as condições</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="gradiente"
                    className={styles.form_error}
                  />
                  <Field
                    name="gradiente"
                    placeholder='Caso não necessário, não preencha'
                    className={styles.input_form}
                  />
                </div>
              </div>
            </div>
            {isLoading ? <FormFooterLoad /> : <FormFooter />}
          </Form>
        </Formik>
      </div>
    </div>
  )
}