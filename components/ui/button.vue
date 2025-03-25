<template>
  <button
    :disabled="disabled"
    class="button"
    :class="{ 'button--disabled': disabled }"
    :tabindex="disabled ? -1 : 1"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  disabled?: boolean
}>(), {
  disabled: false,
})
</script>

<style scoped lang="scss">
  .button {
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    background-color: $black;
    color: $slate-50;
    outline: none;
    cursor: pointer;
    @include transition(background-color, color);

    &:focus-visible,
    &:hover {
      background-color: $yellow-300;
      color: $black;
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
</style>
