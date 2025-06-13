<script setup lang="ts">
const props = withDefaults(defineProps<{
  selected?: boolean
}>(), {
  selected: false,
})
</script>

<template>
  <button
    :class="[$style.triggerItem, { [$style.selected]: props.selected }]"
  >
    <slot />
  </button>
</template>

<style module>
.triggerItem {
  width: 100%;
  border-radius: 4px;
  padding: 2px 8px;
  text-align: center;
  font-size: 14px;
  color: #364153;
  font-family: 'PingFang TC';
  letter-spacing: 0.03em;
}

.selected {
  background-color: #e5e3ff;
  color: #4c4598;
}
</style>
