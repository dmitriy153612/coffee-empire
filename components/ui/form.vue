<template>
  <form
    class="form"
    @submit.prevent="handleSubmit"
    @input="clearErrorMessage"
  >
    <Component
      :is="titleTag"
      v-if="$slots.title"
      class="form__title"
    >
      <slot name="title" />
    </Component>
    <p
      v-if="errorMessage"
      class="form__error"
    >
      {{ errorMessage }}
    </p>
    <div class="form__input-slot">
      <slot />
    </div>
    <div class="form__button-slot">
      <slot name="button" />
    </div>
  </form>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4'
  errorMessage: string
}>(), {
  titleTag: 'h1',
})

const emit = defineEmits<{
  (e: 'submit', event: Event): void
  (e: 'update:errorMessage', empty: string): void
}>()

function clearErrorMessage() {
  if (props.errorMessage) {
    emit('update:errorMessage', '')
  }
}

function handleSubmit(event: Event) {
  emit('submit', event)
}
</script>

<style scoped lang="scss">
.form {
  padding: 32px 16px;
  border-radius: 20px;
  background-color: $slate-50;
  &__title {
    margin-block: 0 26px;
    font-size: 26px;
  }
  &__error {
    margin-top: 0;
    font-size: 18px;
    font-weight: 600;
    color: $error-color;
  }
  &__input-slot {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    row-gap: 20px;
  }
  &__button-slot {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
