import React from 'react'

import { HomePage, LoginPage, SolicitarPage, HistoricoPage } from '@/pages'
import { Project } from '@/pages/projetc'

type RouteProps = {
  path: () => string
  component: React.ReactNode
}

type Pages = 'login' | 'signUp' | 'home' | 'solicitar' | 'historico' | 'projeto'

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
  solicitar: {
    path: () => '/solicitar',
    component: <SolicitarPage />
  },
  historico: {
    path: () => '/historico',
    component: <HistoricoPage />
  },
  projeto: {
    path: () => '/projeto',
    component: <Project />
  }
})
