import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PlaylistAdd, History, Check, BusinessCenter } from '@material-ui/icons'
import * as yup from "yup";
import { FormAbsorcaoAtomica, FormAnaliseTermica, FormAtividadeAgua, FormCr, FormDrx, FormFotometroChama, FormFtir, FormGcMs, FormHplc, FormMev, FormNir, FormUvVis  } from '@/components'
import styles from "./styles.module.scss";


export function Solicitar() {
  const [activeForm, setActiveForm] = useState('');
  
  const validationForm = yup.object().shape({
    firstName: yup.string().required("Informe seu nome"),
    surname: yup.string().required("Informe seu sobrenome"),
    email: yup.string().email("Email inválido").required("Informe um email!"),
  });

  const options = [
    { label: "Escolha um formulário", value: "" },
    { label: "Absorção Atômica", value: "AA" },
    { label: "GC-MS", value: "GCMS" },
    { label: "DRX", value: "DRX" },
    { label: "Infravermelho-FTIR", value: "FTIR" },
    { label: "HPLC", value: "HPLC" },
    { label: "MEV", value: "MEV" },
    { label: "Infravermelho-NIR", value: "NIR" },
    { label: "Análise Térmica", value: "AT" },
    { label: "UV/VIS", value: "UVVIS" },
    { label: "Atividade de água", value: "AAG" },
    { label: "Fotômetro de chama", value: "FC" },
    { label: "Colorímetro CR 400", value: "CR" },
  ];
  
  function handleClickForm(event: any) {
    console.log(event.target.value)
    setActiveForm(event.target.value);
  }
  return(
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>SOLICITAÇÃO</h1>
        <Formik
            initialValues={{ selectedOption: "" }}
            onSubmit={handleClickForm}
            validationSchema={validationForm}
          >
            <Form className={styles.inputs_container}>
              <div className={styles.input_box}>
                <Field
                  as="select"
                  name="form"
                  multiple={false}
                  className={styles.input_form_select}
                  onChange={handleClickForm}
                >
                  {options.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Field>
              </div>
            </Form>
          </Formik>
          {activeForm == '' && 
            <>
              <h2 className={styles.sub_title}>IMPORTANTE</h2> 
              <div className={styles.importante}>
                <p>a)	Solicita-se que o nome CENTRAL DE ANÁLISES – UTFPR Campus Pato Branco seja mencionado nos agradecimentos em todos os tipos de publicações que resultarem da utilização de suas instalações. </p>
                <p>b)	Solicita-se que os arquivos com as referências de todos os tipos de trabalhos (comunicações em congressos, trabalhos completos, monografias, etc.) sejam enviados para o e-mail da Central de Análises. </p>
              </div>
              <h2 className={styles.sub_title}>OS USUÁRIOS SE COMPROMETEM EM</h2> 
              <div className={styles.comprometem}>
                <p>1)	Providenciar a preparação das amostras (verificar os métodos de preparação para a amostra de interesse, etc.) antecipadamente na Central de Análises ou em outro local; </p>
                <p>2)	Interpretar os resultados fornecidos; </p>
                <p>3)	Chegar no horário estipulado (em caso de atraso, a reserva será transferida para outro usuário após 15 minutos); </p>
                <p>4)	Avisar ao responsável pelo equipamento, com no mínimo 24 horas de antecedência, quando não puder comparecer no horário estipulado;</p>
                <p>5)	Respeitar os horários estipulados, de modo a não interferir nos horários de outros usuários. </p>              
              </div>
            </>
          }
          {activeForm == 'AA' && <FormAbsorcaoAtomica />}
          {activeForm == 'GCMS' && <FormGcMs />}
          {activeForm == 'DRX' && <FormDrx />}
          {activeForm == 'FTIR' && <FormFtir />}
          {activeForm == 'HPLC' && <FormHplc />}
          {activeForm == 'MEV' && <FormMev />}
          {activeForm == 'NIR' && <FormNir />}
          {activeForm == 'AT' && <FormAnaliseTermica />}
          {activeForm == 'UVVIS' && <FormUvVis />}
          {activeForm == 'AAG' && <FormAtividadeAgua />}
          {activeForm == 'FC' && <FormFotometroChama />}
          {activeForm == 'CR' && <FormCr />}
      </div>
    </>
  )
}