<script setup lang="ts">
import CButton from '#components/CButton.vue'
</script>

<template>
  <div :class="$style.container">
    <CButton variant="basic">
      Plain Basic Button
    </CButton>

    <CButton variant="basic">
      <template #icon>
        <IconPhCalendarPlus />
      </template>

      Basic Button with Icon
    </CButton>

    <CButton
      disabled
      variant="basic"
    >
      Disabled Basic Button
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
