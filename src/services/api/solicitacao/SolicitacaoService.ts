import { api } from "@/libs"


const atualizarStatus = (dados: {id: number, status:string, data:Date}) => 
api.post(`/solicitation/status`, dados)

const findById = (id: number) => api.post(`/solicitation/${id}`) 

const SolicitacaoService = {
    atualizarStatus,
    findById
}

export default SolicitacaoService;