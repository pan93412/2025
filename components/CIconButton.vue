<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'basic'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
})

const buttonClasses = computed(() => {
  const baseClasses = 'button-base'
  const variantClass = `button-${props.variant}`
  const disabledClass = props.disabled ? 'button-disabled' : ''

  return [baseClasses, variantClass, disabledClass].filter(Boolean).join(' ')
})
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.button-base {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-family:
    'PingFang TC',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  padding: 8px 10px;
  min-height: 36px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
}

/* Primary variant */
.button-primary {
  background-color: #7f73fe;
  color: #ffffff;
}

.button-primary:hover:not(.button-disabled) {
  background-color: #665ccb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 92, 203, 0.3);
}

.button-primary:active:not(.button-disabled) {
  background-color: #5a4fb8;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(102, 92, 203, 0.2);
}

/* Basic variant */
.button-basic {
  background-color: transparent;
  color: #7f73fe;
  border: 1px solid #7f73fe;
}

.button-basic:hover:not(.button-disabled) {
  background-color: #7f73fe;
  color: #ffffff;
}

.button-basic:active:not(.button-disabled) {
  background-color: #6b5dfc;
}

/* Disabled state */
.button-disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.button-disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}
</style>
