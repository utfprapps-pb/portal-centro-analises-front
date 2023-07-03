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
import { api } from "../../libs/axiosBase";
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";
import { FormFooterLoad } from '../form-footer-load';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';

export function FormDrx() {
  const { navigate } = useHistory();

  interface RowData {
    amostra: number;
    identificacao: string;
    modo: string;
    faixa: string;
    velocidade: string;
    step: string;
    tempo: string;
  }

  const [isLoading, setIsLoading] = useState(false);

  function startButtonLoad() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const [rows, setRows] = useState<RowData[]>([]);

  function createData(amostra: number, identificacao: string, modo: string, faixa: string, velocidade: string, step: string, tempo: string) {
    const newData = { amostra, identificacao, modo, faixa, velocidade, step, tempo };
    setRows([...rows, newData]);
  }

  const validationForm = yup.object().shape({
    nomeAluno: yup.string().required("Informe seu nome"),
    nomeOrientador: yup.string().required("Informe o nome do seu orientador"),
    descricao: yup.string().required("Informe a descrição"),
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

  type YourRowType = {
    amostra: number;
    identificacao: string;
    modo: string;
    faixa: string;
    velocidade: string;
    step: string;
    tempo: string;
  };
  

  function handleRemoveRow(row: YourRowType) {
    const updatedRows = rows.filter((r) => r !== row);
    setRows(updatedRows);
  }
  
  async function handleClickForm(values: {
    nomeAluno: string;
    nomeOrientador: string;
    projeto: number;
    descricao: string;
  }) {
    try {
      startButtonLoad();
      const fields = { rows };
      const fieldsStr = JSON.stringify(fields);

      const payload = {
        equipment: { "id": 6 },
        project: { "id": values.projeto },
        description: values.descricao,
        status: 0,
        fields: fieldsStr
      }

      await api.post("/solicitation", payload);
      toast.success('Solicitação efetuada com sucesso!');
      window.setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      toast.error('Erro ao realizar solicitação');
      console.error("error", error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DRX</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "NOMEALUNO",
            nomeOrientador: "NOME",
            projeto: 0,
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
          {({ values }: any) => (
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
                        <TableCell align="right">Remover</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                          key={Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">{row.amostra}</TableCell>
                          <TableCell align="center">{row.identificacao}</TableCell>
                          <TableCell align="center">{row.modo}</TableCell>
                          <TableCell align="center">{row.faixa}</TableCell>
                          <TableCell align="center">{row.velocidade}</TableCell>
                          <TableCell align="center">{row.step}</TableCell>
                          <TableCell align="center">{row.tempo}</TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="secondary"
                              startIcon={<RemoveIcon />}
                              onClick={() => handleRemoveRow(row)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              {isLoading ? <FormFooterLoad /> : <FormFooter />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
