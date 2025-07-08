<script setup lang="ts">
import type { SubmissionResponse } from '#loaders/types.ts'

defineProps<{
  opened: boolean
  session?: SubmissionResponse
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div>
    <!--  -->
  </div>
</template>

<style scoped>

</style>
