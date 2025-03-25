<template>
  <div class="layout">
    <header class="layout__header">
      <AppContainer class="layout__container">
        <p
          v-if="user"
          class="layout__user-name"
        >
          {{ `${user.name} ${user.surname}` }}
        </p>
        <UiButton @click="signOut">
          Sign Out
        </UiButton>
      </AppContainer>
    </header>
    <div class="layout__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const user = computed(() => accountStore.user)
const accountStore = useAccountStore()

const token = useCookie('token')
const router = useRouter()

function signOut() {
  token.value = ''
  router.replace('/auth')
}
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  &__header {
    position: relative;
    z-index: 1;
    padding-block: 8px;
    box-shadow: 0px 0px 8px 2px rgba($black, 0.15);;
  }
  &__user-name {
    margin-block: 0;
    font-size: 20px;
  }
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
