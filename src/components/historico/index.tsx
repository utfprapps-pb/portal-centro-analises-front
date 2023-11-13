import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { CustomStatus, DownloadFile } from '@/components'
import { SolicitationAudit } from "@/commons/type";
import { ArrowUpward, ArrowDownward } from '@material-ui/icons'
import { Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import HistoryService from '../../services/api/history/HistoryService';

export function Historico() {
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [selectedSolicitation, setSelectedSolicitation] = useState();

  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const [apiError, setApiError] = useState('')
  const rowsPerPage = 10;
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const [orderBy, setOrderBy] = useState("id");
  const [asc, setAsc] = useState(false);

  const [historyItens, setHistoryItens] = useState([]);

  const listHeader = [
    { label: "Situação", value: "newStatus" },
    { label: "Data", value: "changeDate" },
    { label: "Equipamento", value: "solicitation.equipment.name" },
    { label: "Valor", value: "solicitation.value" },
    { label: "Criado por", value: "solicitation.createdBy.name" },
    { label: "Descrição", value: "h.solicitation.project.description}" }
  ];

  function toggleDropdown(id: any, solId: any, newStatus: any) {
    setSelectedSolicitation(id);
    setMostrarDropdown(!mostrarDropdown);
    if (!mostrarDropdown) {
      HistoryService.historyByIdAndNotStatus(solId, newStatus)
        .then((res) => {
          setHistoryItens(res.data);
        });
    }else{
      setHistoryItens([]);
    }
  }

  function getFile() {
    console.log("get-file");
  }

  useEffect(() => {
    loadData(0);
  }, [orderBy, asc]);

  const loadData = (page: number) => {
    HistoryService.page(page, rowsPerPage, orderBy, asc)
      .then((response) => {
        setTotal(response.data.totalElements)
        setPages(response.data.totalPages);
        setData(response.data.content)
        setApiError('')
      })
      .catch((error) => {
        setApiError('Falha ao carregar o histórico')
      });
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    loadData(newPage)
  };

  const handleSort = (id: any) => {
    if(id !== "id" && id === orderBy && asc === false){
      setOrderBy("id");
    }else{
      setOrderBy(id);
      setAsc(!asc);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {listHeader.map((head) => (
                  <TableCell align="center" key={head.value}>{head.label}
                    <TableSortLabel active={orderBy === head.value}
                      direction={asc ? 'asc' : 'desc'}
                      onClick={() => handleSort(head.value)}
                    >
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="center">Ações</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((h: SolicitationAudit) => (
                <><TableRow key={h.id}>
                  <TableCell scope="row"><CustomStatus
                    text={h.newStatus == 'PENDING_ADVISOR' ? 'Aguardando Confirmação' :
                          h.newStatus == 'PENDING_LAB' ? 'Aguardando Laboratório' :
                          h.newStatus == 'PENDING_SAMPLE' ? 'Aguardando Amostra' :
                          h.newStatus == 'APPROVED' ? 'Aguardando Análise' :
                          h.newStatus == 'PENDING_PAYMENT' ? 'Aguardando Pagamento' :
                          h.newStatus == 'REFUSED' ? 'Recusado' :
                          h.newStatus == 'FINISHED' ? 'Concluído' :
                                  '#000000'}
                    padding="0.5rem"
                    textColor="white"
                    backgroundColor={h.newStatus == 'FINISHED' ? '#00d400' :
                                    h.newStatus == 'PENDING_LAB' ? '#ff5e00' :
                                    h.newStatus == 'PENDING_ADVISOR' ? '#d49f00' :
                                    h.newStatus == 'PENDING_SAMPLE' ? '#d49f00' :
                                    h.newStatus == 'PENDING_PAYMENT' ? '#d49f00' :
                                    h.newStatus == 'APPROVED' ? '#d49f00' :
                                '#000000'}
                    width="160px"
                    letterSpacing="0px"
                    fontSize="12px"
                    fontWeight="300" /></TableCell>
                  <TableCell scope="row">{(new Date(h.changeDate)).toLocaleString('en-GB', { timeZone: 'UTC' })}</TableCell>
                  <TableCell scope="row">{h.solicitation.equipment?.name}</TableCell>
                  <TableCell scope="row">{h.solicitation.value}</TableCell>
                  <TableCell scope="row">{h.solicitation.createdBy?.name}</TableCell>
                  <TableCell scope="row">{h.solicitation.project?.description}</TableCell>
                  <TableCell scope="row"> {h.newStatus == 'FINISHED' &&
                    <DownloadFile
                      url={h.solicitation.fileUrl}
                      type="submit"
                      onClick={getFile} />}</TableCell>

                  <TableCell scope="row">
                    <button key={h.id} onClick={() => toggleDropdown(h.id, h.solicitation.id, h.newStatus)}>
                      {(mostrarDropdown && (selectedSolicitation === h.id)) ? <IconButton aria-label="approve" color="info"><ArrowUpward /></IconButton> : <IconButton aria-label="approve" color="info"><ArrowDownward /></IconButton>}
                    </button>
                  </TableCell>
                </TableRow>
                  <TableRow style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                      <Collapse in={(mostrarDropdown && (selectedSolicitation === h.id))} timeout="auto" unmountOnExit>
                        <Table>
                          <TableBody>
                            {historyItens?.map((i: SolicitationAudit) => (
                              <TableRow key={i.id}>
                                <TableCell scope="row">
                                  <CustomStatus
                                    text={i.newStatus == 'PENDING_ADVISOR' ? 'Aguardando Confirmação' :
                                              i.newStatus == 'PENDING_LAB' ? 'Aguardando Laboratório' :
                                              i.newStatus == 'PENDING_SAMPLE' ? 'Aguardando Amostra' :
                                              i.newStatus == 'APPROVED' ? 'Aguardando Análise' :
                                              i.newStatus == 'PENDING_PAYMENT' ? 'Aguardando Pagamento' :
                                              i.newStatus == 'REFUSED' ? 'Recusado' :
                                                i.newStatus == 'FINISHED' ? 'Concluído' :
                                                  '#000000'}
                                    padding="0.5rem"
                                    textColor="white"
                                    backgroundColor={i.newStatus == 'FINISHED' ? '#00d400' :
                                                    i.newStatus == 'PENDING_LAB' ? '#ff5e00' :
                                                    i.newStatus == 'PENDING_ADVISOR' ? '#d49f00' :
                                                    i.newStatus == 'PENDING_SAMPLE' ? '#d49f00' :
                                                    i.newStatus == 'PENDING_PAYMENT' ? '#d49f00' :
                                                    i.newStatus == 'APPROVED' ? '#d49f00' :
                                                '#000000'}
                                    width="160px"
                                    letterSpacing="0px"
                                    fontSize="12px"
                                    fontWeight="300" />
                                </TableCell>
                                <TableCell scope="row">{(new Date(i.changeDate)).toLocaleString('en-GB', { timeZone: 'UTC' })}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow></>
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
