import { api } from '@/libs'

// substituir pra rota que retoprne os estudantes daquele professor, ou todos os usuarios do tipo estudantes
const findAll = () => api.get('/users')

const findById = (id: number) => api.get(`/users/${id}`)

const StudentService = {
  findAll,
  findById
}

export default StudentService
