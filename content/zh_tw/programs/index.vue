<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import VLoading from './v-loading.vue'

const RoomComponent = defineAsyncComponent({
  loader: () => import('./rooms.vue'),
  loadingComponent: () => VLoading,
})

const SessionTypeComponent = defineAsyncComponent({
  loader: () => import('./session-types.vue'),
  loadingComponent: () => VLoading,
})

const SpeakersComponent = defineAsyncComponent({
  loader: () => import('./speakers.vue'),
  loadingComponent: () => VLoading,
})
</script>

<template>
  <h1>Rooms</h1>
  <Suspense>
    <RoomComponent />
  </Suspense>

  <h1>Session Types</h1>
  <Suspense>
    <SessionTypeComponent />
  </Suspense>

  <h1>Speakers</h1>
  <Suspense>
    <SpeakersComponent />
  </Suspense>
</template>
