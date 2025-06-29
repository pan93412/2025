<script setup lang="ts">
import CButton from '#components/CButton.vue'
</script>

<template>
  <div :class="$style.container">
    <CButton variant="secondary">
      Plain Secondary Button
    </CButton>

    <CButton variant="secondary">
      <template #icon>
        <IconPhCalendarPlus />
      </template>

      Secondary Button with Icon
    </CButton>

    <CButton
      disabled
      variant="secondary"
    >
      Disabled Secondary Button
    </CButton>
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
