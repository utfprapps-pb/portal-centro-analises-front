import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import * as S from './styles'
import { Button, CustomErrorMessage } from '@/components'


const validationForm = yup.object().shape({
  nomeAluno: yup.string().required("Informe seu nome"),
  emailAluno: yup.string().email("Email inválido").required("Informe seu email"),
  telefone: yup.string().required("Informe seu telefone"),
  nomeOrientador: yup.string().required("Informe o nome do seu orientador"),
  emailOrientador: yup.string().email("Email inválido").required("Informe o email do seu orientador"),
  departamento: yup.string().required("Informe o departamento"),
  naturezaProjeto: yup.string().required("Informe a natureza do projeto"),
  descricao: yup.string().required("Informe a descrição"),
  limites: yup.string().required("Informe os limites"),
  elementos: yup.string().required("Informe os elementos"),
  concentracao: yup.string().required("Informe a concentração"),
  observacoes: yup.string().required("Informe uma observação")
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
  condicoes: string;
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
    <h1 className='title'>Absorção Atômica</h1>
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
                    component={CustomErrorMessage}
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
                    component={CustomErrorMessage}
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
                    component={CustomErrorMessage}
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
                    component={CustomErrorMessage}
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
                    component={CustomErrorMessage}
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
                    component={CustomErrorMessage}
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
                    component={CustomErrorMessage}
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
                    component={CustomErrorMessage}
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
                    component={CustomErrorMessage}
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
                  component={CustomErrorMessage}
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
                  component={CustomErrorMessage}
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
                  component={CustomErrorMessage}
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
