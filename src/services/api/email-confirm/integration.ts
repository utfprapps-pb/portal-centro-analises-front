import { HttpStatusCode } from 'axios'

import { EmailConfirm } from './types'
import { ApiHttpClient } from '..'
import { UnexpectedError } from '../errors'

export const emailConfirm: EmailConfirm = async ({ hashKey }) => {
  const api = new ApiHttpClient<boolean>()

  const { statusCode, body } = await api.request({
    url: `/v1/emailconfirm/code/${hashKey}`,
    method: 'get'
  })

  if (statusCode === HttpStatusCode.Ok && !!body) {
    return body
  }

  throw new UnexpectedError()
}
