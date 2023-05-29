import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import styles from './styles.module.scss'
import ProjectService from '@/services/api/project/ProjectService'

export const ProjectPageForm = () => {
  const [students, setStudents] = useState<StudentParams[]>([])
  const [apiError, setApiError] = useState('')

  const loadData = () => {
    ProjectService.findAll()
      .then((response) => {
        setStudents(response.data)
        console.log(students)
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

  return <div className={styles.margin_top} />
}
