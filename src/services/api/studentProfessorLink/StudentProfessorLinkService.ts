import { api } from "@/libs";
import { StudentProfessorParams } from "./studentProfessor.type";
import { StudentsParams } from "../students/student.type";

const findAll = () => api.get("/users/role/PROFESSOR");

const findByProfessorLink = (student: StudentsParams) =>
  api.get(`/student-teacher/findByStudent/${student.id}`);

const saveLink = (payload: StudentProfessorParams) =>
  api.post(`/student-teacher`, payload);

const deleteLink = (id: number) =>
  api.delete(`/student-teacher/${id}`);

const getVinculoPending = (id: number) => api.get(`/student-teacher/listByTeacher/${id}`) 

const approveVinculo = (payload: object) =>  api.put(`/student-teacher/`, payload)

const rejectVinculo = (id: number) => api.delete(`/student-teacher/${id}`)

const pageVinculoPending = (page: number, size: number, order: string, sort: boolean, userId:number) => {
  return api.get(`/student-teacher/listByTeacherPage/?page=${page}&size=${size}&order=${order}&sort=${sort}&userid=${userId}`)
}

const StudentProfessorLinkService = {
  findAll,
  findByProfessorLink,
  saveLink,
  deleteLink,
  getVinculoPending,
  approveVinculo,
  rejectVinculo,
  pageVinculoPending
};

export default StudentProfessorLinkService;
