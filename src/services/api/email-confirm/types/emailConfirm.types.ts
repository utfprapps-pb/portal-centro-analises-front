export type EmailConfirm = (data: EmailConfirmParams) => Promise<boolean>

export type EmailConfirmParams = {
  hashKey: string
}
