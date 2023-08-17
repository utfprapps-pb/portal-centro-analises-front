import { api } from '@/libs'
import { EquipmentParams } from './equipment.type'

const save = (equipment: EquipmentParams) => api.post('/equipments', equipment)

const findAll = () => api.get('/equipments')

const remove = (id: number) => api.delete(`/equipments/${id}`)

const findById = (id: number) => api.post(`/equipments/${id}`)

const page = (page: number, size: number, order: string, asc: boolean) => {
  return api.get(`/equipments/page/?page=${page}&size=${size}&order=${order}&asc=${asc}`)
}

const EquipmentService = {
  save,
  findAll,
  remove,
  findById,
  page
}

export default EquipmentService
