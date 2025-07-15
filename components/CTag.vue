<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'active'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
})
</script>

<template>
  <span
    :class="[$style.tag, $style[variant]]"
  >
    <slot />
  </span>
</template>

<style module>
.tag {
  padding: 2px calc(6px + 0.5em);
  border-radius: 999rem;
  font-size: 0.85em;
  font-weight: 400;
  transition: background-color 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: min-content;
  max-width: 100%;
  display: block;
}

.primary {
  background-color: var(--color-primary-400);
  color: var(--color-white);
}

.secondary {
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
}

.active {
  background-color: var(--color-pink-200);
  color: var(--color-pink-700);
}
</style>
