import React from 'react'

import { HomePage, LoginPage } from '@/pages'
import { EmailConfirmationPage } from '@/pages/emailConfirmation'

type RouteProps = {
  path: () => string
  component: React.ReactNode
}

type Pages = 'login' | 'signUp' | 'home' | 'emailConfirm'

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
  emailConfirm: {
    path: () => '/email-confirm/:hashKey',
    component: <EmailConfirmationPage />
  }
})
