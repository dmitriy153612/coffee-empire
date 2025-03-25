import fs from 'node:fs/promises'
import type { Student } from '@/server/types/students'
import type { User } from '@/server/types/user'

export async function getDataFromDB(path: 'server/db/users.json'): Promise<User[]>
export async function getDataFromDB(path: 'server/db/students.json'): Promise<Student[]>
export async function getDataFromDB(
  path: 'server/db/users.json' | 'server/db/students.json',
): Promise<Student[] | User[]> {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' })
    return await JSON.parse(data)
  }
  catch (err) {
    console.error(err)
    return []
  }
}
