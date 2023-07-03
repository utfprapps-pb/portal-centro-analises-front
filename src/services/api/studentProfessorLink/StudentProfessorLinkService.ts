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

const StudentProfessorLinkService = {
  findAll,
  findByProfessorLink,
  saveLink,
  deleteLink
};

export default StudentProfessorLinkService;
