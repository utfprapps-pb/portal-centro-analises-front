import { api } from '@/libs'

const save = async (finance: any) => await api.post('/transaction', finance)

const findAll = async () => await api.get('/transaction')

const remove = async (id: number) => await api.delete(`/transaction/${id}`)

const findById = async (id: number) => await api.post(`/transaction/${id}`)

const page = async (
  page: number,
  size: number,
  order: string,
  asc: boolean
) => {
  return await api.get(
    `/transaction/page?page=${page}&size=${size}&order=${order}&asc=${asc}`
  )
}

const findByUserId = async (userId: number) =>
  await api.get(`transaction/user/${userId}`)

const FinanceService = {
  save,
  findAll,
  findByUserId,
  remove,
  findById,
  page
}

export default FinanceService
