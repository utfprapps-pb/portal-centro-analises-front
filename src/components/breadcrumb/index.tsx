import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { Breadcrumbs, Link, Typography } from '@mui/material'

import styles from './styles.module.scss'

const Breadcrumb = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <div className={styles.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit"
          onClick={() => navigate('/')}>
          Home
        </Link>

        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1

          if (isLast) {
            return <Typography key={path} color="text.primary">{path}</Typography>
          }

          return (
            <Link
              key={routeTo}
              underline="hover"
              color="inherit"
              onClick={() => navigate(routeTo)}
            >
              {path}
            </Link>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}

export default Breadcrumb
