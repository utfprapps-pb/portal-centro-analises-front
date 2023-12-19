import React, { useEffect, useState } from 'react'
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
import { useHistory } from "@/hooks";
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import { FormProps } from '@/components/forms/FormProps';
import { ANALISE_TERMICA_EMPTY, AnaliseTermica } from '@/components/forms/form-analise-termica/AnaliseTermica';
import { loadFormBySolicitation, sendSolicitationForm } from '@/components/forms/FormUtils';
import { useParams } from 'react-router-dom';

export const FormAnaliseTermica: React.FC<FormProps> = (props: Readonly<FormProps>) => {
  const { navigate } = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [analiseTermica, setAnaliseTermica] = useState<AnaliseTermica>(ANALISE_TERMICA_EMPTY);

  useEffect(() => {
    if (id) {
      const form = loadFormBySolicitation(props.solicitation);
      if (form) {
        setAnaliseTermica(form);
      }
    }
  }, []);

  interface RowData {
    amostra: number;
    identificacao: string;
    caracteristicas: string;
    massaAmostra: string;
    tecnica: string;
    atmosferaFluxo: string;
    taxaAquecimento: string;
    intervaloTemperatura: string;
  }

  const [rows, setRows] = useState<RowData[]>([]);

  function createData(
    amostra: number,
    identificacao: string,
    caracteristicas: string,
    massaAmostra: string,
    tecnica: string,
    atmosferaFluxo: string,
    taxaAquecimento: string,
    intervaloTemperatura: string) {
    const newData = {
      amostra,
      identificacao,
      caracteristicas,
      massaAmostra,
      tecnica,
      atmosferaFluxo,
      taxaAquecimento,
      intervaloTemperatura
    };
    setRows([...rows, newData]);
  }

  const validationForm = yup.object().shape({
    nomeAluno: yup.string(),
    nomeOrientador: yup.string(),
    descricao: yup.string().required("Informe a descrição"),
  });

  function addInTable(values: {
    amostra: number;
    identificacao: string;
    caracteristicas: string;
    massaAmostra: string;
    tecnica: string;
    atmosferaFluxo: string;
    taxaAquecimento: string;
    intervaloTemperatura: string;
  }) {
    createData(
      values.amostra,
      values.identificacao,
      values.caracteristicas,
      values.massaAmostra,
      values.tecnica,
      values.atmosferaFluxo,
      values.taxaAquecimento,
      values.intervaloTemperatura
    )
  }

  type YourRowType = {
    amostra: number;
    identificacao: string;
    caracteristicas: string;
    massaAmostra: string;
    tecnica: string;
    atmosferaFluxo: string;
    taxaAquecimento: string;
    intervaloTemperatura: string;
  };

  function handleRemoveRow(row: YourRowType) {
    const updatedRows = rows.filter((r) => r !== row);
    setRows(updatedRows);
  }

  async function handleClickForm(values: AnaliseTermica) {
    setIsLoading(true);

    const { amostra, identificacao, caracteristicas, massaAmostra, tecnica, atmosferaFluxo, taxaAquecimento, intervaloTemperatura } = values;
    const fields = { amostra, identificacao, caracteristicas, massaAmostra, tecnica, atmosferaFluxo, taxaAquecimento, intervaloTemperatura };
    const fieldsStr = JSON.stringify(fields);

    const payload = {
      equipment: { id: 3 },
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
      <h1 className={styles.title}>Análise Térmica</h1>
      <div>
        <Formik
          initialValues={analiseTermica}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
          enableReinitialize={true}
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
                    <p>Características físicas</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="caracteristicas"
                        className={styles.form_error}
                      />
                      <Field
                        name="caracteristicas"
                        placeholder=''
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                  <div className={styles.field_box}>
                    <p>Massa de amostra</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="massaAmostra"
                        className={styles.form_error}
                      />
                      <Field
                        name="massaAmostra"
                        placeholder=''
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                  <div className={styles.field_box}>
                    <p>Técnica</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="tecnica"
                        className={styles.form_error}
                      />
                      <Field
                        name="tecnica"
                        placeholder=''
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                  <div className={styles.field_box}>
                    <p>Atmosfera e fluxo gás (mL min-1)</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="atmosferaFluxo"
                        className={styles.form_error}
                      />
                      <Field
                        name="atmosferaFluxo"
                        placeholder=''
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                  <div className={styles.field_box}>
                    <p>Taxa de Aquecimento* (°C min-1)</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="taxaAquecimento"
                        className={styles.form_error}
                      />
                      <Field
                        name="taxaAquecimento"
                        placeholder=''
                        className={styles.input_form}
                      />
                    </div>
                  </div>

                  <div className={styles.field_box}>
                    <p>Intervalo de Temperatura (°C)</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="intervaloTemperatura"
                        className={styles.form_error}
                      />
                      <Field
                        name="intervaloTemperatura"
                        placeholder=''
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
                        <TableCell align="right">Características físicas</TableCell>
                        <TableCell align="right">Massa de amostra</TableCell>
                        <TableCell align="right">Técnica</TableCell>
                        <TableCell align="right">Atmosfera e fluxo gás (mL min-1)</TableCell>
                        <TableCell align="right">Taxa de Aquecimento* (°C min-1)</TableCell>
                        <TableCell align="right">Intervalo de Temperatura (°C)</TableCell>
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
                          <TableCell align="center">{row.caracteristicas}</TableCell>
                          <TableCell align="center">{row.massaAmostra}</TableCell>
                          <TableCell align="center">{row.tecnica}</TableCell>
                          <TableCell align="center">{row.atmosferaFluxo}</TableCell>
                          <TableCell align="center">{row.taxaAquecimento}</TableCell>
                          <TableCell align="right">{row.intervaloTemperatura}</TableCell>
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
              <FormFooter loading={isLoading} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
