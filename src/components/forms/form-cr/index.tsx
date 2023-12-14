import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { useHistory } from "@/hooks";
import { FormProps } from '@/components/forms/FormProps';
import { CR_EMPTY, Cr } from '@/components/forms/form-cr/Cr';
import { useParams } from 'react-router-dom';
import { loadFormBySolicitation, sendSolicitationForm } from '@/components/forms/FormUtils';

export const FormCr: React.FC<FormProps> = (props: Readonly<FormProps>) => {
  const { navigate } = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [cr, setCr] = useState<Cr>(CR_EMPTY);

  useEffect(() => {
    if (id) {
      const form = loadFormBySolicitation(props.solicitation);
      if (form) {
        setCr(form);
      }
    }
  }, []);

  const validationForm = yup.object().shape({
    nomeAluno: yup.string(),
    nomeOrientador: yup.string(),
    descricao: yup.string().required("Informe a descrição"),
    amostra: yup.string().required("Informe a amostra"),
    numeroMedicao: yup.string().required("Informe o número de medições"),
    localizacao: yup.string().required("Informe a localização"),
    leitura: yup.string().required("Informe a leitura")
  });

  async function handleClickForm(values: Cr) {
    setIsLoading(true);

    const { amostra, numeroMedicao, localizacao, leitura } = values;
    const fields = { amostra, numeroMedicao, localizacao, leitura };
    const fieldsStr = JSON.stringify(fields);
    const payload = {
      equipment: { id: 4 },
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
      <h1 className={styles.title}>Colorímetro CR 400</h1>
      <div>
        <Formik
          initialValues={cr}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
          enableReinitialize={true}
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
            <FormFooter loading={isLoading} />
          </Form>
        </Formik>
      </div>
    </div>
  )
}