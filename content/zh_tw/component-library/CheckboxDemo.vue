<script setup lang="ts">
import CCheckbox from '#components/CCheckbox.vue'
</script>

<template>
  <div :class="$style.container">
    <CCheckbox name="checkbox1">
      Unchecked
    </CCheckbox>

    <CCheckbox
      checked
      name="checkbox2"
    >
      Checked
    </CCheckbox>
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
