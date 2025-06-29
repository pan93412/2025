<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const SessionRooms = defineAsyncComponent(() => import('#components/Session/Rooms.vue'))
const SessionTypes = defineAsyncComponent(() => import('#components/Session/SessionTypes.vue'))
const SessionSpeakers = defineAsyncComponent(() => import('#components/Session/Speakers.vue'))
const SessionSubmissions = defineAsyncComponent(() => import('#components/Session/Submissions.vue'))
</script>

<template>
  <div class="flex justify-between gap-8">
    <div class="flex-1">
      <h1>教室</h1>
      <Suspense>
        <SessionRooms lang="zh-tw" />

        <template #fallback>
          <div>正在載入教室⋯⋯</div>
        </template>
      </Suspense>
    </div>

    <div class="flex-1">
      <h1>議程類型</h1>
      <Suspense>
        <SessionTypes lang="zh-tw" />

        <template #fallback>
          <div>正在載入議程類型⋯⋯</div>
        </template>
      </Suspense>
    </div>

    <div class="flex-1">
      <h1>講者</h1>
      <Suspense>
        <SessionSpeakers lang="zh-tw" />
        <template #fallback>
          <div>正在載入講者⋯⋯</div>
        </template>
      </Suspense>
    </div>

    <div class="flex-1">
      <h1>議程</h1>
      <Suspense>
        <SessionSubmissions lang="zh-tw" />
        <template #fallback>
          <div>正在載入議程⋯⋯</div>
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
