import React, { useEffect, useState } from 'react'

import { DeleteRounded, EditRounded } from '@material-ui/icons'
import { Button, Grid, IconButton, TableFooter, TablePagination, TableSortLabel } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'
import { ProjectParams } from '../../services/api/project/project.type'
import ProjectService from '@/services/api/project/ProjectService'
import { StyledTableCell } from '@/layouts/StyldeTableCell'
import { StyledTableRow } from '@/layouts/StyledTableRow'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'

export const ProjectPage = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<ProjectParams[]>([])
  const [apiError, setApiError] = useState('')

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const [orderBy, setOrderBy] = useState("id");
  const [asc, setAsc] = useState(true);

  const listHeader = [
    { label: "#", value: "id" },
    { label: "Título", value: "subject" },
    { label: "Descrição", value: "description" }
  ];

  const loadData = (page: number) => {
    ProjectService.page(page, rowsPerPage, orderBy, asc)
      .then((response) => {
        setData(response.data.content);
        setTotal(response.data.totalElements);
        setPages(response.data.totalPages);
        setApiError('')
      })
      .catch((responseError: any) => {
        setApiError('Falha ao carregar lista de projetos.')
        toast.error(apiError)
        // eslint-disable-next-line no-console
      })
  }

  useEffect(() => {
    loadData(0)
  }, [orderBy, asc]);

  const removeProject = (id: number) => {
    ProjectService.remove(id)
      .then((response) => {
        toast.success("Removido com sucesso")
        setApiError('')
        handleChangePage(null, 0)
      })
      .catch((responseError) => {
        setApiError('Falha ao remover projeto.')
        toast.error(apiError)
        console.log(responseError)
      })
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    loadData(newPage)
  };

  
  const handleSort = (id: any) => {
    setOrderBy(id);
    setAsc(!asc);
  }
  
  return (
    <>
      <Grid container justifyContent="flex-end">
        <Button
          variant="outlined"
          sx={{ m: 1 }}
          className={styles.buttoncolor}
          onClick={() => navigate('/projeto/form')}
        >
          Inserir
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
            {listHeader.map((head) => (
                <StyledTableCell key={head.value} align="center">{head.label}
                <TableSortLabel active={orderBy === head.value}
                    direction={asc ? 'asc' : 'desc'}
                    onClick={() => handleSort(head.value)}
                  >
                </TableSortLabel>
              </StyledTableCell>
              ))}
              <StyledTableCell align="right">Estudantes</StyledTableCell>
              <StyledTableCell align="right">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((p) => (
              <StyledTableRow key={p.id}>
                <StyledTableCell scope="row" align="center">
                  {p.id}
                </StyledTableCell>
                <StyledTableCell align="center">{p.subject}</StyledTableCell>
                <StyledTableCell align="center">{p.description}</StyledTableCell>
                <StyledTableCell align="right">
                  {p.students.length}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton aria-label="delete" color="error">
                    <DeleteRounded onClick={() => removeProject(p.id!)} />
                  </IconButton>
                  <IconButton aria-label="delete" color="info">
                    <EditRounded onClick={() => navigate(`/projeto/form/${p.id!}`)} />
                  </IconButton>
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
  )
}
