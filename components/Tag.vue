<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '#e0e0e0',
  },
})
</script>

<template>
  <span
    :class="$style.tag"
    :style="{ backgroundColor: color }"
  >
    <slot />
  </span>
</template>

<style module>
.tag {
  padding: 0.25em 0.75em;
  border-radius: 1em;
  font-size: 0.85em;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  transition: background-color 0.2s;
}
</style>
