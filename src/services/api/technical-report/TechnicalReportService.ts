import { api } from '@/libs'

const save = (project: any) => api.post('/report', project)

const findById = (id: number) => api.post(`/report/${id}`)

const page = (page: number, size: number, order: string, asc: boolean) => {
  return api.get(`/report/page?page=${page}&size=${size}&order=${order}&asc=${asc}`)
}

const getSolicitationApproved = () => api.get('/solicitation/approved') 

const TechnicalReportService = {
  save,
  findById,
  page,
  getSolicitationApproved
}

export default TechnicalReportService
