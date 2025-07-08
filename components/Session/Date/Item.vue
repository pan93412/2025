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
  font-size: 28px;
  font-weight: bold;
  font-style: italic;
  color: var(--color-white);
  background-color: var(--color-gray-300);
  padding: 0.5rem 3rem;
  border: 3px solid var(--color-gray-700);
  border-radius: 999rem;
  box-shadow: 0px 4px 0px 0px var(--color-gray-700);

  &.selected {
    background-color: var(--color-primary-400);
  }
}
</style>
