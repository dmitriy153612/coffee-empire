<template>
  <div
    class="input-block"
    :class="{
      'input-block--error': updatedError,
    }"
  >
    <label
      class="input-block__label"
      :for="uniqId"
    >
      {{ label }}
    </label>
    <input
      :id="uniqId"
      v-model="updatedModelValue"
      class="input-block__input"
      :type="type"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      v-bind="passwordAutocomlete"
      @input="clearError"
    >
    <p
      v-if="updatedError"
      class="input-block__error"
    >
      {{ updatedError }}
    </p>
  </div>
</template>

<script setup lang="ts">
const uniqId = useId()

const props = withDefaults(defineProps<{
  modelValue: string | number
  label?: string
  type?: 'text' | 'password' | 'number' | 'datetime-local' | 'date'
  error?: string | null
  min?: string | number
  max?: string | number
  placeholder?: string
}>(), {
  type: 'text',
  error: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string | number): void
  (e: 'update:error', error: string): void
  (e: 'input'): void
}>()

const updatedModelValue = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})

const updatedError = computed({
  get: () => props.error,
  set: (newValue) => {
    if (typeof newValue === 'string') {
      emit('update:error', newValue)
    }
  },
})

const passwordAutocomlete = computed(() => {
  return props.type === 'password' ? { autocomplete: 'on' } : null
})

function clearError() {
  updatedError.value = ''
}
</script>

<style scoped lang="scss">
.input-block {
  display: grid;

  &--error & {
    &__input {
      border-color: $error-color;
    }
  }
  &__label {
    margin-bottom: 6px;
    font-size: 16px;
  }
  &__input {
    max-width: 100%;
    width: 100%;
    padding: 8px;
    border: 1px solid $gray-300;
    border-radius: 6px;
    outline: none;
    font-size: 18px;
    @include transition(border-color);
    &:focus-visible,
    &:hover {
      border-color: $black;
    }
  }
  &__error {
    margin-block: 0;
    padding-top: 4px;
    font-size: 14px;
    color: $error-color;
  }
}
</style>
