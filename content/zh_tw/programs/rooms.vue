<script setup lang="ts">
const { data: rooms } = await import('#loaders/rooms.data')
</script>

<template>
  <p>Current rooms: {{ rooms.length }}</p>
  <ul>
    <li
      v-for="room in rooms"
      :key="room.id"
    >
      {{ room.name['zh-tw'] }} / {{ room.name.en }}
    </li>
  </ul>
</template>
