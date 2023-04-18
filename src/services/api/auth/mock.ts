import { faker } from '@faker-js/faker/locale/en'

import { Login } from './types'
import { freeze } from '@/utils'

export const login: Login = async () => {
  await freeze()

  return {
    token: faker.datatype.uuid()
  }
}
