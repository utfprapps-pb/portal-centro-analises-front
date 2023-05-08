import { ListHookProps } from '../listHook/types'
import { Id } from '../types'

interface Services {
  delete: (id: string) => Promise<void>
}

export type ListDeleteHookProps<TTableData extends Id> = {
  services: {
    list: ListHookProps<TTableData>['services']['list']
    delete: Services['delete']
  }
  texts: {
    deleteSuccess: string
  }
}
