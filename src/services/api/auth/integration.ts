import { HttpStatusCode } from 'axios'

import { Login, LoginResponseProps } from './types'
import { ApiHttpClient } from '..'
import { InvalidCredentialsError, UnexpectedError } from '../errors'

export const login: Login = async ({ email, password }) => {
  const api = new ApiHttpClient<LoginResponseProps>()

  const { statusCode, body } = await api.request({
    url: '/login',
    method: 'post',
    body: {
      email,
      password
    }
  })

  if (statusCode === HttpStatusCode.Unauthorized) {
    throw new InvalidCredentialsError()
  }

  if (statusCode === HttpStatusCode.Ok && !!body) {
    return body
  }

  throw new UnexpectedError()
}
