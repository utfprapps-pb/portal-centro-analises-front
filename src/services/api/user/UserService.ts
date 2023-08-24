import { api } from '@/libs'

const page = (page: number, size: number, order: string, sort: boolean) => {
    return api.get(`/users/page/?page=${page}&size=${size}&order=${order}&sort=${sort}`)
}

const pageRole = (page: number, size: number, order: string, sort: boolean, role:string) => {
  return api.get(`/users/pagerole/?page=${page}&size=${size}&order=${order}&sort=${sort}&role=${role}`)
}

const UserService = {
    page,
    pageRole
}
  
  export default UserService