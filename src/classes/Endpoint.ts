import { api } from '../api/index.js'
import { EndpointType, IApiResponse } from '../types/index.js'

export class Endpoint {
  static call = async (method: string, url: string, data: {}): EndpointType => {
    const response: IApiResponse = await api({ method, url, data })

    if (!response?.data || !response.data.ok) {
      return { error: response.data?.error?.message || 'error' }
    }

    if (response.data.result === undefined) {
      return { error: 'error' }
    }

    return { result: response.data.result }
  }
}
