import { DomainRole } from '@/components/domain-role/model/domain-role'
import { api } from '../../../libs/axiosBase'

import { useLocalStorage } from '@/hooks'

const localStorage = useLocalStorage()
const auth = localStorage.get(localStorage.LOCAL_STORAGE_KEYS.AUTH)
api.defaults.headers.common['Authorization'] = `Bearer ${auth?.token}`

const save = (domainRole: DomainRole) => {
  return api.post('/domain-role', domainRole)
}

const findAll = () => {
  return api.get('/domain-role')
}

const page = (page: number, size: number, order: string, asc: boolean) => {
  return api.get(`/domain-role/page?page=${page}&size=${size}&order=${order}&asc=${asc}`)
}

const search = (
  page: number,
  size: number,
  order: string,
  asc: boolean,
  search: string
) => {
  return api.get(`/domain-role/search?page=${page}&size=${size}&order=${order}&asc=${asc}&search=${search}`)
}

const findOne = (id: number) => {
  return api.post(`/domain-role/${id}`)
}

const remove = (id: number) => {
  return api.delete(`/domain-role/${id}`)
}

const DomainRoleService = {
  save,
  findAll,
  page,
  search,
  findOne,
  remove
}

export default DomainRoleService;
