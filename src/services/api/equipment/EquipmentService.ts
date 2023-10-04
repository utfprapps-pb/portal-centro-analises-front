import { api } from '@/libs'
import { EquipmentParams } from './equipment.type'

const save = (equipment: EquipmentParams) => api.post('/equipments', equipment)

const findAll = () => api.get('/equipments')

const remove = (id: number) => api.delete(`/equipments/${id}`)

const findById = (id: number) => api.post(`/equipments/${id}`)

const page = (page: number, size: number, order: string, asc: boolean) => {
  return api.get(`/equipments/page?page=${page}&size=${size}&order=${order}&asc=${asc}`)
}
const findAllInactive = () => api.get('/equipments/findInactive')

const activeEquipmentById = (id: number) => api.put(`/equipments/activatedEquipment/${id}`)

const update = async (id: number, equipment: EquipmentParams) => api.put(`/equipments/${id}`, equipment)

const pageStatus = (page: number, size: number, order: string, asc: boolean, active:boolean) => {
  return api.get(`/equipments/pagestatus?page=${page}&size=${size}&order=${order}&asc=${asc}&active=${active}`)
}

const EquipmentService = {
  save,
  findAll,
  remove,
  findById,
  page,
  findAllInactive,
  activeEquipmentById,
  update,
  pageStatus,
}

export default EquipmentService
