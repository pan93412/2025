<script setup lang="ts">
import type { SubmissionResponse } from '#loaders/types.ts'

defineProps<{
  open: boolean
  session: SubmissionResponse | null
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
