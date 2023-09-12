import { api } from '@/libs'

const pageStatus = (page: number, size: number, order: string, sort: boolean, active:boolean) => {
    return api.get(`/users/pagestatus/?page=${page}&size=${size}&order=${order}&sort=${sort}&active=${active}`)
}

const pageRole = (page: number, size: number, order: string, sort: boolean, role:string) => {
  return api.get(`/users/pagerole/?page=${page}&size=${size}&order=${order}&sort=${sort}&role=${role}`)
}

const UserService = {
    pageStatus,
    pageRole
}
  
  export default UserService