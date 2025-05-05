<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  lang: 'en' | 'zh-tw'
}>()

const dataSource = {
  'en': () => import('#loaders/rooms.en.data.ts'),
  'zh-tw': () => import('#loaders/rooms.zh-tw.data.ts'),
}

const { data: rooms } = await dataSource[props.lang]()
</script>

<template>
  <p>Current rooms: {{ rooms.length }}</p>
  <ul>
    <li
      v-for="room in rooms"
      :key="room.id"
    >
      {{ room.name }}
    </li>
  </ul>
</template>
