import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { useHistory } from "@/hooks";
import { FormProps } from '@/components/forms/FormProps';
import { FTIR_EMPTY, Ftir } from '@/components/forms/form-ftir/Ftir';
import { loadFormBySolicitation, sendSolicitationForm } from '@/components/forms/FormUtils';
import { useParams } from 'react-router-dom';

export const FormFtir: React.FC<FormProps> = (props: Readonly<FormProps>) => {
  const { navigate } = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [ftir, setFtir] = useState<Ftir>(FTIR_EMPTY);

  useEffect(() => {
    if (id) {
      const form = loadFormBySolicitation(props.solicitation);
      if (form) {
        setFtir(form);
      }
    }
  }, []);

  const validationForm = yup.object().shape({
    nomeAluno: yup.string(),
    nomeOrientador: yup.string(),
    descricao: yup.string().required("Informe a descrição"),
    solventeUtilizado: yup.string().required("Informe o solvente utilizado"),
  });

  async function handleClickForm(values: Ftir) {
    setIsLoading(true);

    const { solventeUtilizado } = values;
    const fields = { solventeUtilizado };
    const fieldsStr = JSON.stringify(fields);
    const payload = {
      equipment: { id: 8 },
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
      <h1 className={styles.title}>Infravermelho-FTIR</h1>
      <div>
        <Formik
          initialValues={ftir}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
          enableReinitialize={true}
        >
          <Form className={styles.inputs_container}>
            <div className={styles.inputs_box}>
              <FormHeader />
              <div className={styles.radio_box}>
                <h3 className={styles.sub_title}>Serviço Requerido</h3>
                <p>Espectroscopia no Infravermelho com Transformada de Fourier (FT-IR) utilizando o acessório:</p>
                <div role="group" aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="condicoes" value="kbr" />
                    Pastilha de KBr
                  </label>
                  <label>
                    <Field type="radio" name="condicoes" value="atr" />
                    Reflectância total atenuada (Attenuated total reflectance)
                  </label>
                  <label>
                    <Field type="radio" name="condicoes" value="dfs" />
                    Refletância difusa (Difuse reflectance sampling)
                  </label>
                </div>
              </div>
              <h3 className={styles.sub_title}>METODOLOGIA ANALÍTICA: CONDIÇÕES A SEREM UTILIZADAS </h3>
              <div className={styles.row_box}>
                <div className={styles.field_box}>
                  <label>
                    Amostra Sólida
                    <Field type="checkbox" name="amostraSolida" value="amostraSolida" />
                  </label>
                </div>
                <div className={styles.field_box}>
                  <label>
                    Amostra líquida
                    <Field type="checkbox" name="amostraLiquida" value="amostraLiquida" />
                  </label>
                </div>
                <div className={styles.field_box}>
                  <p>Solvente utilizado</p>
                  <div className={styles.input_box}>
                    <ErrorMessage
                      component={CustomErrorMessage}
                      name="solventeUtilizado"
                      className={styles.form_error}
                    />
                    <Field
                      name="solventeUtilizado"
                      placeholder=''
                      className={styles.input_form}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.row_box}>
                <div className={styles.field_box}>
                  <label>
                    Registros dos espectros: Absorbância (A)
                    <Field type="checkbox" name="absorbancia" value="absorbancia" />
                  </label>
                </div>
                <div className={styles.field_box}>
                  <label>
                    Absorbância (T%)
                    <Field type="checkbox" name="transmitancia " value="transmitancia" />
                  </label>
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