import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event)

  const token = headers['authorization']
  const { jwtKey } = useRuntimeConfig()

  try {
    const decoded = token && jwt.verify(token.replace('Bearer ', ''), jwtKey)
    event.context.decodedToken = decoded
  }
  catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Access token is not valid',
    })
  }
})
