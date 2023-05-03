import { ListDeleteHookProps } from '../listDeleteHook/types'
import { Id } from '@/templates/hooks/'
import { ValidationComposite } from '@/validation/validationComposite'

interface Services<
  TTableData extends Id,
  TFormData extends Record<string, unknown>
> {
  create: (data: TFormData) => Promise<void>
  update: (id: string, data: TFormData) => Promise<void>
  list: ListDeleteHookProps<TTableData>['services']['list']
  delete: ListDeleteHookProps<TTableData>['services']['delete']
}

export type CrudHookProps<
  TTableData extends Id,
  TFormData extends Record<string, unknown>
> = {
  services: Services<TTableData, TFormData>
  validation: ValidationComposite
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
