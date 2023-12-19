import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import styles from "./styles.module.scss";
import { useHistory } from "@/hooks";
import { useParams } from 'react-router-dom';
import { ABSORCAO_ATOMICA_EMPTY, AbsorcaoAtomica } from '@/components/forms/form-absorcao-atomica/AbsorcaoAtomica';
import { FormProps } from '@/components/forms/FormProps';
import { loadFormBySolicitation, sendSolicitationForm } from '../FormUtils';

export const FormAbsorcaoAtomica: React.FC<FormProps> = (props: Readonly<FormProps>) => {
  const { navigate } = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [absorcaoAtomica, setAbsorcaoAtomica] = useState<AbsorcaoAtomica>(ABSORCAO_ATOMICA_EMPTY);

  useEffect(() => {
    if (id) {
      const form = loadFormBySolicitation(props.solicitation);
      if (form) {
        setAbsorcaoAtomica(form);
      }
    }
  }, []);

  const validationForm = yup.object().shape({
    nomeAluno: yup.string(),
    nomeOrientador: yup.string(),
    descricao: yup.string().required("Informe a descrição"),
    limites: yup.string().required("Informe os limites"),
    elementos: yup.string().required("Informe os elementos"),
    concentracao: yup.string().required("Informe a concentração"),
    observacoes: yup.string().required("Informe uma observação")
  });

  async function handleClickForm(values: AbsorcaoAtomica) {
    setIsLoading(true);

    const { limites, condicoes, elementos, concentracao, observacoes } = values;
    const fields = { limites, condicoes, elementos, concentracao, observacoes };
    const fieldsStr = JSON.stringify(fields);
    const payload = {
      equipment: { id: 10 },
      project: { id: values.projeto },
      description: values.descricao,
      projectNature: values.natureza,
      otherProjectNature: values.otherProjectNature,
      status: 0,
      fields: fieldsStr
    }
    await sendSolicitationForm(
      payload,
      props.solicitation,
      id);
    window.setTimeout(() => {
      navigate(id ? '/historico' : '/');
    }, 1000);

    setIsLoading(false);
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Absorção Atômica</h1>
        <div>
          <Formik
            initialValues={absorcaoAtomica}
            onSubmit={handleClickForm}
            validationSchema={validationForm}
            enableReinitialize={true}
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
                    <Field type="radio" name="condicoes" value="gerador de hidretos" />
                    Gerador de Hidretos
                  </label>
                  <label>
                    <Field type="radio" name="condicoes" value="forno de grafite" />
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
              <FormFooter loading={isLoading} />
            </Form>
          </Formik>
        </div>
      </div>
    </>
  )
}
