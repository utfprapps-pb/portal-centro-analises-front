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
import AprovacoesService from '@/services/api/aprovacoes/AprovacoesService'
import { StyledTableCell } from '@/layouts/StyldeTableCell'
import { StyledTableRow } from '@/layouts/StyledTableRow'
import { AprovacoesParams, SolicitationResponse } from '@/services/api/aprovacoes/aprovacoes.type'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'

export const AprovacaoSolicitacaoPanel = () => {
    const navigate = useNavigate()
    const [dataSolicitation, setDataSolicitation] = useState<AprovacoesParams[]>([])
    const [apiError, setApiError] = useState('')

    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);

    const [orderBy, setOrderBy] = useState("id");
    const [asc, setAsc] = useState(true);

    const listHeader = [
        { label: "Formulário", value: "equipment.form" },
        { label: "Descrição", value: "description" },
        { label: "Solicitante", value: "createdBy.name" }
    ];

    var t: any = localStorage.getItem("user");
    var infoArray = JSON.parse(t);
    var userId = infoArray.id.toString();

    const loadData = (page: number) => {
        AprovacoesService.pageSolicitationPending(page, rowsPerPage, orderBy, asc)
            .then((response: any) => {
                setDataSolicitation(response.data.content)
                setTotal(response.data.totalElements);
                setPages(response.data.totalPages);
                setApiError('')
            })
            .catch((responseError: any) => {
                setApiError('Falha ao carregar lista de solicitações pendentes.')
                toast.error(apiError)
                // eslint-disable-next-line no-console
            })
    }

    useEffect(() => {
        loadData(0);
    }, [orderBy, asc])

    const approveSolicitation = (id: number, status: string) => {
        let response: SolicitationResponse = {
            id: id,
            status: status,
            reason: ""
          };
        
        AprovacoesService.response(response)
            .then((response) => {
                toast.success("Aprovado com sucesso!")
                setApiError('')
                handleChangePage(null, 0);
            })
            .catch((responseError) => {
                setApiError('Falha ao aprovar.')
                toast.error(apiError)
                console.log(responseError)
            })
    }

    const rejectSolicitation = (id: number, reason: string) => {
        let response: SolicitationResponse = {
            id: id,
            status: 'REFUSED',
            reason: reason
          };

        AprovacoesService.response(response)
        .then((response) => {
            toast.success("Rejeitado!")
            setApiError('')
            handleChangePage(null, 0);
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
                <h1 className={styles.title}>APROVAÇÕES DE SOLICITAÇÃO</h1>
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
                                <StyledTableCell align="center">Abrir formulário</StyledTableCell>
                                {listHeader.map((head) => (
                                    <StyledTableCell align="center" key={head.value}>{head.label}
                                    <TableSortLabel active={orderBy === head.value}
                                        direction={asc ? 'asc' : 'desc'}
                                        onClick={() => handleSort(head.value)}
                                    >
                                    </TableSortLabel>
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell align="right">Aprovar/Reprovar</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataSolicitation.map((p) => (
                                <StyledTableRow key={p.id}>
                                    <StyledTableCell scope="row">
                                        {p.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" className={styles.icon_open}>
                                        <IconButton aria-label="approve" color="info">
                                            <OpenInBrowser onClick={() => navigate(`/aprovacoes/view/${p.id!}`)} />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{p.equipment.form}</StyledTableCell>
                                    <StyledTableCell align="right">{p.description}</StyledTableCell>
                                    <StyledTableCell align="right">{p.createdBy.name}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton aria-label="approve" color="success">
                                            <ThumbUp onClick={() => approveSolicitation(p.id!, p.status == 'PENDING_ADVISOR' ? 'PENDING_LAB' : 'PENDING_SAMPLE')} />
                                        </IconButton>
                                        <IconButton aria-label="reject" color="error">
                                            <ThumbDown onClick={() => rejectSolicitation(p.id!, '')} />
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
            </div>
        </>
    )
}
