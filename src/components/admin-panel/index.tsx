import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { CustomErrorMessage } from '../error-message'
import * as yup from 'yup'
import { CustomButton } from '../custom-button'
import Dropdown from '../dropdown'
import { api } from '@/libs/axiosBase'
import { EditUser } from '@/commons/type'
import { toast } from 'react-hot-toast'
import { Button, Grid, TableSortLabel } from '@mui/material'
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
import { TRANSLATED_ROLES } from '@/commons/roles'

export function AdminPanel() {
  const [open, setOpen] = React.useState(false);

  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [status, setStatus] = useState(true);

  const [orderBy, setOrderBy] = useState("id");
  const [asc, setAsc] = useState(true);

  const listHeader = [
    { label: "Código", value: "id" },
    { label: "Nome", value: "name" },
    { label: "Tipo", value: "role" },
    { label: "E-mail", value: "email" }
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState<EditUser | undefined>();

  useEffect(() => {
    loadData(0)
  }, [status, orderBy, asc]);

  const loadData = (page: number) => {
    UserService.pageStatus(page, rowsPerPage, orderBy, asc, status)
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

  function getUser(selected: EditUser): void | undefined {
    setUser(selected);
    handleClickOpen();
  }

  //mostra a lista de usuários ativos
  //(é o padrão para quando o usuário
  //entrar no painel admin por isso
  //esta função é chamada no useEffect)
  const showActive = () => {
    setStatus(true);
  }

  //mostra a lista de usuários inativos
  const showInactive = () => {
    setStatus(false);
  }

  function updateSelectedUser(selected: EditUser) {
    if (selected != null && selected.id != null) {
      api
        .post(`admin/edit/role/${selected.id}`, selected.role)
        .then((response) => {
          handleClose();
          handleChangePage(null, 0);
        }).catch((responseError) => {
          toast.error('Não é possível editar um usuário inativo.')
        });
    }
  }

  function removeUserSelectedUser(selected: EditUser) {
    api
      .post(`admin/edit/role/${selected.id}`, selected.role)
      .then((response) => {
        window.location.reload()
      })
      .catch((responseError) => {
        toast.error('Não é possível editar um usuário inativo.')
        console.log(responseError)
      })
  }

  /*Remove se o usuário não tiver nenhum vinculo com um projeto
  OU Inativa se o usuário tiver vínculos com um ou mais projetos*/
  function removeOrInactiveSelectedUser(selected: EditUser) {
    if (selected != null && selected.id != null) {
      api.delete('users/' + selected.id)
        .then((response) => {
          handleClose();
          handleChangePage(null, 0);
        });

    }
  }

  function activeSelectedUser(selected: EditUser) {
    if (selected != null && selected.id != null) {
      if (selected)
        api.put('users/activatedUser/' + selected.id).then((response) => {
          handleClose();
          handleChangePage(null, 0);
        })
    }
  }

  const handleRoleChange = (selectedValue: string) => {
    debugger
    let updatedUser = { ...user }
    updatedUser.role = selectedValue
    setUser(updatedUser)
  }

  const [isLoading, setIsLoading] = useState(false)

  const validationForm = yup.object().shape({
    name: yup.string(),
    cargo: yup.string().required('Informe o cargo'),
    email: yup.string()
  })

  async function handleClickForm(values: {
    name: string
    cargo: string
    email: string
    orientador: string
  }) {
    try {
    } catch (error) {
      console.error('error', error)
    }
  }

  const handleSort = (id: any) => {
    setOrderBy(id);
    setAsc(!asc);
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
                      name: '',
                      cargo: '',
                      orientador: '',
                      email: ''
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
                                placeholder=""
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
                                placeholder=""
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
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
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
                    </Grid>
                    <Grid item>
                      <div className={styles.button_box}>
                        <CustomButton
                          onClick={() => removeOrInactiveSelectedUser(user!)}
                          text="INATIVAR"
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
                    </Grid>
                    <Grid item>
                      <div className={styles.button_box}>
                        <CustomButton
                          onClick={() => activeSelectedUser(user!)}
                          text="ATIVAR"
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
                    </Grid>
                    <Grid item>
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
                    </Grid>
                  </Grid>
                </DialogActions>
              </Dialog>
              <h1 className={styles.title}>PAINEL DO ADMINISTRADOR</h1>
            </div>
          </div>
          <div className={styles.button_box}>
            <Button
              color="secondary"
              onClick={() => showInactive()}
              variant="outlined"
              size="large"
              sx={{ mr: 1 }}
            >
              VER INATIVOS
            </Button>

            <Button
              color="secondary"
              onClick={() => showActive()}
              variant="outlined"
              size="large"
            >
              VER ATIVOS
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {listHeader.map((head) => (
                    <StyledTableCell align={head.value==="id" ?"left":"center"} key={head.value}>{head.label}
                      <TableSortLabel active={orderBy === head.value}
                        direction={asc ? 'asc' : 'desc'}
                        onClick={() => handleSort(head.value)}
                      >
                      </TableSortLabel>
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="center">Seleção</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((user: any) => (

                  // todo: precisa ajustar a listagem da role para retornar professor e não ROLE_PROFESSOR
                  <StyledTableRow key={user.id}>
                    <StyledTableCell scope="row">
                      {user.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">{user.name}</StyledTableCell>
                    <StyledTableCell align="center">{TRANSLATED_ROLES[user.role]}</StyledTableCell>
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
