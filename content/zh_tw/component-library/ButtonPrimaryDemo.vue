<script setup lang="ts">
import Button from '#components/Button.vue'
</script>

<template>
  <div :class="$style.container">
    <Button variant="primary">
      Plain Primary Button
    </Button>

    <Button variant="primary">
      <template #icon>
        <IconPhCalendarPlus />
      </template>

      Primary Button with Icon
    </Button>

    <Button
      disabled
      variant="primary"
    >
      Disabled Primary Button
    </Button>
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
