import axios from 'axios'

import { env } from '@/config'

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30 * 1000,
  validateStatus: (status: number) => status >= 200 && status < 300
})
