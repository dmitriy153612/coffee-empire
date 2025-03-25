export interface FetchError {
  name: 'FetchError'
  statusCode: number
  statusMessage: string
}

export function isFetchError(err: unknown): err is FetchError {
  return err instanceof Error && Object.hasOwn(err, 'name') && err.name === 'FetchError'
}
