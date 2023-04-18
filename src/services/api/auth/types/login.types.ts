export type Login = (data: LoginParams) => Promise<LoginResponseProps>

export type LoginParams = {
  email: string
  password: string
}

export type LoginResponseProps = {
  token: string
}
