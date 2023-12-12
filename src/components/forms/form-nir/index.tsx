import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { useHistory } from "@/hooks";
import { FormProps } from '@/components/forms/FormProps';
import { loadFormBySolicitation, sendSolicitationForm } from '@/components/forms/FormUtils';
import { useParams } from 'react-router-dom';
import { NIR_EMPTY, Nir } from '@/components/forms/form-nir/Nir';

export const FormNir: React.FC<FormProps> = (props: Readonly<FormProps>) => {
  const { navigate } = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [nir, setNir] = useState<Nir>(NIR_EMPTY);

  useEffect(() => {
    if (id) {
      const form = loadFormBySolicitation(props.solicitation);
      if (form) {
        setNir(form);
      }
    }
  }, []);

  const validationForm = yup.object().shape({
    nomeAluno: yup.string(),
    nomeOrientador: yup.string(),
    descricao: yup.string().required("Informe a descrição"),
    onda: yup.string().required("Informe o número de onda"),
    resolucao: yup.string().required("Informe a resolução"),
    acumulacao: yup.string().required("Informe as acumulações"),
    parametro: yup.string().required("Informe o parâmetro"),
    amostra: yup.string().required("Informe o tipo da amostra"),
    solvente: yup.string().required("Informe o solvente")
  });

  async function handleClickForm(values: Nir) {
    setIsLoading(true);

    const { onda, resolucao, acumulacao, parametro, amostra, solvente } = values;
    const fields = { onda, resolucao, acumulacao, parametro, amostra, solvente };
    const fieldsStr = JSON.stringify(fields);
    const payload = {
      equipment: { id: 7 },
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
      <h1 className={styles.title}>Infravermelho-NIR</h1>
      <div>
        <Formik
          initialValues={nir}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
          enableReinitialize={true}
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
            <FormFooter loading={isLoading} />
          </Form>
        </Formik>
      </div>
    </div>
  )
}