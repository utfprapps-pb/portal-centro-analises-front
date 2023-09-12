import { api } from '@/libs'
import { EquipmentParams } from './equipment.type'

const save = (equipment: EquipmentParams) => api.post('/equipments', equipment)

const findAll = () => api.get('/equipments')

const remove = (id: number) => api.delete(`/equipments/${id}`)

const findById = (id: number) => api.post(`/equipments/${id}`)

const page = (page: number, size: number, order: string, sort: boolean) => {
  return api.get(`/equipments/page/?page=${page}&size=${size}&order=${order}&sort=${sort}`)
}
const findAllInactive = () => api.get('/equipments/findInactive')

const activeEquipmentById = (id: number) => api.put(`/equipments/activatedEquipment/${id}`)

const EquipmentService = {
  save,
  findAll,
  remove,
  findById,
  page,
  findAllInactive,
  activeEquipmentById
}

export default EquipmentService
