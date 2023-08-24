import React, { useEffect, useState } from 'react'
import { ThumbUp, ThumbDown, OpenInBrowser } from '@material-ui/icons'
import { IconButton } from '@mui/material'
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
import { ArovacoesParams, VinculoParams } from '@/services/api/aprovacoes/aprovacoes.type'

export const Aprovacoes = () => {
  const navigate = useNavigate()
  const [dataSolicitation, setDataSolicitation] = useState<ArovacoesParams[]>([])
  const [dataVinculo, setDataVinculo] = useState<VinculoParams[]>([])
  const [apiError, setApiError] = useState('')
  var t: any = localStorage.getItem("user");
	var infoArray = JSON.parse(t);
	var userId = infoArray.id.toString();



  const loadData = () => {
    AprovacoesService.getSolicitationPending()
    .then((response: any) => {
      setDataSolicitation(response.data)
      setApiError('')
    })
    .catch((responseError: any) => {
      setApiError('Falha ao carregar lista de solicitações pendentes.')
      toast.error(apiError)
      // eslint-disable-next-line no-console
    })

    AprovacoesService.getVinculoPending(userId)
    .then((response: any) => {
      setDataVinculo(response.data)
      console.log(response.data)
      setApiError('')
    })
    .catch((responseError: any) => {
      setApiError('Falha ao carregar lista de vínculos pendentes.')
      toast.error(apiError)
      // eslint-disable-next-line no-console
    })


  }

  useEffect(() => {
    loadData();
  }, [])

  const approveSolicitation = (id: number, status: string) => {
    AprovacoesService.approve(id, status)
    .then((response) => {
      toast.success("Aprovado com sucesso!")
      setApiError('')
      loadData()
    })
    .catch((responseError) => {
      setApiError('Falha ao aprovar.')
      toast.error(apiError)
      console.log(responseError)
    })
  }

  const rejectSolicitation = (id: number) => {
    AprovacoesService.reject(id, 'REFUSED')
    .then((response) => {
      toast.success("Rejeitado!")
      setApiError('')
      loadData()
    })
    .catch((responseError) => {
      setApiError('Falha ao rejeitar.')
      toast.error(apiError)
      console.log(responseError)
    })
  }

  const approveVinculo = (id: number, student: object, teacher: object)  => {
    const payload = {
      id: id,
      student: student,
      teacher: teacher,
      aproved: true
    }
    AprovacoesService.approveVinculo(payload)
    .then((response) => {
      toast.success("Aprovado com sucesso!")
      setApiError('')
      loadData()
    })
    .catch((responseError) => {
      setApiError('Falha ao aprovar.')
      toast.error(apiError)
      console.log(responseError)
    })
  }

  const rejectVinculo = (id: number)  => {    
    AprovacoesService.rejectVinculo(id)
    .then((response) => {
      toast.success("Rejeitado!")
      setApiError('')
      loadData()
    })
    .catch((responseError) => {
      setApiError('Falha ao rejeitar.')
      toast.error(apiError)
      console.log(responseError)
    })
  }

  return (
  <>
    <div className={styles.container}>
      <h1 className={styles.title}>APROVAÇÕES</h1>
        {dataSolicitation.length != 0 && (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align="center">Abrir formulário</StyledTableCell>
                    <StyledTableCell align="right">Formulário</StyledTableCell>
                    <StyledTableCell align="right">Descrição</StyledTableCell>
                    <StyledTableCell align="right">Solicitante</StyledTableCell>
                    <StyledTableCell align="right">Aprovar/Reprovar</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataSolicitation.map((p) => (
                    <StyledTableRow key={p.id}>
                      <StyledTableCell component="th" scope="row">
                        {p.id}
                      </StyledTableCell>
                      <StyledTableCell align="center" className={styles.icon_open}>
                        <IconButton aria-label="approve" color="info">
                          <OpenInBrowser onClick={ () => navigate(`/aprovacoes/view/${p.id!}`)}/>
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell align="right">{p.equipment.form}</StyledTableCell>
                      <StyledTableCell align="right">{p.description}</StyledTableCell>
                      <StyledTableCell align="right">{p.createdBy.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton aria-label="approve" color="success">
                          <ThumbUp onClick={() => approveSolicitation(p.id!, p.status == 'PENDING_ADVISOR' ? 'PENDING_LAB' : 'PENDING_SAMPLE')}/>
                        </IconButton>
                        <IconButton aria-label="reject" color="error">
                          <ThumbDown onClick={() => rejectSolicitation(p.id!)}/>
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </>
        )}
          {dataVinculo.length != 0 && dataVinculo.every(item => !item.aproved) && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell align="center">Aluno</StyledTableCell>
                  <StyledTableCell align="right">Aprovar/Reprovar</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {dataVinculo.filter((v) => v.aproved === null).map((v) => (
                <StyledTableRow key={v.id}>
                  <StyledTableCell component="th" scope="row">
                    {v.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{v.student.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton aria-label="approve" color="success">
                      <ThumbUp onClick={() => approveVinculo(v.id!, v.student, v.teacher)}/>
                    </IconButton>
                    <IconButton aria-label="reject" color="error">
                      <ThumbDown onClick={() => rejectVinculo(v.id!)}/>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        
      {dataSolicitation.length === 0 && dataVinculo.every(item => item.aproved !== null) && (
        <div className={styles.container_white}>
          Nenhum dado para ser exibido
        </div>
      )}
    </div>
    </>
  )
}


