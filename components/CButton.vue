<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'basic'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
})
</script>

<template>
  <button
    class="button"
    :class="`button-${variant}`"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 6px;
  font-size: var(--text-sm);
  font-weight: 400;
  line-height: 1;
  padding: 8px 10px;
  min-height: 36px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none !important;

    &:hover {
      transform: none !important;
    }
  }
}

.button-primary {
  background-color: var(--color-primary-400);
  color: var(--color-white);

  &:hover:not(:disabled) {
    background-color: var(--color-primary-500);
  }

  &:active:not(:disabled) {
    background-color: var(--color-primary-600);
  }
}

.button-secondary {
  background-color: var(--color-white);
  color: var(--color-primary-400);
  border: 1px solid var(--color-primary-400);

  &:hover:not(:disabled) {
    background-color: var(--color-primary-100);
  }

  &:active:not(:disabled) {
    background-color: var(--color-gray-300);
  }
}

.button-basic {
  background-color: transparent;
  color: var(--color-gray-500);

  &:hover:not(:disabled) {
    background-color: var(--color-gray-200);
  }

  &:active:not(:disabled) {
    background-color: var(--color-gray-300);
  }
}
</style>
