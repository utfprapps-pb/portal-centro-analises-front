import { api } from '@/libs'

const save = (transaction: any) => api.post('/transaction', transaction)

const update = (transaction: any) => api.put('/transaction', transaction)

const findAll = () => api.get('/transaction')

const remove = (id: number) => api.delete(`/transaction/${id}`)

const findById = (id: number) => api.post(`/transaction/${id}`)

const page = (page: number, size: number, order: string, asc: boolean) => {
  return api.get(`/transaction/page/?page=${page}&size=${size}&order=${order}&asc=${asc}`)
}

const search = (
  page: number,
  size: number,
  order: string,
  asc: boolean,
  search: string
) => {
  return api.get(`/transaction/search?page=${page}&size=${size}&order=${order}&asc=${asc}&search=${search}`)
}

const TransactionService = {
  save,
  update,
  findAll,
  remove,
  findById,
  page,
  search
}

export default TransactionService

