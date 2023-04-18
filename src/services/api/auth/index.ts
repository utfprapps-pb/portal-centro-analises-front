import * as integration from './integration'
import * as mock from './mock'
import { env } from '@/config'

export * from './types'

export const { login } = env.USE_MOCKS ? mock : integration
