<script setup lang="ts">
import CIconButton from '#components/CIconButton.vue'
</script>

<template>
  <div :class="$style.container">
    <CIconButton variant="basic">
      <IconPhCalendarPlus />
    </CIconButton>

    <CIconButton variant="basic">
      <IconPhHeart />
    </CIconButton>

    <CIconButton
      disabled
      variant="basic"
    >
      <IconPhCalendarPlus />
    </CIconButton>
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
