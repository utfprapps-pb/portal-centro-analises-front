import { ListParams } from '@/services/api/types'
import { Id } from '@/templates/hooks/'

interface Services<TTableData extends Id> {
  list: (
    params: ListParams
  ) => Promise<{ resources: TTableData[]; totalPages: number }>
}

export type ListHookProps<TTableData extends Id> = {
  services: Services<TTableData>
}
