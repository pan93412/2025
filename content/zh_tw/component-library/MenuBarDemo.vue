<script setup lang="ts">
import CMenuBar from '#components/CMenuBar.vue'
import { ref } from 'vue'

const selectedItem = ref('sessions')
const menuItems = [
  { key: 'sessions', label: '議程' },
  { key: 'favorites', label: '我的收藏' },
]
</script>

<template>
  <CMenuBar
    v-model="selectedItem"
    :items="menuItems"
  />
</template>
