import { api } from '../api/index.js'

export class Endpoint {
  method: string
  url: string
  data: {}

  constructor(method: string, url: string, data: {}) {
    this.method = method
    this.url = url
    this.data = data
  }

  call = async () => {
    const response = await api({
      method: this.method,
      url: this.url,
      data: this.data,
    })

    if (!response.data) {
      return { error: 'error' }
    }

    if (!response.data.ok) {
      if (response.data.error?.message === "can't decode address") {
        return { error: 'addressNotFound' }
      }

      if (response.data.error?.message === 'rate limit') {
        return { error: 'rate_limit' }
      }
    }

    if (response.data.ok && response.data.result) {
      return response.data.result
    }
  }
}
