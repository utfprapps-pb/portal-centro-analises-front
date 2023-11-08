import { GraficoDTO } from '@/commons/type'
import { api } from '@/libs'

import { useLocalStorage } from '@/hooks'

const localStorage = useLocalStorage()
const auth = localStorage.get(localStorage.LOCAL_STORAGE_KEYS.AUTH)
api.defaults.headers.common['Authorization'] = `Bearer ${auth?.token}`

const getGraficoSolicitacao = () => api.get<GraficoDTO>('/dashboard/solicitacao')
const getGraficoSolicitacaoEquipamento = () => api.get<GraficoDTO>('/dashboard/solicitacaoequipamento')
const getGraficoEquipamentoSituacao = () => api.get<GraficoDTO>('/dashboard/usuariotipo')
const getGraficoUsuarioTipo = () => api.get<GraficoDTO>('/dashboard/usuariosituacao')
const getGraficoUsuarioSituacao = () => api.get<GraficoDTO>('/dashboard/equipamentosituacao')


const DashboardService = {
    getGraficoSolicitacao,
    getGraficoSolicitacaoEquipamento,
    getGraficoEquipamentoSituacao,
    getGraficoUsuarioSituacao,
    getGraficoUsuarioTipo
}

export default DashboardService