<script setup lang="ts">
const { data: sessionTypes } = await import('#loaders/sessionTypes.data')
</script>

<template>
  <p>Current session types: {{ sessionTypes.length }}</p>
  <ul>
    <li
      v-for="sessionType in sessionTypes"
      :key="sessionType.id"
    >
      {{ sessionType.name['zh-tw'] }} / {{ sessionType.name.en }}
    </li>
  </ul>
</template>
