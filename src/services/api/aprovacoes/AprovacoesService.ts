import { ArovacoesParams } from './aprovacoes.type'
import { api } from '@/libs'

const save = (project: ArovacoesParams) => api.post('/project', project)

const findAll = () => api.get('/project')

const getSolicitationPending = () => api.get('/solicitation/pending') 

const getVinculoPending = (id: number) => api.get(`/student-teacher/listByTeacher/${id}`) 

const approve = (id: number, status: string) => api.post(`/solicitation/${id}/status`, status, {headers: {'Content-Type': 'text/plain'}})

const reject = (id: number, status: string) => api.post(`/solicitation/${id}/status`, status, {headers: {'Content-Type': 'text/plain'}})

const approveVinculo = (payload: object) =>  api.put(`/student-teacher/`, payload)

const rejectVinculo = (id: number) => api.delete(`/student-teacher/${id}`)


const findById = (id: number) => api.post(`/solicitation/${id}`)

const AprovacoesService = {
  save,
  findAll,
  approve,
  reject,
  findById,
  getSolicitationPending,
  getVinculoPending,
  approveVinculo,
  rejectVinculo
}

export default AprovacoesService
