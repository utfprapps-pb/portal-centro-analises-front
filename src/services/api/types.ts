import { HttpStatusCode } from 'axios'

type Filter = Record<string, string>

type Pagination = {
  page: number
  perPage?: number
}

type Sort = {
  field: string
  order: 'asc' | 'desc'
}

export interface CrudIntegration<
  TCreateFn,
  TDeleteFn,
  TListFn,
  TUpdateFn,
  TGetOne
> {
  create: TCreateFn
  delete: TDeleteFn
  list: TListFn
  update: TUpdateFn
  getOne: TGetOne
}

export interface HttpClient<
  TData = unknown,
  TFilters extends Filter[] = Filter[]
> {
  request: (data: HttpRequest<TFilters>) => Promise<HttpResponse<TData>>
}

export type HttpMethod = 'get' | 'post' | 'delete' | 'patch'

export type HttpRequest<TFilters extends Filter[] = Filter[]> = {
  url: string
  method: HttpMethod
  body?: unknown
  filters?: TFilters
  pagination?: Pagination
  sort?: Sort
}

export type HttpResponse<TData = unknown> = {
  statusCode: HttpStatusCode
  body?: TData
  totalPages?: number
}

export type ListParams = Pick<HttpRequest, 'filters' | 'pagination' | 'sort'>
