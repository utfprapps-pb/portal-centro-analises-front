import { HttpStatusCode } from 'axios'

export interface HttpClient<
  TData = unknown,
  TFilters = Record<string, string>
> {
  request: (data: HttpRequest<TFilters>) => Promise<HttpResponse<TData>>
}

export type HttpMethod = 'get' | 'post' | 'delete' | 'patch'

export type HttpRequest<TFilters = Record<string, string>> = {
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
