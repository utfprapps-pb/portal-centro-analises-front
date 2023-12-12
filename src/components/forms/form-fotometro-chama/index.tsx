import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { useHistory } from "@/hooks";
import { FormProps } from '@/components/forms/FormProps';
import { loadFormBySolicitation, sendSolicitationForm } from '@/components/forms/FormUtils';
import { useParams } from 'react-router-dom';
import { FOTOMETRO_CHAMA_EMPTY, FotometroChama } from '@/components/forms/form-fotometro-chama/FotometroChama';

export const FormFotometroChama: React.FC<FormProps> = (props: Readonly<FormProps>) => {
  const { navigate } = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [fotometroChama, setFotometroChama] = useState<FotometroChama>(FOTOMETRO_CHAMA_EMPTY);

  useEffect(() => {
    if (id) {
      const form = loadFormBySolicitation(props.solicitation);
      if (form) {
        setFotometroChama(form);
      }
    }
  }, []);

  const validationForm = yup.object().shape({
    nomeAluno: yup.string(),
    nomeOrientador: yup.string(),
    descricao: yup.string().required("Informe a descrição"),
    limites: yup.string().required("Informe os limites"),
    elementosAnalisados: yup.string().required("Informe os elementos a serem analisados"),
    concentracoes: yup.string().required("Informe a concentração da curva")
  });

  async function handleClickForm(values: FotometroChama) {
    setIsLoading(true);

    const { limites, elementosAnalisados, concentracoes } = values;
    const fields = { limites, elementosAnalisados, concentracoes };
    const fieldsStr = JSON.stringify(fields);
    const payload = {
      equipment: { id: 1 },
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
    <div className={styles.container}>
      <h1 className={styles.title}>Fotômetro de Chama</h1>
      <div>
        <Formik
          initialValues={fotometroChama}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
          enableReinitialize={true}
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
            <FormFooter loading={isLoading} />
          </Form>
        </Formik>
      </div>
    </div>
  )
}