import { HttpStatusCode } from 'axios'

type Filter = Record<string, string>

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
  pagination?: {
    page: number
    perPage?: number
  }
}

export type HttpResponse<TData = unknown> = {
  statusCode: HttpStatusCode
  body?: TData
}

export type ListParams = Pick<HttpRequest, 'filters' | 'pagination'>
