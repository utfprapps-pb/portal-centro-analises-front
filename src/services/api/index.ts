import { AxiosResponse } from 'axios'

import { api } from './apiSingleton'
import { HttpClient, HttpRequest, HttpResponse } from './types'

export class ApiHttpClient<T = unknown> implements HttpClient<T> {
  async request(data: HttpRequest): Promise<HttpResponse<T>> {
    let axiosResponse: AxiosResponse

    const { url: rawUrl, pagination, filters } = data

    try {
      const url = this.makeUrlWithFiltersAndPagination({
        url: rawUrl,
        filters,
        pagination
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
      body: axiosResponse.data
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private makeUrlWithFiltersAndPagination(params: {
    url: string
    filters: HttpRequest['filters']
    pagination: HttpRequest['pagination']
  }) {
    const { url, filters = {}, pagination = {} } = params

    const paginationKeys = Object.keys(pagination)
    const filtersKeys = Object.keys(filters)

    if (!filtersKeys.length && !paginationKeys.length) return url

    const esc = encodeURIComponent
    const filtersAndPagination = [
      ...Object.entries(pagination).map(
        ([key, value]) => `${esc(key)}=${esc(String(value))}`
      ),
      ...Object.entries(filters).map(
        ([key, value]) => `${esc(key)}=${esc(value)}`
      )
    ]

    const query = filtersAndPagination.join('&')
    return `${url}?${query}`
  }
}
