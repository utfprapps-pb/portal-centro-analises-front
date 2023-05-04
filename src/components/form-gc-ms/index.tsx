import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import * as S from './styles'
import { Button, CustomErrorMessage } from '@/components'


const validationForm = yup.object().shape({
  nomeAluno: yup.string().required("Informe seu nome"),
  emailAluno: yup.string().email("Email inválido").required("Informe seu email"),
  telefoneAluno: yup.string().required("Informe seu telefone"),
  nomeOrientador: yup.string().required("Informe o nome do seu orientador"),
  emailOrientador: yup.string().email("Email inválido").required("Informe o email do seu orientador"),
  telefoneOrientador: yup.string().email("Email inválido").required("Informe o telefone do seu orientador"),
  departamento: yup.string().required("Informe o departamento"),
  naturezaProjeto: yup.string().required("Informe a natureza do projeto"),
  descricao: yup.string().required("Informe a descrição"),
  coluna: yup.string().required("Informe a coluna"),
  gas: yup.string().required("Informe o gás"),
  fluxo: yup.string().required("Informe o fluxo"),
  volume: yup.string().required("Informe o volume"),
  temperatura: yup.string().required("Informe a temperatura"),
  tempo: yup.string().required("Informe o tempo"),
  aquecimento: yup.string().required("Informe a taxa"),
  injecao: yup.string().required("Informe o modo"),
  quantidade: yup.string().required("Informe a quantidade")
});

async function handleClickForm(values: {
  nomeAluno: string;
  emailAluno: string;
  telefoneAluno: string;
  nomeOrientador: string;
  emailOrientador: string;
  telefoneOrientador: string;
  departamento: string;
  naturezaProjeto: string;
  descricao: string;
  coluna: string;
  gas: string;
  fluxo: string;
  volume: string;
  temperatura: string;
  tempo: string;
  aquecimento: string;
  injecao: string;
  quantidade: string;
}) {
  try {

  } catch (error) {
    console.error("error", error);
  }
}

export const FormGcMs: React.FC = () => (
  <S.Container>
    <h1 className='title'>GC-MS</h1>
    <div>
      <Formik
        initialValues={{
          nomeAluno: "",
          emailAluno: "",
          telefoneAluno: "",
          nomeOrientador: "",
          emailOrientador: "",
          telefoneOrientador: "",
          departamento: "",
          naturezaProjeto: "",
          descricao: "",
          coluna: "",
          gas: "",
          fluxo: "",
          volume: "",
          temperatura: "",
          tempo: "",
          aquecimento: "",
          injecao: "",
          quantidade: ""
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
            </div>
            <div className='row_box'>
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
              <div className='field_box'>
                <p>Telefone do Aluno</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="telefoneAluno"
                  />
                  <Field
                    name="telefoneAluno"
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
            </div>
            <div className='row_box'>
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
              <div className='field_box'>
                <p>Telefone do Orientador</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="telefoneOrientador"
                    className='form_error'
                  />
                  <Field
                    name="telefoneOrientador"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
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
            <h3>METODOLOGIA ANALÍTICA: CONDIÇÕES A SEREM UTILIZADAS </h3>
            <div className='row_box'>
              <div className='field_box'>
                <p>Coluna</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="coluna"
                    className='form_error'
                  />
                  <Field
                    name="coluna"
                    placeholder='DB5-MS Apolar 30 m x 0,25 mm '
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Gás</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="gas"
                    className='form_error'
                  />
                  <Field
                    name="gas"
                    placeholder='Hélio'
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <p>Fluxo do gás (mL min-1)</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="fluxo"
                    className='form_error'
                  />
                  <Field
                    name="fluxo"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Volume injetado (µL)</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="volume"
                    className='form_error'
                  />
                  <Field
                    name="volume"
                    placeholder='1'
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Temperatura do injetor (°C)</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="temperatura"
                    className='form_error'
                  />
                  <Field
                    name="temperatura"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <p>Tempo de análise (min)</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="tempo"
                    className='form_error'
                  />
                  <Field
                    name="tempo"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Taxa de aquecimento (°C min-1)</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="aquecimento"
                    className='form_error'
                  />
                  <Field
                    name="aquecimento"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box_2'>
                <p>Modo de injeção</p>
                <div role="group" className='radio_box' aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="injecao" value="chama" />
                    Split
                  </label>
                  <label>
                    <Field type="radio" name="injecao" value="geradorHidretos" />
                    Splitless
                  </label>
                </div>
              </div>
            </div>
            <div className='row_box'>
              <div className='field_box'>
                <p>Quantidade de amostras incluindo pontos de curva de calibração (aproximadamente)</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="quantidade"
                    className='form_error'
                  />
                  <Field
                    name="quantidade"
                    placeholder=''
                    className='input_form'
                  />
                </div>
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
