import { EmailConfirm } from './types'
import { freeze } from '@/utils'

export const emailConfirm: EmailConfirm = async () => {
  await freeze()

  return true
}
