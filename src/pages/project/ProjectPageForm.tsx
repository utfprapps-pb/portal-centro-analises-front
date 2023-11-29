import styles from './styles.module.scss'
import React, { useContext, useEffect, useState } from 'react'
import { TextField, Button, Paper, Box } from '@material-ui/core'
import { Formik, Form, Field, FormikHelpers, FormikProps } from 'formik'
import * as Yup from 'yup'
import { ProjectParams } from '@/services/api/project/project.type'
import ProjectService from '@/services/api/project/ProjectService'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '@/contexts'
import { StudentsParams } from '@/services/api/project/project.type'
import { Header, Menu } from '@/components'
import StudentService from '@/services/api/students/StudentService'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Breadcrumb from '@/components/breadcrumb'

const validationSchema = Yup.object().shape({
  subject: Yup.string().required('Título é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória')
})

export const ProjectPageForm = () => {
  const animatedComponents = makeAnimated()
  const navigate = useNavigate()

  const [students, setStudents] = useState<StudentsParams[]>([])
  const [studentsSelected, setStudentsSelected] = useState<StudentsParams[]>([])
  const [apiError, setApiError] = useState('')
  const { id } = useParams()
  const { authenticatedUser } = useContext(AuthContext)

  const [project, setProject] = useState<ProjectParams>({
    description: '',
    subject: '',
    students: []
  })

  const loadStudents = async () => {
    try {
      const response = await StudentService.findAllByProfessor(
        authenticatedUser?.id!
      )
      if (response.data) {
        setStudents(response.data)
        setApiError('')
      }
    } catch (error) {
      setApiError('Falha ao carregar estudantes.')
      toast.error(apiError)
      console.log(error)
    }
  }

  useEffect(() => {
    loadStudents()

    const loadData = async () => {
      try {
        const response = await ProjectService.findById(Number(id))

        if (response.data) {
          setProject({
            id: response.data.id,
            description: response.data.description,
            subject: response.data.subject,
            students: response.data.students
          })

          setStudentsSelected(response.data.students)
          setApiError('')
        }
      } catch (error) {
        setApiError('Falha ao carregar projeto.')
        toast.error(apiError)
        console.log(error)
      }
    }

    if (id) {
      loadData()
    }
  }, [])

  const handleSubmit = (values: ProjectParams) => {
    const data: ProjectParams = {
      ...values,
      id: project.id,
      students: studentsSelected,
      teacher: authenticatedUser
    }

    ProjectService.save(data)
      .then((response) => {
        toast.success('Sucesso ao salvar o projeto.')
        navigate('/projeto')
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
        <Breadcrumb />

        <Paper
          className={styles.containerForm}
          elevation={3}
          variant="outlined"
        >
          <Formik
            initialValues={project}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ errors, touched, isSubmitting}) => (
              <Form className={styles.form}>
                <Field
                  as={TextField}
                  className={styles.textField}
                  label="Título"
                  name="subject"
                  error={touched.subject && !!errors.subject}
                  helperText={touched.subject && errors.subject}
                  fullWidth
                  required
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  className={styles.textField}
                  label="Descrição"
                  name="description"
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  fullWidth
                  required
                  variant="outlined"
                />
                <Select
                  name="students"
                  onChange={(optionsSelected: any) => {
                    setStudentsSelected(optionsSelected)
                  }}
                  closeMenuOnSelect={false}
                  className={styles.textField}
                  components={animatedComponents}
                  aria-label="Estudantes"
                  placeholder="Estudantes"
                  defaultValue={studentsSelected}
                  value={studentsSelected}
                  getOptionValue={(option: StudentsParams) => option.name}
                  getOptionLabel={(option: StudentsParams) => option.name}
                  isMulti
                  options={students}
                  isSearchable={true}
                />
                <Box className={styles.w100} m={2} pt={3}>
                  <Button
                    className={styles.w100}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </div>
    </div>
  )
}
