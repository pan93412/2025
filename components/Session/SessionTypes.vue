<script setup lang="ts">
const props = defineProps<{
  lang: 'en' | 'zh-tw'
}>()

const dataSource = {
  'en': () => import('#loaders/sessionTypes.en.data.ts'),
  'zh-tw': () => import('#loaders/sessionTypes.zh-tw.data.ts'),
}

const { data: sessionTypes } = await dataSource[props.lang]()
</script>

<template>
  <p>Current session types: {{ sessionTypes.length }}</p>
  <ul>
    <li
      v-for="sessionType in sessionTypes"
      :key="sessionType.id"
    >
      {{ sessionType.name }}
    </li>
  </ul>
</template>
