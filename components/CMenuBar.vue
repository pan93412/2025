<script setup lang="ts">
interface MenuItem {
  key: string
  label: string
}

defineProps<{
  items: MenuItem[]
}>()

const value = defineModel<string>()
</script>

<template>
  <div class="menu-bar">
    <button
      v-for="item in items"
      :key="item.key"
      :class="{ active: value === item.key }"
      @click="value = item.key"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.menu-bar {
  display: flex;
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 6px;
  padding: 4px;

  > button {
    padding: 2px 8px;
    background: transparent;
    border-radius: 4px;
    font-size: var(--text-sm);
    transition: all 0.2s;
    color: var(--color-gray-700);

    &.active {
      cursor: pointer;
      background-color: var(--color-primary-50);
      color: var(--color-primary-600);
    }
  }
}
</style>
