export type ModalFilterData = {
  subject: string
}

export type ProjectModalFilterProps = {
  initialData?: ModalFilterData
  onApply: (props: { formData: ModalFilterData }) => void
  onCancel: () => void
}
