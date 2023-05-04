import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PlaylistAdd, History, Check, BusinessCenter } from '@material-ui/icons'
import * as yup from "yup";
import * as S from './styles'
import { Button } from '../button';

const validationForm = yup.object().shape({
  firstName: yup.string().required("Informe seu nome"),
  surname: yup.string().required("Informe seu sobrenome"),
  email: yup.string().email("Email inválido").required("Informe um email!"),
});

async function handleClickForm(values: {
  nomeAluno: string;
  emailAluno: string;
  telefone: string;
  nomeOrientador: string;
  emailOrientador: string;
  departamento: string;
  naturezaProjeto: string;
  descricao: string;
  limites: string;
}) {
  try {

  } catch (error) {
    console.error("error", error);
  }
}

export const FormMev: React.FC = () => (
  <S.Container>
    <h2>MEV</h2>
    <div>
      <Formik
        initialValues={{
          nomeAluno: "",
          emailAluno: "",
          telefone: "",
          nomeOrientador: "",
          emailOrientador: "",
          departamento: "",
          naturezaProjeto: "",
          descricao: "",
          limites: "",
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
        <Form className='inputs_container'>
          <div className='inputs_box'>
            <div className='row_box'>
              <div className='field_box'>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="nomeAluno"
                  />
                  <Field
                    name="nomeAluno"
                    placeholder="Nome do Aluno"
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="emailAluno"
                  />
                  <Field
                    name="emailAluno"
                    placeholder="Email do Aluno"
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="telefone"
                  />
                  <Field
                    name="telefone"
                    placeholder='Telefone'
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="naturezaProjeto"
                    className='form_error'
                  />
                  <Field
                    name="naturezaProjeto"
                    placeholder='Naturza do Projeto'
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="nomeOrientador"
                    className='form_error'
                  />
                  <Field
                    name="nomeOrientador"
                    placeholder='Nome do Orientador'
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="emailOrientador"
                    className='form_error'
                  />
                  <Field
                    name="emailOrientador"
                    placeholder='Email do Orientador'
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="departamento"
                    className='form_error'
                  />
                  <Field
                    name="departamento"
                    placeholder='Departamento'
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="descricao"
                    className='form_error'
                  />
                  <Field
                    component="textarea"
                    name="descricao"
                    type="textarea"
                    placeholder='DESCREVER A METODOLOGIA DE PREPARO DAS AMOSTRAS A SEREM ANALISADAS:'
                    className='input_form_text_area'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="limites"
                    className='form_error'
                  />
                  <Field
                    component="textarea"
                    name="limites"
                    type="textarea"
                    placeholder='LIMITES MÍNIMO E MÁXIMO DA CONCENTRAÇÃO DAS AMOSTRAS:'
                    className='input_form_text_area'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='term_box'>
            <p>
              Ao clicar em SOLICITAR, você concorda com nossos <a>Termos</a>,
              Política de Privacidade e Política de Cookies.
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
