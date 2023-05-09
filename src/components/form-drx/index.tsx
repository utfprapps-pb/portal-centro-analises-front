import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import * as S from './styles';
import { Button, CustomErrorMessage } from '@/components';
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
  <S.Container>
    <h1 className='title'>DRX</h1>
    <div>
      <Formik
        initialValues={{
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
            <h3>METODOLOGIA DE ANÁLISE</h3>
            <div className='row_box'>
              <div className='field_box'>
                <p>Nº Amostra</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="coluna"
                    className='form_error'
                  />
                  <Field
                    name="coluna"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Identificação</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="gas"
                    className='form_error'
                  />
                  <Field
                    name="gas"
                    placeholder=''
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Modo de análise</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="gas"
                    className='form_error'
                  />
                  <Field
                    name="gas"
                    placeholder='Step/Contínuo'
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Faixa de Varredura</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="gas"
                    className='form_error'
                  />
                  <Field
                    name="gas"
                    placeholder='10º -70º'
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Velocidade de Varredura</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="gas"
                    className='form_error'
                  />
                  <Field
                    name="gas"
                    placeholder='º/min'
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Step</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="gas"
                    className='form_error'
                  />
                  <Field
                    name="gas"
                    placeholder='0,02 ou 0,05'
                    className='input_form'
                  />
                </div>
              </div>
              <div className='field_box'>
                <p>Tempo do passo</p>
                <div className='input_box'>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="gas"
                    className='form_error'
                  />
                  <Field
                    name="gas"
                    placeholder='Somente step'
                    className='input_form'
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
