export type TransactionParams = {
    id?: number
    value: number
    createdAt: string
    updatedAt: string
    user?: any,
    type:any
  }

  export type UserParams = {
    id: number
    name: string
    email: string
    siape: string
  }