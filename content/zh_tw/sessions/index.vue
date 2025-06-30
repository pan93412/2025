<script setup lang="ts">
import { data as submissions } from '#loaders/allSubmissions.zh-tw.data.ts'
</script>

<template>
  <ol
    v-for="submission in submissions"
    :key="submission.code"
  >
    <li>
      <ul>
        <li>
          標題：<a :href="`/sessions/${submission.code}`">
            {{ submission.title }}
          </a>
        </li>

        <li>
          摘要：{{ submission.description }}
        </li>

        <li>
          教室：{{ submission.room?.id }} {{ submission.room?.name }}
        </li>

        <li>
          講者：{{ submission.speakers?.map((speaker) => speaker.name).join(', ') }}
        </li>

        <li>
          議程軌：{{ submission.track?.id }} {{ submission.track?.name ?? '??' }}
        </li>

        <li>
          Raw data:
          <pre>{{ JSON.stringify(submission, null, 2) }}</pre>
        </li>
      </ul>
    </li>
  </ol>
</template>
