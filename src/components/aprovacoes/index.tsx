import React, { useEffect, useState } from 'react'

import { ThumbUp, ThumbDown } from '@material-ui/icons'
import { Button, Grid, IconButton } from '@mui/material'
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
import AprovacoesService from '@/services/api/aprovacoes/AprovacoesService'
import { StyledTableCell } from '@/layouts/StyldeTableCell'
import { StyledTableRow } from '@/layouts/StyledTableRow'

export const Aprovacoes = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<ProjectParams[]>([])
  const [apiError, setApiError] = useState('')

  const loadData = () => {
    AprovacoesService.getSolicitationPending()
    .then((response: any) => {
      setData(response.data)
      setApiError('')
    })
    .catch((responseError: any) => {
      setApiError('Falha ao carregar lista de categorias.')
      toast.error(apiError)
      // eslint-disable-next-line no-console
      console.log(responseError)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  const approveProject = (id: number) => {
    AprovacoesService.approve(id)
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

  const rejectProject = (id: number) => {
    AprovacoesService.reject(id)
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
    <div className={styles.container}>
      <h1 className={styles.title}>APROVAÇÕES</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="right">Subject</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Students</StyledTableCell>
              <StyledTableCell align="right">Functions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((p) => (
              <StyledTableRow key={p.id}>
                <StyledTableCell component="th" scope="row">
                  {p.id}
                </StyledTableCell>
                <StyledTableCell align="right">{p.subject}</StyledTableCell>
                <StyledTableCell align="right">{p.description}</StyledTableCell>
                <StyledTableCell align="right">
                  {p.students.length}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton aria-label="approve" color="success">
                    <ThumbUp onClick={() => approveProject(p.id!)}/>
                  </IconButton>
                  <IconButton aria-label="reject" color="error">
                    <ThumbDown onClick={() => rejectProject(p.id!)}/>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <div className={styles.container_white}>
          Nenhum dado para ser exibido
        </div>
      )}
    </div>
  )
}
