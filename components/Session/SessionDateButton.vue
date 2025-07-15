<script setup lang="ts">
const props = withDefaults(defineProps<{
  selected?: boolean
}>(), {
  selected: false,
})
</script>

<template>
  <button
    class="session-date-button"
    :class="{ selected: props.selected }"
  >
    <slot />
  </button>
</template>

<style scoped>
.session-date-button {
  width: 12rem;
  font-size: 28px;
  font-weight: bold;
  font-style: italic;
  color: var(--color-white);
  background-color: var(--color-gray-300);
  padding: 0.5rem 3rem;
  border: 3px solid var(--color-gray-700);
  border-radius: 999rem;
  box-shadow: 0px 4px 0px 0px var(--color-gray-700);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 6px 0px 0px var(--color-gray-700);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 2px 0px 0px var(--color-gray-700);
  }

  &.selected {
    background-color: var(--color-primary-400);
    cursor: default;

    &:hover {
      background-color: var(--color-primary-500);
      transform: none;
      box-shadow: 0px 4px 0px 0px var(--color-gray-700);
    }
  }
}
</style>
