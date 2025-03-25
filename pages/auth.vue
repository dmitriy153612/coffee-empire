<template>
  <main class="main">
    <section class="main__section">
      <div class="main__container">
        <UiForm
          v-model:error-message="authErrorText"
          @submit.prevent="onFormSubmit"
        >
          <template #title>
            Sign In
          </template>
          <UiInput
            v-model="user.username"
            v-model:error="userErrors.username"
            label="Username"
          />
          <UiInput
            v-model="user.password"
            v-model:error="userErrors.password"
            label="Password"
            type="password"
          />
          <template #button>
            <UiButton>
              Sign In
            </UiButton>
          </template>
        </UiForm>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { isFetchError } from '@/types/error'
import type { UserForm } from '@/types/user'

definePageMeta({
  layout: 'auth',
})
const router = useRouter()

const user = reactive<UserForm>({
  username: 'david.jones@creds.com',
  password: '52ccca432ab28afd90969084c061b23c',
})

const userErrors = reactive<UserForm>({
  username: '',
  password: '',
})

const authErrorText = ref('')

async function onFormSubmit() {
  const token = await fetchAuth()
  if (token) {
    setTokenToCookie(token)
    router.replace('/account')
  }
}

async function fetchAuth(): Promise<string | undefined> {
  const isValid = validateForm()
  if (!isValid) return

  try {
    const res = await $fetch('/api/auth', {
      method: 'POST',
      body: {
        username: user.username,
        passphrase: user.password,
      },
    })

    return res.token
  }
  catch (err) {
    handleAuthErrors(err)
  }
}

function setTokenToCookie(token: string) {
  const cookie = useCookie('token')
  cookie.value = token
}

function handleAuthErrors(error: unknown) {
  if (isFetchError(error)) {
    if (error.statusCode === 401) {
      authErrorText.value = 'Authentication failed. Check your username and password.'
    }
  }
  else {
    authErrorText.value = 'Unknown error, please try again later.'
  }
}

function validateForm(): boolean {
  let isValid = true
  const requiredMessage = 'Required field'

  Object.entries(user).forEach(([key, value]) => {
    const isPasswordField = key === 'password'
    if (!value || (!isPasswordField && !value.trim())) {
      userErrors[key as keyof UserForm] = requiredMessage
      isValid = false
    }
  })

  return isValid
}
</script>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  &__section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 16px;
    background-color: $black;
  }
  &__container {
    max-width: 400px;
    width: 100%;
  }
}
</style>
