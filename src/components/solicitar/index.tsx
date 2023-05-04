import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PlaylistAdd, History, Check, BusinessCenter } from '@material-ui/icons'
import * as yup from "yup";
import * as S from './styles'
import { FormAbsorcaoAtomica, FormAnaliseTermica, FormAtividadeAgua, FormCr, FormDrx, FormFotometroChama, FormFtir, FormGcMs, FormHplc, FormMev, FormNir, FormUvVis  } from '@/components'


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
    <S.Container>
      <h1>SOLICITAÇÃO</h1>
      <Formik
          initialValues={{ selectedOption: "" }}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
        >
          <Form className='inputs_container'>
            <div className='input_box'>
              <Field
                as="select"
                name="form"
                multiple={false}
                className='input_form_select'
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
    </S.Container>
  )
}