import { HttpStatusCode } from 'axios'

import { Login, LoginResponseProps } from './types'
import { ApiHttpClient } from '..'
import { InvalidCredentialsError, UnexpectedError } from '../errors'

export const login: Login = async ({ email: username, password }) => {
  const api = new ApiHttpClient<LoginResponseProps>()

  const { statusCode, body } = await api.request({
    url: '/login',
    method: 'post',
    body: {
      username,
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
