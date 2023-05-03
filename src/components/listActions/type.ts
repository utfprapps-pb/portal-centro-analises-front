export type Action = {
  icon: React.ReactNode
  text: string
  onClick: () => void

  color: string
  background: string
}

export type ListActionsProps = {
  actions: Action[]
}
