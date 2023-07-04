import { api } from '@/libs'

// substituir pra rota que retoprne os estudantes daquele professor, ou todos os usuarios do tipo estudantes
const findAllByProfessor = (professorId: number) => api.get(`/student-teacher/listStudentsByTeacher/${professorId}`)

const findAll = () => api.get('/users/role/STUDENT')

const findById = (id: number) => api.get(`/users/${id}`)

const StudentService = {
  findAll,
  findById,
  findAllByProfessor
}

export default StudentService
