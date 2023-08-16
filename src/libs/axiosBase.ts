import axios from 'axios'

import { env } from '@/config'

export const api = axios.create({
  baseURL: "http://localhost:8085/api",
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30 * 1000,
  validateStatus: (status: number) => status >= 200 && status < 300
})