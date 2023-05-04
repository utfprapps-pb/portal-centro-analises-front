import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import * as S from './styles'
import { Button, CustomErrorMessage } from '@/components'

const validationForm = yup.object().shape({

});

async function handleClickForm(values: {

}) {
  try {

  } catch (error) {
    console.error("error", error);
  }
}

export const FormMev: React.FC = () => (
  <S.Container>
    <h1 className='title'>MEV</h1>
    <h2>EM CONTRUÇÃO</h2>
    <div>
      <Formik
        initialValues={{
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
        <Form className='inputs_container'>
          <div className='inputs_box'>
           
          </div>
          <div className='term_box'>
            <p>
              Ao clicar em SOLICITAR, você concorda com nossos <a>Termos</a> e <a>Política de Privacidade</a>.
            </p>
          </div>
          <div className='button_box'>
            <Button type="submit">
              SOLICITAR
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  </S.Container>
)
