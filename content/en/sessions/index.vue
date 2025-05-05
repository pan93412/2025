<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const SessionRooms = defineAsyncComponent(() => import('#components/Session/Rooms.vue'))
const SessionTypes = defineAsyncComponent(() => import('#components/Session/SessionTypes.vue'))
const SessionSpeakers = defineAsyncComponent(() => import('#components/Session/Speakers.vue'))
</script>

<template>
  <div class="flex justify-between gap-8">
    <div class="flex-1">
      <h1>Rooms</h1>
      <Suspense>
        <SessionRooms lang="en" />

        <template #fallback>
          <div>Loading sessions...</div>
        </template>
      </Suspense>
    </div>

    <div class="flex-1">
      <h1>Session Types</h1>
      <Suspense>
        <SessionTypes lang="en" />

        <template #fallback>
          <div>Loading session types...</div>
        </template>
      </Suspense>
    </div>

    <div class="flex-1">
      <h1>Speakers</h1>
      <Suspense>
        <SessionSpeakers lang="en" />
        <template #fallback>
          <div>Loading speakers...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style lang="css" scoped>
.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}

.gap-8 {
  gap: 2rem;
}

.justify-between {
  justify-content: space-between;
}
</style>
