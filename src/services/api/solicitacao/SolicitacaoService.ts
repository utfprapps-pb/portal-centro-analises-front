import { api } from "@/libs"


const atualizarStatus = (dados: {id: number, status:string, data:Date}) => 
api.post(`/solicitation/status`, dados)

const SolicitacaoService = {
    atualizarStatus
}

export default SolicitacaoService;