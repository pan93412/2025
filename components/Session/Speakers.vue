<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  lang: 'en' | 'zh-tw'
}>()

const dataSource = {
  'en': () => import('#loaders/speakersBrief.en.data.ts'),
  'zh-tw': () => import('#loaders/speakersBrief.zh-tw.data.ts'),
}

const { data: speakers } = await dataSource[props.lang]()
</script>

<template>
  <ul>
    <li
      v-for="speaker in speakers"
      :key="speaker.id"
    >
      <img
        :alt="speaker.name"
        :src="speaker.avatar"
        width="30"
      >
      {{ speaker.name }}
    </li>
  </ul>
</template>
