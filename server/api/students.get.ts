import type { Student } from '@/server/types/students'
import { getDataFromDB } from '@/server/utils/getDataFromDB'
import type { TokenData } from '@/server/types/user'

export default defineEventHandler(async (event) => {
  const { decodedToken } = event.context
  if (decodedToken) {
    const { name, surname }: TokenData = decodedToken
    const students: Student[] = await getDataFromDB('server/db/students.json')
    return {
      user: { name, surname },
      students,
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized',
  })
})
