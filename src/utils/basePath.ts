const BASE_URL = import.meta.env.BASE_URL

export const basePath = (path: string): string =>
  BASE_URL + path.replace(/^\//, '')
