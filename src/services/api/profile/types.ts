export type Profile = {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export type ChangePasswordParams = {
  oldPassword: string
  newPassword: string
}

export type ChangePassword = (params: ChangePasswordParams) => Promise<void>