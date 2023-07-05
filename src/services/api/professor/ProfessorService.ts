import { api } from '@/libs'

const findAll = () => api.get('/users/role/PROFESSOR')

const findById = (id: number) => api.get(`/users/${id}`)

const findProfessorById = (id: number) => api.post(`/users/${id}`)

const ProfessorService = {
  findAll,
  findById,
  findProfessorById
}

export default ProfessorService
