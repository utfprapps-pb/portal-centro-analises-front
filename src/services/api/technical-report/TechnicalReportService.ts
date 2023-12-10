import { api } from '@/libs'

const save = (report: any) => api.post('/report', report)
const saveUpload = (data: FormData) => {
  return api.post('/report/upload', data,{
    headers: {"Content-Type":"multipart/form-data"}
  })
}

const findById = (id: number) => api.post(`/report/${id}`)

const page = (page: number, size: number, order: string, asc: boolean) => {
  return api.get(`/report/page?page=${page}&size=${size}&order=${order}&asc=${asc}`)
}

const getSolicitationApproved = () => api.get('/solicitation/approved') 

const validaVinculado = (id:number) => {
  return api.post(`report/vinculado/${id}`);
}

const TechnicalReportService = {
  save,
  saveUpload,
  findById,
  page,
  getSolicitationApproved,
  validaVinculado
}

export default TechnicalReportService
