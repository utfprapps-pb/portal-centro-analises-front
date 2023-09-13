import { api } from '@/libs'

const page = (page: number, size: number, order: string, asc: boolean) => {
  return api.get(`/audit/page/?page=${page}&size=${size}&order=${order}&asc=${asc}`)
}

const historyByIdAndNotStatus = (id:number, newStatus:string) => {
  return api.get(`/audit/historyByIdAndNotStatus/${id}/${newStatus}`)
}

const HistoryService = {
  page,
  historyByIdAndNotStatus,
}

export default HistoryService
