import React from 'react'

import { HomePage, LoginPage, ProjectPage } from '@/pages'

type RouteProps = {
  path: () => string
  component: React.ReactNode
}

type Pages = 'login' | 'signUp' | 'home' | 'projects'

type RoutesProps = {
  [key in Pages]: RouteProps
}

export const ROUTES = Object.freeze<RoutesProps>({
  login: {
    path: () => '/login',
    component: <LoginPage />
  },
  signUp: {
    path: () => '/sign-up',
    component: <h1>SignUp</h1>
  },
  home: {
    path: () => '/',
    component: <HomePage />
  },
  projects: {
    path: () => '/projects',
    component: <ProjectPage />
  }
})
