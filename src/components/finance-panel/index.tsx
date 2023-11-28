import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from "formik";
import { CustomErrorMessage } from "../error-message";
import * as yup from "yup";
import { CustomButton } from "../custom-button";
import { api } from "@/libs/axiosBase";
import { EditFinance, EditUser, User } from "@/commons/type";
import DropdownMov from "../dropdownmov";
import { useSubmit } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper, TableFooter, TablePagination, TableSortLabel } from '@mui/material';

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { StyledTableCell } from '@/layouts/StyldeTableCell'
import { StyledTableRow } from '@/layouts/StyledTableRow'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import UserService from '@/services/api/user/UserService';
import FinanceService from '@/services/api/finance/financeservice';

export const FinancePanel: React.FC = () => {
  const [activePage, setActivePage] = useState(0);
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<User>();
  const [finance, setFinance] = useState<EditFinance>();

  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const [orderBy, setOrderBy] = useState("id");
  const [asc, setAsc] = useState(true);

  const listHeader = [
    { label: "Código", value: "id" },
    { label: "Nome", value: "name" },
    { label: "Tipo", value: "role" },
    { label: "E-mail", value: "email" }
  ];

  useEffect(() => {
    loadData(0)
  }, [orderBy, asc]);

  const loadData = (page: number) => {
    UserService.pageRole(page, rowsPerPage, orderBy, asc, 'ROLE_PROFESSOR')
      .then((response) => {
        setData(response.data.content);
        setTotal(response.data.totalElements);
        setPages(response.data.totalPages);
      })
      .catch((responseError: any) => {
      })
  }

  const changePage = (index: number) => {
    setActivePage(index);
  };

  function getUser(selected: User): void | undefined {
    setUser(selected);
    handleClickOpen();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    loadData(newPage)
  };

  const handleValue = (value: any) => {
    let updatedFinance = { ...finance };
    updatedFinance.value = value;
  };

  const handleDesc = (desc: string) => {
    let updatedFinance = { ...finance };
    updatedFinance.description = desc;
  };

  const handleTypeChange = (selectedValue: number) => {
    setFinance((financeInformation) => {
      if (financeInformation && user) {
        return {
          ...financeInformation,
          type: selectedValue,
          user: user,
        };
      }

      return financeInformation;
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const validationForm = yup.object().shape({
    nome: yup.string(),
  });

  const handleClickForm = (values: any) => {
    const { nome, type, valor, description } = values;

    let updatedFinance = { ...finance };
    updatedFinance.user = {
      id: user!.id,
      displayName: "",
      email: "",
      password: "",
      role: "",
    };

    updatedFinance.type = type;
    updatedFinance.description = description;
    updatedFinance.value = valor;

    if (updatedFinance && updatedFinance.user
      && updatedFinance.type != null && updatedFinance.value) {
      FinanceService.save({
        "value": updatedFinance.value,
        "user": {
          "id": updatedFinance.user.id
        },
        "type": updatedFinance.type,
        "description": updatedFinance.description
      }).then((response) => {
        handleClose();
        handleChangePage(null, 0)
      });
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
              <Dialog open={open} onClose={handleClose} style={{ overflowY: 'visible' }}>
                <DialogTitle>Movimentação</DialogTitle>
                <DialogContent style={{ overflowY: 'visible' }}>
                  <Formik
                    initialValues={{
                      nome: "",
                      type: 0,
                      valor: "",
                      description: "",
                    }}
                    onSubmit={handleClickForm}
                    validationSchema={validationForm}
                  >
                    <Form className={styles.inputs_container}>
                      <div className={styles.inputs_box}>
                        <div className={styles.row_box}>
                          <div className={styles.field_box}>
                            <div className={styles.field_box}>
                              <p>Movimentação</p>
                              <DropdownMov nome={"nome"} value={0} onChange={handleTypeChange} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.row_box}>
                          <div className={styles.field_box}>
                            <p>Valor</p>
                            <div className={styles.input_box}>
                              <ErrorMessage
                                component={CustomErrorMessage}
                                name="valor"
                                className={styles.form_error} />
                              <Field
                                name="valor"
                                placeholder=''
                                className={styles.input_form} />
                            </div>
                          </div>

                          <div className={styles.field_box}>
                            <p>Descrição</p>
                            <div className={styles.input_box}>
                              <ErrorMessage
                                component={CustomErrorMessage}
                                name="description"
                                className={styles.form_error} />
                              <Field
                                name="description"
                                placeholder=''
                                className={styles.input_form} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.row_box}>
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
                              text="CONFIRMAR"
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
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </DialogContent>
              </Dialog>
              <h1 className={styles.title}>PAINEL FINANCEIRO</h1>
            </div>
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
  );
};
