import React, { useContext, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './styles.module.scss'
import { ProjectParams } from '@/services/api/project/project.type'
import ProjectService from '@/services/api/project/ProjectService'
import { StudentParams } from '@/services/api/students/student.type'
import { Header, Menu } from '@/components'
import { AuthContext } from '@/contexts'
import { TextField, Button, makeStyles, Paper } from '@material-ui/core'

export const ProjectPageForm = () => {
  const navigate = useNavigate()
  const [students, setStudents] = useState<StudentParams[]>([])
  const [apiError, setApiError] = useState('')
  const { id } = useParams()
  const { authenticatedUser } = useContext(AuthContext)

  const [project, setProject] = useState<ProjectParams>({
    description: '',
    subject: '',
    students: []
  })
  const loadData = () => {
    if (id) {
      ProjectService.findById(Number(id))
        .then((response) => {
          setProject({
            id: response.data.id,
            description: response.data.description,
            subject: response.data.subject,
            students: response.data.students
          })
          console.log(students)
          setApiError('')
        })
        .catch((responseError) => {
          setApiError('Falha ao carregar dados do projeto.')
          toast.error(apiError)
          console.log(responseError)
        })
    }
  }

  useEffect(() => {
    loadData()
    console.log('openPage')
    console.log(authenticatedUser)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setProject((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(project);
  }

  const onSubmit = (data: ProjectParams) => {
    const form: ProjectParams = {
      ...data,
      id: project.id
    }

    debugger;

    ProjectService.save(form)
      .then((response) => {
        toast.success('Sucesso ao salvar o projeto.')
        navigate('/projetos')
      })
      .catch((error) => {
        toast.error('Falha ao salvar o projeto.')
        setApiError('Falha ao salvar o projeto.')
      })
  }
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.middle}>
        <Header />
        <Paper
          className={styles.containerForm}
          elevation={3}
          variant="outlined"
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              className={styles.textField}
              label="Subject"
              name="subject"
              value={project.subject}
              onChange={handleChange}
              variant="outlined"
              required
            />
            <TextField
              className={styles.textField}
              label="Description"
              name="description"
              value={project.description}
              onChange={handleChange}
              variant="outlined"
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  )
}
