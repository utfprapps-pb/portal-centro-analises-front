import { ArovacoesParams } from './aprovacoes.type'
import { api } from '@/libs'

const save = (project: ArovacoesParams) => api.post('/project', project)

const findAll = () => api.get('/project')

const getSolicitationPending = () => api.get('/solicitation/pending') 

const approve = (id: number) => api.delete(`/project/${id}`)

const reject = (id: number) => api.delete(`/project/${id}`)

const findById = (id: number) => api.post(`/project/${id}`)

const AprovacoesService = {
  save,
  findAll,
  approve,
  reject,
  findById,
  getSolicitationPending
}

export default AprovacoesService
