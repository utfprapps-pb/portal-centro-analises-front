export type SignUp = (data: SignUpParams) => Promise<SignUpResponseProps>

export type SignUpParams = {
  name: string
  username: string
  password: string
  email: string
}

export type SignUpResponseProps = {
  role: string
  status: boolean | null
}
