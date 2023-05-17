import { faker } from '@faker-js/faker/locale/en'

import { Login, SignUp } from './types'
import { freeze } from '@/utils'

export const login: Login = async () => {
  await freeze()

  return {
    token: faker.datatype.uuid()
  }
}

export const signUp: SignUp = async () => {
  await freeze()

  return {
    role: faker.hacker.abbreviation(),
    status: true
  }
}
