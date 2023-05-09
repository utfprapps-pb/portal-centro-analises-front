import React from 'react'
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

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const validationForm = yup.object().shape({

});

// function addInTable(values: {
//   firstName: string;
//   surname: string;
//   email: string;
//   password: string;
//   birthdayDay: number;
//   birthdayMonth: number;
//   birthdayYear: number;
// }) {
//   try {

//   } catch (error) {
//     console.error("error", error);
//   }
// }

async function handleClickForm(values: {

}) {
  try {

  } catch (error) {
    console.error("error", error);
  }
}

export const FormDrx: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>DRX</h1>
    <div>
      <Formik
        initialValues={{
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
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
                    name="coluna"
                    className={styles.form_error}
                  />
                  <Field
                    name="coluna"
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
                    name="gas"
                    className={styles.form_error}
                  />
                  <Field
                    name="gas"
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
                    name="gas"
                    className={styles.form_error}
                  />
                  <Field
                    name="gas"
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
                    name="gas"
                    className={styles.form_error}
                  />
                  <Field
                    name="gas"
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
                    name="gas"
                    className={styles.form_error}
                  />
                  <Field
                    name="gas"
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
                    name="gas"
                    className={styles.form_error}
                  />
                  <Field
                    name="gas"
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
                    name="gas"
                    className={styles.form_error}
                  />
                  <Field
                    name="gas"
                    placeholder='Somente step'
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className='button_box'>
                <button>
					        <Add style={{ color: '#3f51b5' }} />
                </button>
              </div>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>  
        </Form>
      </Formik>
    </div>
  </div>
)
