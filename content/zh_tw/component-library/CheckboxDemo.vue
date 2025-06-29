<script setup lang="ts">
import Checkbox from '#components/Checkbox.vue'
</script>

<template>
  <div :class="$style.container">
    <Checkbox name="checkbox1">
      Unchecked
    </Checkbox>

    <Checkbox
      checked
      name="checkbox2"
    >
      Checked
    </Checkbox>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}
</style>
