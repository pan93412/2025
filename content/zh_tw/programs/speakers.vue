<script setup lang="ts">
const { data: speakers } = await import('#loaders/speakers.data')
</script>

<template>
  <ul>
    <li
      v-for="speaker in speakers"
      :key="speaker.id"
    >
      <img
        :alt="speaker.name['zh-tw']"
        :src="speaker.avatar"
        width="30"
      >
      {{ speaker.name['zh-tw'] }} / {{ speaker.name.en }}
    </li>
  </ul>
</template>
