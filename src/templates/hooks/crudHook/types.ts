import { ListDeleteHookProps } from '../listDeleteHook/types'
import { Id } from '@/templates/hooks/'

interface Services<
  TTableData extends Id,
  TFormData extends Record<string, unknown>
> {
  create: (data: TFormData) => Promise<void>
  update: (id: string, data: TFormData) => Promise<void>
  getOne: (id: string) => Promise<TFormData>
  list: ListDeleteHookProps<TTableData>['services']['list']
  delete: ListDeleteHookProps<TTableData>['services']['delete']
}

export type CrudHookProps<
  TTableData extends Id,
  TFormData extends Record<string, unknown>
> = {
  services: Services<TTableData, TFormData>
  texts: {
    delete: {
      success: string
    }
    create: {
      success: string
    }
    update: {
      success: string
    }
  }
}
