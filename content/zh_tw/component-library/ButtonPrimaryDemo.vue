<script setup lang="ts">
import CButton from '#components/CButton.vue'
</script>

<template>
  <div :class="$style.container">
    <CButton variant="primary">
      Plain Primary Button
    </CButton>

    <CButton variant="primary">
      <template #icon>
        <IconPhCalendarPlus />
      </template>

      Primary Button with Icon
    </CButton>

    <CButton
      disabled
      variant="primary"
    >
      Disabled Primary Button
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
