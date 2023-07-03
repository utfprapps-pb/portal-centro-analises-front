import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import styles from "./styles.module.scss";
import { api } from "../../libs/axiosBase";
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";
import { FormFooterLoad } from '../form-footer-load';

export const FormAbsorcaoAtomica: React.FC = () => {
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
    limites: yup.string().required("Informe os limites"),
    elementos: yup.string().required("Informe os elementos"),
    concentracao: yup.string().required("Informe a concentração"),
    observacoes: yup.string().required("Informe uma observação")
  });
  
  async function handleClickForm(values: {
    nomeAluno: string;
    nomeOrientador: string;
    projeto: number;
    descricao: string;
    //
    limites: string;
    condicoes: string;
    elementos: string;
    concentracao: string;
    observacoes: string;
  }) {
    try {
      startButtonLoad();
      const { limites, condicoes, elementos, concentracao, observacoes } = values;
      const fields = { limites, condicoes, elementos, concentracao, observacoes };
      const fieldsStr = JSON.stringify(fields);
  
      const payload = {
        equipment: {"id": 10},
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

  return(
  <>
    <div className={styles.container}>
      <h1 className={styles.title}>Absorção Atômica</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "NOMEALUNO",
            nomeOrientador: "NOME",
            projeto: 0,
            descricao: "",
            limites: "",
            condicoes: "",
            elementos: "", 
            concentracao: "",
            observacoes: ""
          }}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
        >
          <Form className={styles.inputs_container}>
            <div className={styles.inputs_box}>
              <FormHeader />
              <div className={styles.row_box}>
                <div className={styles.field_box}>
                  <p>Limites</p>
                  <div className={styles.input_box}>
                    <ErrorMessage
                      component={CustomErrorMessage}
                      name="limites"
                      className={styles.form_error}
                    />
                    <Field
                      component="textarea"
                      name="limites"
                      type="textarea"
                      placeholder='LIMITES MÍNIMO E MÁXIMO DA CONCENTRAÇÃO DAS AMOSTRAS:'
                      className={styles.input_form_text_area}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.radio_box}>
              <h3 className={styles.sub_title}>METODOLOGIA ANALÍTICA: CONDIÇÕES A SEREM UTILIZADAS </h3>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="condicoes" value="chama" />
                  Chama
                </label>
                <label>
                  <Field type="radio" name="condicoes" value="geradorHidretos" />
                  Gerador de Hidretos
                </label>
                <label>
                  <Field type="radio" name="condicoes" value="fornoGrafite" />
                  Forno de Grafite
                </label>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Elementos</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="elementos"
                    className={styles.form_error}
                  />
                  <Field
                    component="textarea"
                    name="elementos"
                    type="textarea"
                    placeholder='Elementos a serem analisados'
                    className={styles.input_form_text_area}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Concetração</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="concentracao"
                    className={styles.form_error}
                  />
                  <Field
                    component="textarea"
                    name="concentracao"
                    type="textarea"
                    placeholder='Concentrações da curva de calibração'
                    className={styles.input_form_text_area}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Observações</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="observacoes"
                    className={styles.form_error}
                  />
                  <Field
                    component="textarea"
                    name="observacoes"
                    type="textarea"
                    placeholder=''
                    className={styles.input_form_text_area}
                  />
                </div>
              </div>
            </div>
            {isLoading ? <FormFooterLoad /> : <FormFooter />}
          </Form>
        </Formik>
      </div>
    </div>
  </>
  )
}
