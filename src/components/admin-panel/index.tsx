import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { CustomErrorMessage } from '../error-message'
import * as yup from "yup";
import { CustomButton } from '../custom-button';
import Dropdown from '../dropdown';
import { api } from '@/libs/axiosBase';
import { EditUser } from '@/commons/type';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper, TableFooter, TablePagination } from '@mui/material';

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { StyledTableCell } from '@/layouts/StyldeTableCell'
import { StyledTableRow } from '@/layouts/StyledTableRow'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import UserService from '@/services/api/user/UserService';

export function AdminPanel() {

  const [activePage, setActivePage] = useState(0);

  const [open, setOpen] = React.useState(false);

  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState<EditUser | undefined>();

  useEffect(() => {
    loadData(0)
  }, []);

  const loadData = (page: number) => {
    UserService.page(page, rowsPerPage, "id", true)
      .then((response) => {
        setData(response.data.content);
        setTotal(response.data.totalElements);
        setPages(response.data.totalPages);
      })
      .catch((responseError: any) => {
      })
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    loadData(newPage)
  };

  const changePage = (index: number) => {
    setActivePage(index);
  }

  function getUser(selected: EditUser): void | undefined {
    setUser(selected);
    handleClickOpen();
  }

  function updateSelectedUser(selected: EditUser) {
    if (selected != null && selected.id != null) {
      api.post(`admin/edit/role/${selected.id}`, selected.role).then((response) => {
        handleClose();
        handleChangePage(null, 0);
      });
    }
  }

  function removeUserSelectedUser(selected: EditUser) {
    if (selected != null && selected.id != null) {
      api.delete('users/' + selected.id)
        .then((response) => {
          handleClose();
          handleChangePage(null, 0);
        });

    }
  }

  const handleRoleChange = (selectedValue: string) => {
    let updatedUser = { ...user };
    updatedUser.role = selectedValue;
    setUser(updatedUser);
  };

  const [isLoading, setIsLoading] = useState(false);

  const validationForm = yup.object().shape({
    name: yup.string(),
    cargo: yup.string().required("Informe o cargo"),
    email: yup.string(),
  });

  async function handleClickForm(values: {
    name: string;
    cargo: string;
    email: string;
    orientador: string;
  }) {
    try {
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className={styles.inputs_box}>
            <div className={styles.container}>
              <Dialog open={open} onClose={handleClose} style={{ overflowY: 'visible' }}
                PaperProps={{
                  sx: {
                    width: "50%",
                    minHeight: 400
                  }
                }}
              >
                <DialogTitle>Usuário</DialogTitle>
                <DialogContent style={{ overflowY: 'visible' }}>
                  <Formik
                    initialValues={{
                      name: "",
                      cargo: "",
                      orientador: "",
                      email: ""
                    }}
                    onSubmit={handleClickForm}
                    validationSchema={validationForm}
                  >
                    <Form className={styles.inputs_container}>
                      <div className={styles.inputs_box}>
                        <div className={styles.row_box}>
                          <div className={styles.field_box}>
                            <p>Nome</p>
                            <div className={styles.input_box}>
                              <ErrorMessage
                                component={CustomErrorMessage}
                                name="nome"
                                className={styles.form_error} />
                              <Field
                                name="nome"
                                disabled
                                value={user?.name ?? ''}
                                placeholder=''
                                className={styles.input_form} />
                            </div>
                          </div>
                          <div className={styles.field_box}>
                            <p>Email</p>
                            <div className={styles.input_box}>
                              <ErrorMessage
                                component={CustomErrorMessage}
                                name="email"
                                className={styles.form_error} />
                              <Field
                                name="email"
                                disabled
                                value={user?.email ?? ''}
                                placeholder=''
                                className={styles.input_form} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.row_box}>
                          <div className={styles.field_box}>
                            <div className={styles.field_box}>
                              <p>Cargo</p>
                              <Dropdown value={user?.role || ''} onChange={handleRoleChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </DialogContent>
                <DialogActions>
                  <div className={styles.button_box}>
                    <CustomButton
                      onClick={() => handleClose()}
                      text="Cancelar"
                      padding="1rem"
                      textColor="white"
                      backgroundColor="#676767"
                      textColorHover="white"
                      backgroundColorHover="#9f9f9f"
                      letterSpacing="4px"
                      fontSize="16px"
                      fontWeight="400"
                      type="submit" />
                  </div>
                  <div className={styles.button_box}>
                    <CustomButton
                      onClick={() => removeUserSelectedUser(user!)}
                      text="REMOVER"
                      padding="1rem"
                      textColor="white"
                      backgroundColor="#cc0000"
                      textColorHover="white"
                      backgroundColorHover="#ff4444"
                      letterSpacing="4px"
                      fontSize="16px"
                      fontWeight="400"
                      type="submit" />
                  </div>
                  <div className={styles.button_box}>
                    <CustomButton
                      onClick={() => updateSelectedUser(user!)}
                      text="ATUALIZAR"
                      padding="1rem"
                      textColor="white"
                      backgroundColor="#006dac"
                      textColorHover="white"
                      backgroundColorHover="#00bbff"
                      letterSpacing="4px"
                      fontSize="16px"
                      fontWeight="400"
                      type="submit" />
                  </div>
                </DialogActions>
              </Dialog>
              <h1 className={styles.title}>PAINEL DO ADMINISTRADOR</h1>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="center">Nome</StyledTableCell>
                  <StyledTableCell align="center">Tipo</StyledTableCell>
                  <StyledTableCell align="center">E-mail</StyledTableCell>
                  <StyledTableCell align="center">Seleção</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((user: any) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell scope="row">
                      {user.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">{user.name}</StyledTableCell>
                    <StyledTableCell align="center">{user.role}</StyledTableCell>
                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                    <StyledTableCell align="center">
                      <CustomButton
                        onClick={() => getUser(user)}
                        text="Selecionar"
                        padding="0.5rem"
                        textColor="white"
                        backgroundColor="#006dac"
                        textColorHover="white"
                        backgroundColorHover="#00bbff"
                        letterSpacing="4px"
                        fontSize="12px"
                        fontWeight="200"
                        type="submit"
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    colSpan={5}
                    count={total}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[10]}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions} />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}
