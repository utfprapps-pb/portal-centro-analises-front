import { AprovacoesParams } from './aprovacoes.type'
import { api } from '@/libs'

const save = (project: AprovacoesParams) => api.post('/project', project)

const findAll = () => api.get('/project')

const getSolicitationPending = () => api.get('/solicitation/pending') 

const approve = (id: number, status: string) => api.post(`/solicitation/${id}/status`, status, {headers: {'Content-Type': 'text/plain'}})

const reject = (id: number, status: string) => api.post(`/solicitation/${id}/status`, status, {headers: {'Content-Type': 'text/plain'}})

const findById = (id: number) => api.post(`/solicitation/${id}`)

const pageSolicitationPending = (page: number, size: number, order: string, asc: boolean) => {
  return api.get(`/solicitation/pendingpage/?page=${page}&size=${size}&order=${order}&asc=${asc}`)
}

const AprovacoesService = {
  save,
  findAll,
  approve,
  reject,
  findById,
  getSolicitationPending,
  pageSolicitationPending,
}

export default AprovacoesService
