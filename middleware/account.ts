export default defineNuxtRouteMiddleware(async () => {
  const accountStore = useAccountStore()
  await accountStore.fetchGetAccountData()
})
