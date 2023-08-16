import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { api } from "../../libs/axiosBase";
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";
import { FormFooterLoad } from '../form-footer-load';

export const FormGcMs: React.FC = () => {
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
    nomeOrientador: string;
    projeto: number;
    descricao: string;
    natureza: string;
    //
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
      startButtonLoad();
      const { coluna, gas, fluxo, volume, temperatura, tempo, aquecimento, injecao, quantidade } = values;
      const fields = { coluna, gas, fluxo, volume, temperatura, tempo, aquecimento, injecao, quantidade };
      const fieldsStr = JSON.stringify(fields);
  
      const payload = {
        equipment: {"id": 2},
        project: {"id": values.projeto},
        description : values.descricao,
        projectNature : values.natureza,
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
      <h1 className={styles.title}>GC-MS</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "NOMEALUNO",
            nomeOrientador: "NOME",
            projeto: 0,
            descricao: "",
            natureza: "",
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
            {isLoading ? <FormFooterLoad /> : <FormFooter />}
          </Form>
        </Formik>
      </div>
    </div>
  )
}
