import { api } from '@/libs'

const pageStatus = (page: number, size: number, order: string, asc: boolean, active:boolean) => {
    return api.get(`/users/pagestatus/?page=${page}&size=${size}&order=${order}&asc=${asc}&active=${active}`)
}

const pageRole = (page: number, size: number, order: string, asc: boolean, role:string) => {
  return api.get(`/users/pagerole/?page=${page}&size=${size}&order=${order}&asc=${asc}&role=${role}`)
}

const UserService = {
    pageStatus,
    pageRole
}
  
  export default UserService