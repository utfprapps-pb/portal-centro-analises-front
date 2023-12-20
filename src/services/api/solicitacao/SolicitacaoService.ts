import { api } from "@/libs"


const atualizarStatus = (dados: {id: number, status:string, data:Date}) =>
api.post(`/solicitation/status`, dados);

const findOneById = (id: number) => {
  return api.post(`/solicitation/${id}`);
}

const SolicitacaoService = {
    atualizarStatus,
    findOneById,
}

export default SolicitacaoService;