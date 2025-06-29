<script setup lang="ts">
import { data as submissions } from '#loaders/submissions.data'
</script>

<template>
  <p>Received {{ submissions.length }} submissions</p>

  <ul>
    <li
      v-for="submission in submissions"
      :key="submission.id"
    >
      {{ submission.title }} ({{ submission.description }})
    </li>
  </ul>
</template>
