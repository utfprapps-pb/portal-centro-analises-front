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
  elementos: string;
  concentracao: string;
  observacoes: string;
}) {
  try {

  } catch (error) {
    console.error("error", error);
  }
}

export const FormAbsorcaoAtomica: React.FC = () => (
  <S.Container>
    <h2>Absorção Atômica</h2>
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
          condicoes: "",
          elementos: "", 
          concentracao: "",
          observacoes: ""
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
        <Form className='inputs_container'>
          <div className='inputs_box'>
            <div className='row_box'>
              <div className='field_box'>
                <p>Nome do Aluno</p>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="nomeAluno"
                  />
                  <Field
                    name="nomeAluno"
                    placeholder=""
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Email do Aluno</p>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="emailAluno"
                  />
                  <Field
                    name="emailAluno"
                    placeholder=""
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
              <p>Telefone</p>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="telefone"
                  />
                  <Field
                    name="telefone"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Natureza do Projeto</p>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="naturezaProjeto"
                    className='form_error'
                  />
                  <Field
                    name="naturezaProjeto"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <p>Nome do Orientador</p>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="nomeOrientador"
                    className='form_error'
                  />
                  <Field
                    name="nomeOrientador"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Email do Orientador</p>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="emailOrientador"
                    className='form_error'
                  />
                  <Field
                    name="emailOrientador"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <p>Departamento</p>
                <div className='input_box'>
                  <ErrorMessage
                    component='span'
                    name="departamento"
                    className='form_error'
                  />
                  <Field
                    name="departamento"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <p>Descrição</p>
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
                <p>Limites</p>
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
          <div className='radio_box'>
            <h3>METODOLOGIA ANALÍTICA: CONDIÇÕES A SEREM UTILIZADAS </h3>
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
          <div className='row_box'>
            <div className='field_box'>
              <p>Elementos</p>
              <div className='input_box'>
                <ErrorMessage
                  component='span'
                  name="elementos"
                  className='form_error'
                />
                <Field
                  component="textarea"
                  name="elementos"
                  type="textarea"
                  placeholder='Elementos a serem analisados'
                  className='input_form_text_area'
                />
              </div>
            </div>
          </div>
          <div className='row_box'>
            <div className='field_box'>
              <p>Concetração</p>
              <div className='input_box'>
                <ErrorMessage
                  component='span'
                  name="concentracao"
                  className='form_error'
                />
                <Field
                  component="textarea"
                  name="concentracao"
                  type="textarea"
                  placeholder='Concentrações da curva de calibração'
                  className='input_form_text_area'
                />
              </div>
            </div>
          </div>
          <div className='row_box'>
            <div className='field_box'>
              <p>Observações</p>
              <div className='input_box'>
                <ErrorMessage
                  component='span'
                  name="observacoes"
                  className='form_error'
                />
                <Field
                  component="textarea"
                  name="observacoes"
                  type="textarea"
                  placeholder=''
                  className='input_form_text_area'
                />
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
