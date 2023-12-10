import { useEffect, useState } from "react";

import EditIcon from "@material-ui/icons/Edit";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TableCell from "@material-ui/core/TableCell";

import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import { TableFooter, TablePagination, TableSortLabel } from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import TechnicalReportService from "@/services/api/technical-report/TechnicalReportService";
import { TechnicalReport } from "../model/technical-report";

export function TechnicalReportList() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const rowsPerPage = 10;
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);

    const [orderBy, setOrderBy] = useState("id");
    const [asc, setAsc] = useState(true);

    const listHeader = [
        { label: "Código", value: "id" },
        { label: "Nome", value: "name" },
        { label: "Preço", value: "price" }
    ];

    useEffect(() => {
        loadData(0);
    }, [orderBy, asc]);

    const loadData = (page: number) => {
        TechnicalReportService.page(page, rowsPerPage, orderBy, asc)
            .then((response) => {
                setTotal(response.data.totalElements);
                setPages(response.data.totalPages);
                setData(response.data.content);
                setApiError("");
            })
            .catch((error) => {
                setApiError("Falha ao carregar a lista de resultados");
            });

    };

    const onEdit = (url: string) => {
        navigate(url);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
        loadData(newPage);
    };

    const handleSort = (id: any) => {
        setOrderBy(id);
        setAsc(!asc);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {listHeader.map((head) => (
                                <TableCell key={head.value}>{head.label}
                                    <TableSortLabel active={orderBy === head.value}
                                        direction={asc ? 'asc' : 'desc'}
                                        onClick={() => handleSort(head.value)}
                                    >
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row: TechnicalReport) => (
                            <TableRow
                                key={row.description}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        aria-label="edit"
                                        onClick={() => {
                                            onEdit(`/resultado/${row.id}`);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                                colSpan={3}
                                count={total}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOptions={[10]}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        "aria-label": "rows per page",
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}
