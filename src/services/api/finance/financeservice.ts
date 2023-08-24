import { api } from '@/libs'

const save = (finance: any) => api.post('/transaction', finance)

const findAll = () => api.get('/transaction')

const remove = (id: number) => api.delete(`/transaction/${id}`)

const findById = (id: number) => api.post(`/transaction/${id}`)

const page = (page: number, size: number, order: string, sort: boolean) => {
  return api.get(`/transaction/page/?page=${page}&size=${size}&order=${order}&sort=${sort}`)
}

const FinanceService = {
  save,
  findAll,
  remove,
  findById,
  page
}

export default FinanceService