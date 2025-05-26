import type { DetailOptions, SearchParams } from '@/entities/movie/model/types'

export class MovieHttp {
  private readonly baseUrl!: string
  private readonly apiKey!: string

  constructor() {
    const url = process.env.OMDB_API_URL?.trim()
    const key = process.env.OMDB_API_KEY?.trim()

    if (!url || !key) {
      throw new Error('[MovieHttpClient] Missing OMDB_API_URL or OMDB_API_KEY')
    }

    this.baseUrl = url
    this.apiKey = key
  }

  async getBySearch(params: SearchParams): Promise<unknown> {
    const url = this.buildUrl({
      s: params.query,
      type: params.type,
      y: params.year,
      page: params.page,
      r: params.format ?? 'json',
    })
    const res = await fetch(url)
    return res.json()
  }

  async getById(id: string, options?: DetailOptions): Promise<unknown> {
    const url = this.buildUrl({
      i: id,
      plot: options?.plot,
      r: options?.format ?? 'json',
      tomatoes: options?.tomatoes,
    })
    const res = await fetch(url)
    return res.json()
  }

  async getByTitle(title: string, options?: DetailOptions): Promise<unknown> {
    const url = this.buildUrl({
      t: title,
      plot: options?.plot,
      r: options?.format ?? 'json',
      tomatoes: options?.tomatoes,
    })
    const res = await fetch(url)
    return res.json()
  }

  private buildUrl(params: Record<string, unknown>): string {
    const query = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
      if (value != null) query.append(key, String(value))
    }

    query.append('apikey', this.apiKey)
    return `${this.baseUrl}?${query.toString()}`
  }
}
