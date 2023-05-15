import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add } from '@material-ui/icons'


export function FormDrx() {
    interface RowData {
    amostra: number;
    identificacao: string;
    modo: string;
    faixa: string;
    velocidade: string;
    step: string;
    tempo: string;
  }
  
  const [rows, setRows] = useState<RowData[]>([]);
  
  function createData(amostra: number, identificacao: string, modo: string, faixa: string, velocidade: string, step: string, tempo: string) {
    // return { amostra, identificacao, modo, faixa, velocidade, step, tempo };
    const newData = { amostra, identificacao, modo, faixa, velocidade, step, tempo };
    setRows([...rows, newData]);
  }
  
  
  const validationForm = yup.object().shape({
    nomeAluno: yup.string().required("Informe seu nome"),
    emailAluno: yup.string().email("Email inválido").required("Informe seu email"),
    telefoneAluno: yup.string().required("Informe seu telefone"),
    nomeOrientador: yup.string().required("Informe o nome do seu orientador"),
    emailOrientador: yup.string().email("Email inválido").required("Informe o email do seu orientador"),
    telefoneOrientador: yup.string().required("Informe o telefone"),
    departamento: yup.string().required("Informe o departamento"),
    naturezaProjeto: yup.string().required("Informe a natureza do projeto"),
    descricao: yup.string().required("Informe a descrição")
  });
  
  function addInTable(values: {
    amostra: number;
    identificacao: string;
    modo: string;
    faixa: string;
    velocidade: string;
    step: string;
    tempo: string;
  }) {
    createData(values.amostra, values.identificacao, values.modo, values.faixa, values.velocidade, values.step, values.tempo)
  }
  
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
  }) {
    try {
      console.log(rows)
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DRX</h1>
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
            amostra: 0,
            identificacao: "",
            modo: "",
            faixa: "",
            velocidade: "",
            step: "",
            tempo: ""
          }}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
        >
          {({ values }) => (
            <Form className={styles.inputs_container}>
              <div className={styles.inputs_box}>
                <FormHeader />
                <h3 className={styles.sub_title}>METODOLOGIA DE ANÁLISE</h3>
                <div className={styles.row_box}>
                  <div className={styles.field_box}>
                    <p>Nº Amostra</p>
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
                    <p>Identificação</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="identificacao"
                        className={styles.form_error}
                      />
                      <Field
                        name="identificacao"
                        placeholder=''
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                  <div className={styles.field_box}>
                    <p>Modo de análise</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="modo"
                        className={styles.form_error}
                      />
                      <Field
                        name="modo"
                        placeholder='Step/Contínuo'
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                  <div className={styles.field_box}>
                    <p>Faixa de Varredura</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="faixa"
                        className={styles.form_error}
                      />
                      <Field
                        name="faixa"
                        placeholder='10º -70º'
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                  <div className={styles.field_box}>
                    <p>Velocidade de Varredura</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="velocidade"
                        className={styles.form_error}
                      />
                      <Field
                        name="velocidade"
                        placeholder='º/min'
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                  <div className={styles.field_box}>
                    <p>Step</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="step"
                        className={styles.form_error}
                      />
                      <Field
                        name="step"
                        placeholder='0,02 ou 0,05'
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                  <div className={styles.field_box}>
                    <p>Tempo do passo</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="tempo"
                        className={styles.form_error}
                      />
                      <Field
                        name="tempo"
                        placeholder='Somente step'
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                  <div className='button_box'>
                    <button type='button' onClick={() => addInTable(values)}>
                      <Add style={{ color: '#3f51b5' }} />
                    </button>
                  </div>
                </div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Nº Amostra</TableCell>
                        <TableCell align="right">Identificação</TableCell>
                        <TableCell align="right">Modo de análise</TableCell>
                        <TableCell align="right">Faixa de Varredura</TableCell>
                        <TableCell align="right">Velocidade de Varredura</TableCell>
                        <TableCell align="right">Step</TableCell>
                        <TableCell align="right">Tempo do passo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">{row.amostra}</TableCell>
                          <TableCell align="right">{row.identificacao}</TableCell>
                          <TableCell align="right">{row.modo}</TableCell>
                          <TableCell align="right">{row.faixa}</TableCell>
                          <TableCell align="right">{row.velocidade}</TableCell>
                          <TableCell align="right">{row.step}</TableCell>
                          <TableCell align="right">{row.tempo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <FormFooter /> 
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
