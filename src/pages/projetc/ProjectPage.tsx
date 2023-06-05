import React, { useEffect, useState } from 'react'

import { DeleteRounded, EditRounded } from '@material-ui/icons'
import { Button, Grid, IconButton } from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'
import { ProjectParams } from '../../services/api/project/project.type'
import ProjectService from '@/services/api/project/ProjectService'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

export const ProjectPage = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<ProjectParams[]>([])
  const [apiError, setApiError] = useState('')

  const loadData = () => {
    ProjectService.findAll()
      .then((response) => {
        setData(response.data)
        setApiError('')
      })
      .catch((responseError) => {
        setApiError('Falha ao carregar lista de categorias.')
        toast.error(apiError)
        // eslint-disable-next-line no-console
        console.log(responseError)
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Grid container justifyContent="flex-end">
        <Button
          variant="outlined"
          sx={{ m: 1 }}
          className={styles.buttoncolor}
          onClick={() => navigate('/projeto/new')}
        >
          Inserir
        </Button>
      </Grid>
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
                  <IconButton aria-label="delete" color="error">
                    <DeleteRounded />
                  </IconButton>
                  <IconButton aria-label="delete" color="info">
                    <EditRounded />
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
