import { api } from '../../../libs/axiosBase'

import { useLocalStorage } from '@/hooks'

const localStorage = useLocalStorage()
const auth = localStorage.get(localStorage.LOCAL_STORAGE_KEYS.AUTH)
api.defaults.headers.common['Authorization'] = `Bearer ${auth?.token}`
//api.defaults.baseURL = 'http://localhost:8085/api/'

const save = (partner: any) => {
  return api.post('/partners', partner)
}

const findAll = () => {
  return api.get('/partners')
}

const page = (page: number, size: number, order: string, asc: boolean) => {
  return api.get(`/partners/page/?page=${page}&size=${size}&order=${order}&asc=${asc}`)
}

const search = (
  page: number,
  size: number,
  order: string,
  asc: boolean,
  search: string
) => {
  return api.get(`/partners/${page}/${size}/${order}/${asc}/${search}`)
}

const findOne = (id: number) => {
  return api.post(`/partners/${id}`)
}

const remove = (id: number) => {
  return api.delete(`/partners/${id}`)
}

const PartnerService = {
  save,
  findAll,
  page,
  search,
  findOne,
  remove
}

export default PartnerService
