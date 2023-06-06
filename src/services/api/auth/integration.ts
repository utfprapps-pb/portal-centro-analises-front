import { HttpStatusCode } from 'axios'

import { Login, LoginResponseProps } from './types'
import { SignUp, SignUpParams, SignUpResponseProps } from './types/signup.types'
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

export const signUp: SignUp = async (params: SignUpParams) => {
  const api = new ApiHttpClient<SignUpResponseProps>()
  // eslint-disable-next-line no-param-reassign
  params.username = params.name

  const { statusCode, body } = await api.request({
    url: '/v1/users',
    method: 'post',
    body: params
  })

  if (statusCode === HttpStatusCode.Unauthorized) {
    throw new InvalidCredentialsError()
  }

  if (statusCode === HttpStatusCode.Ok && !!body) {
    return body
  }

  throw new UnexpectedError()
}
