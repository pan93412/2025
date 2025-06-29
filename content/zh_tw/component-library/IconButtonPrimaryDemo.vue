<script setup lang="ts">
import IconButton from '#components/IconButton.vue'
</script>

<template>
  <div :class="$style.container">
    <IconButton variant="primary">
      <IconPhCalendarPlus />
    </IconButton>

    <IconButton variant="primary">
      <IconPhHeart />
    </IconButton>

    <IconButton
      disabled
      variant="primary"
    >
      <IconPhCalendarPlus />
    </IconButton>
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
