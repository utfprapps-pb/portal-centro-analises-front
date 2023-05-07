import React from 'react'

import { BaseTableProps } from '@/components/table/types'
import { Id, crudHook, CrudHookProps } from '@/templates/hooks'

class Wrapper<
  TTableData extends Id,
  TFormData extends Record<string, unknown>
> {
  // eslint-disable-next-line class-methods-use-this
  fn() {
    return crudHook<TTableData, TFormData>(
      {} as CrudHookProps<TTableData, TFormData>
    )
  }
}

type Texts<TTableData extends Id> = {
  delete: (data: TTableData) => {
    title: string
    description: string
  }
}

type FormProps<T> = {
  renderCreateContainer: () => React.ReactNode
  renderUpdateContainer: (initialData: T) => React.ReactNode
  renderFilterContainer: () => React.ReactNode
}

type WrapperFnType<
  TTableData extends Id,
  TFormData extends Record<string, unknown>
> = ReturnType<ReturnType<Wrapper<TTableData, TFormData>['fn']>>

type HookDataType<
  TTableData extends Id,
  TFormData extends Record<string, unknown>
> = WrapperFnType<TTableData, TFormData>

export type CrudPageProps<
  TTableData extends Id,
  TFormData extends Record<string, unknown>
> = {
  hookData: HookDataType<TTableData, TFormData>
  texts: Texts<TTableData>
  table: BaseTableProps<TTableData>
  form: FormProps<TFormData>
  title: string
  notFoundResourceName: string
}
