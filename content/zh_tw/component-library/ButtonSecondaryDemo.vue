<script setup lang="ts">
import Button from '#components/Button.vue'
</script>

<template>
  <div :class="$style.container">
    <Button variant="secondary">
      Plain Secondary Button
    </Button>

    <Button variant="secondary">
      <template #icon>
        <IconPhCalendarPlus />
      </template>

      Secondary Button with Icon
    </Button>

    <Button
      disabled
      variant="secondary"
    >
      Disabled Secondary Button
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
