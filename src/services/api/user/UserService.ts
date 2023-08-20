import { api } from '@/libs'

const page = (page: number, size: number, order: string, asc: boolean) => {
    return api.get(`/users/page/?page=${page}&size=${size}&order=${order}&asc=${asc}`)
}

const UserService = {
   /*  save,
    findAll,
    remove, */
    page
  }
  
  export default UserService