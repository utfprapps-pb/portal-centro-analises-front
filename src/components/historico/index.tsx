import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "@/contexts";
import styles from './styles.module.scss'
import { CustomStatus, DownloadFile } from '@/components'
import { SolicitationAudit } from "@/commons/type";
import { ArrowUpward, ArrowDownward, Check } from '@material-ui/icons'
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Tooltip } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import HistoryService from '../../services/api/history/HistoryService';
import SolicitacaoService from '@/services/api/solicitacao/SolicitacaoService';
import toast from 'react-hot-toast';
import { SOLICITATION_STATUS, SOLICITATION_STATUS_OPTIONS } from '@/commons/solicitationStatus';
import { Field, Form, Formik } from 'formik';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { ROLES } from '@/commons/roles';

export function Historico() {
  const { authenticatedUser } = useContext(AuthContext);

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

  const [dataAgendamento, setDataAgendamento] = useState(dayjs(new Date().toString()));
  const [valor, setValor] = useState(0);

  const selectOptions = SOLICITATION_STATUS_OPTIONS;
  const statusSolicitation = SOLICITATION_STATUS;

  const [open, setOpen] = React.useState(false);

  const [status, setStatus] = useState(statusSolicitation.PENDING_ADVISOR);
  const [auditId, setAuditId] = useState<number>(0);


  const formataStatus = (valor: string) => {
    return selectOptions.find(item => item.value === valor)?.label;
  }

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
    } else {
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
    if (id !== "id" && id === orderBy && asc === false) {
      setOrderBy("id");
    } else {
      setOrderBy(id);
      setAsc(!asc);
    }
  }

  const handleClickOpen = (h: SolicitationAudit) => {
    setAuditId(h?.solicitation?.id ? h?.solicitation?.id : 0);
    setStatus(h?.newStatus ? h?.newStatus : SOLICITATION_STATUS.PENDING_ADVISOR);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStatus(SOLICITATION_STATUS.PENDING_ADVISOR);
    setAuditId(0);
    setValor(0);
  };

  const handleChangeDataAgendameto = (event:any) => {
    setDataAgendamento(event)
  }

  const handleSelectChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event?.target?.value);
  }

  const handleChangeStatus = () => {
      let id = auditId;
      SolicitacaoService.atualizarStatus(
      { 
        id,
        status: status,
        data: dataAgendamento.toDate()
      })
       .then((response) => {
         toast.success("Status atualizado com sucesso!")
         handleChangePage(null, 0);
         handleClose();
       })
       .catch((responseError) => {
         toast.error("Falha ao atualizar!")
         handleClose();
       })
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
                          h.newStatus == 'PENDING_CORRECTION' ? 'Aguardando Correção' : '#000000'}
                    padding="0.5rem"
                    textColor="white"
                    backgroundColor={h.newStatus == 'FINISHED' ? '#00d400' :
                                    h.newStatus == 'PENDING_LAB' ? '#ff5e00' :
                                    h.newStatus == 'PENDING_ADVISOR' ? '#d49f00' :
                                    h.newStatus == 'PENDING_SAMPLE' ? '#d49f00' :
                                    h.newStatus == 'PENDING_PAYMENT' ? '#d49f00' :
                                    h.newStatus == 'APPROVED' ? '#d49f00' :
                                    h.newStatus == 'PENDING_CORRECTION' ? '#e93946' :
                                    '#000000'}
                    width="160px"
                    letterSpacing="0px"
                    fontSize="12px"
                    fontWeight="300" /></TableCell>
                  <TableCell scope="row">{(new Date(h.changeDate)).toLocaleString('en-GB', { timeZone: 'UTC' })}</TableCell>
                  <TableCell scope="row">{h?.solicitation?.equipment?.name}</TableCell>
                  <TableCell scope="row">{h?.solicitation?.value}</TableCell>
                  <TableCell scope="row">{h?.solicitation?.createdBy?.name}</TableCell>
                  <TableCell scope="row">{h?.solicitation?.project?.description}</TableCell>
                  <TableCell scope="row">
                    {h.newStatus === 'FINISHED' && //h?.solicitation?.fileUrl &&
                    <DownloadFile
                      //url={h?.solicitation?.fileUrl}
                      url={'teste'}
                      type="submit"
                      onClick={getFile} />}
                    <IconButton onClick={() => toggleDropdown(h?.id, h?.solicitation?.id, h?.newStatus)} aria-label="Histórico" color="info"> {(mostrarDropdown && (selectedSolicitation === h.id)) ? <ArrowUpward /> : <ArrowDownward />}</IconButton>
                    {authenticatedUser &&
                      authenticatedUser.role === ROLES.Admin &&
                      (
                        h.newStatus === 'PENDING_SAMPLE' ||
                        h.newStatus === 'APPROVED' ||
                        h.newStatus === 'PENDING_PAYMENT' ||
                        h.newStatus === 'REFUSED' ||
                        h.newStatus === 'PENDING_CORRECTION'
                      ) &&
                      <Tooltip title="Próximo status" placement="left">
                        <IconButton onClick={() => handleClickOpen(h)
                        } aria-label="Próximo status" color="success"><Check></Check></IconButton>
                      </Tooltip>
                    }
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
                                          i.newStatus == 'PENDING_CORRECTION' ? 'Aguardando Correção' : '#000000'}
                                    padding="0.5rem"
                                    textColor="white"
                                    backgroundColor={i.newStatus == 'FINISHED' ? '#00d400' :
                                                     i.newStatus == 'PENDING_LAB' ? '#ff5e00' :
                                                     i.newStatus == 'PENDING_ADVISOR' ? '#d49f00' :
                                                     i.newStatus == 'PENDING_SAMPLE' ? '#d49f00' :
                                                     i.newStatus == 'PENDING_PAYMENT' ? '#d49f00' :
                                                     i.newStatus == 'APPROVED' ? '#d49f00' :
                                                     i.newStatus == 'PENDING_CORRECTION' ? '#e93946' :
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
        <Dialog open={open} onClose={handleClose} style={{ overflowY: 'visible' }}
          PaperProps={{
            sx: {
              width: "50%",
              minHeight: 400
            }
          }}
        >
          <DialogTitle>Deseja mesmo alterar o status do registro?</DialogTitle>
          <DialogContent style={{ overflowY: 'visible' }}>
            <Formik
              initialValues={{situacao:status, valor:valor}}
              onSubmit={() => { }}
              enableReinitialize={true}
            >
              {({ errors, touched }) => (
                <Form className={styles.form}>
                  <div className={styles.inputs}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="situacao">Situação</InputLabel>
                      <Select
                        autoFocus
                        value={status}
                        onChange={handleSelectChangeStatus}
                        label="Situação"
                        labelId="situacao"
                        required={true}
                      >
                        {selectOptions.map((option, index) => (
                          <MenuItem key={index} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    { status && status === statusSolicitation.APPROVED &&
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                        label="Data e Hora do Agendamento"
                        value={dataAgendamento}
                        onChange={() => handleChangeDataAgendameto}
                        />
                        </DemoContainer>
                      </LocalizationProvider>
                    </FormControl>
                    }
                    { status && status === statusSolicitation.PENDING_PAYMENT &&
                      <div className={styles.box}>
                        <span>É necessário vincular o resultado da análise a solicitação.</span>
                      </div>
                    }               
                  </div>
                </Form>
              )}
            </Formik>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleChangeStatus}>Confirmar Alteração</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
