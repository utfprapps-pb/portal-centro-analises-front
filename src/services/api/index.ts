import { AxiosResponse } from 'axios'

import { HttpClient, HttpRequest, HttpResponse } from './types'
import { api } from '@/libs'

export * from './types'

export class ApiHttpClient<T = unknown> implements HttpClient<T> {
  async request(data: HttpRequest): Promise<HttpResponse<T>> {
    let axiosResponse: AxiosResponse

    const { url: rawUrl, pagination, filters, sort } = data

    try {
      const url = this.makeUrlWithFiltersAndPagination({
        url: rawUrl,
        filters,
        pagination,
        sort
      })

      axiosResponse = await api.request({
        ...data,
        url,
        data: data.body
      })
    } catch (error: any) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
      totalPages: Array.isArray(axiosResponse.data)
        ? Math.ceil(axiosResponse.data.length / 10)
        : undefined
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private makeUrlWithFiltersAndPagination(params: {
    url: string
    filters: HttpRequest['filters']
    pagination: HttpRequest['pagination']
    sort: HttpRequest['sort']
  }) {
    const { url, filters = {}, pagination = {}, sort = {} } = params

    const paginationKeys = Object.keys(pagination)
    const filtersKeys = Object.keys(filters)
    const sortKeys = Object.keys(sort)

    if (!filtersKeys.length && !paginationKeys.length && !sortKeys) return url

    const esc = encodeURIComponent
    const queryParams = [
      ...Object.entries(pagination).map(
        ([key, value]) => `${esc(key)}=${esc(String(value))}`
      ),
      ...Object.entries(filters).map(
        ([key, value]) => `${esc(key)}=${esc(String(value))}`
      ),
      ...Object.entries(sort).map(
        ([key, value]) => `${esc(key)}=${esc(String(value))}`
      )
    ]

    const query = queryParams.join('&')
    return `${url}?${query}`
  }
}
