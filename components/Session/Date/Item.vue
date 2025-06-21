<script setup lang="ts">
const props = withDefaults(defineProps<{
  selected?: boolean
}>(), {
  selected: false,
})
</script>

<template>
  <div :class="[$style.dateTab, { [$style.selected]: props.selected }]">
    <slot />
  </div>
</template>

<style module>
.dateTab {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 36em;
  border: 3px solid #364153;
  box-shadow: 0 4px 0 #364153;
  background-color: #d1d5dc;
  color: #fff;
  font-size: 1.75em;
  font-weight: 700;
  font-style: italic;
  font-family: Inter;
  line-height: 1.2;
  text-align: center;
  user-select: none;
}

.selected {
  background-color: #7f73fe;
}
</style>
