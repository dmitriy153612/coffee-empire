import jwt from 'jsonwebtoken'

export function createToken<T extends object>(data: T): string {
  const { jwtKey } = useRuntimeConfig()

  return jwt.sign(data, jwtKey, { expiresIn: '1h' }) || ''
}
