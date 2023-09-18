import React, { useEffect, useState } from 'react'
import { ThumbUp, ThumbDown, OpenInBrowser } from '@material-ui/icons'
import { IconButton, TableFooter, TablePagination, TableSortLabel } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { StyledTableCell } from '@/layouts/StyldeTableCell'
import { StyledTableRow } from '@/layouts/StyledTableRow'
import { VinculoParams } from '@/services/api/aprovacoes/aprovacoes.type'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import StudentProfessorLinkService from '@/services/api/studentProfessorLink/StudentProfessorLinkService'

export const AprovacaoVinculoPanel = () => {
    const navigate = useNavigate()
    const [dataVinculo, setDataVinculo] = useState<VinculoParams[]>([])
    const [apiError, setApiError] = useState('')

    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);

    const [orderBy, setOrderBy] = useState("id");
    const [asc, setAsc] = useState(true);

    var t: any = localStorage.getItem("user");
    var infoArray = JSON.parse(t);
    var userId = infoArray.id.toString();

    const loadData = (page: number) => {
        StudentProfessorLinkService.pageVinculoPending(page, rowsPerPage, orderBy, asc, userId)
            .then((response: any) => {
                setDataVinculo(response.data.content);
                setTotal(response.data.totalElements);
                setPages(response.data.totalPages);
                setApiError('')
            })
            .catch((responseError: any) => {
                setApiError('Falha ao carregar lista de vínculos pendentes.')
                toast.error(apiError)
                // eslint-disable-next-line no-console
            })


    }

    useEffect(() => {
        loadData(0);
    }, [orderBy, asc])

    const approveVinculo = (id: number, student: object, teacher: object) => {
        const payload = {
            id: id,
            student: student,
            teacher: teacher,
            aproved: true
        }
        StudentProfessorLinkService.approveVinculo(payload)
            .then((response) => {
                toast.success("Aprovado com sucesso!")
                setApiError('')
                handleChangePage(null, 0)
            })
            .catch((responseError) => {
                setApiError('Falha ao aprovar.')
                toast.error(apiError)
                console.log(responseError)
            })
    }

    const rejectVinculo = (id: number) => {
        StudentProfessorLinkService.rejectVinculo(id)
            .then((response) => {
                toast.success("Rejeitado!")
                setApiError('')
                handleChangePage(null, 0)
            })
            .catch((responseError) => {
                setApiError('Falha ao rejeitar.')
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
            <div className={styles.container}>
                <h1 className={styles.title}>APROVAÇÕES DE VÍNCULO</h1>
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell key={"id"}>#
                                        <TableSortLabel active={orderBy === "id"}
                                            direction={asc ? 'asc' : 'desc'}
                                            onClick={() => handleSort("id")}
                                        >
                                        </TableSortLabel>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">Aluno</StyledTableCell>
                                    <StyledTableCell align="right">Aprovar/Reprovar</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataVinculo.filter((v) => v.aproved === null).map((v) => (
                                    <StyledTableRow key={v.id}>
                                        <StyledTableCell scope="row">
                                            {v.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{v.student.name}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <IconButton aria-label="approve" color="success">
                                                <ThumbUp onClick={() => approveVinculo(v.id!, v.student, v.teacher)} />
                                            </IconButton>
                                            <IconButton aria-label="reject" color="error">
                                                <ThumbDown onClick={() => rejectVinculo(v.id!)} />
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
            </div>
        </>
    )
}


