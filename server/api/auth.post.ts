import type { User, UserCredentials, TokenData } from '@/server/types/user'
import { getDataFromDB } from '@/server/utils/getDataFromDB'
import { createToken } from '@/server/utils/createToken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user: TokenData | null = await auth({
    username: body.username,
    passphrase: body.passphrase,
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid username or password',
    })
  }

  return {
    token: createToken(user),
  }
})

async function auth({
  username,
  passphrase,
}: UserCredentials): Promise<TokenData | null> {
  const users: User[] = await getDataFromDB('server/db/users.json')

  const currentUser = users.find((user) => {
    return (
      user.credentials.username === username
      && user.credentials.passphrase === passphrase
    )
  })

  if (currentUser) {
    const { id, active, name, surname } = currentUser
    return {
      userId: id,
      active,
      name,
      surname,
    }
  }
  return null
}
