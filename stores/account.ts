import type { User } from '@/types/user'
import type { Student } from '@/types/student'
import { isFetchError } from '@/types/error'

export const useAccountStore = defineStore('accountStore', () => {
  const router = useRouter()

  const user = shallowRef<User | null>(null)
  const students = shallowRef<Student[]>([])

  async function fetchGetAccountData() {
    const token = useCookie('token')
    try {
      const res = await $fetch('/api/students', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      user.value = res.user
      students.value = res.students
    }
    catch (err) {
      if (isFetchError(err)) {
        router.replace('/auth')
        token.value = null
      }
      else {
        console.error(err)
      }
    }
  }

  return {
    user,
    students,
    fetchGetAccountData,
  }
})
