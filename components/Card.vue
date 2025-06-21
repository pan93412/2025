<script setup lang="ts">
import Bookmark from './Icons/Bookmark.vue'
import Tag from './Tag.vue'

interface Props {
  title: string
  time: string
  speaker: string
  bookmarked?: boolean
  tagText?: string
  tagColor?: string
}

withDefaults(defineProps<Props>(), {
  bookmarked: false,
  tagText: '主議程軌',
  tagColor: '#ccc7ff',
})
</script>

<template>
  <div :class="$style.card">
    <!-- Header with title, time and bookmark -->
    <div :class="$style.header">
      <div :class="$style.topContent">
        <div :class="$style.title">
          {{ title }}
        </div>
        <div :class="$style.time">
          {{ time }}
        </div>
      </div>
      <div :class="$style.bookmarkContainer">
        <Bookmark :bookmarked="bookmarked" />
      </div>
    </div>

    <!-- Speaker -->
    <div :class="$style.speaker">
      {{ speaker }}
    </div>

    <!-- Tag -->
    <div :class="$style.tagContainer">
      <Tag :color="tagColor">
        {{ tagText }}
      </Tag>
    </div>
  </div>
</template>

<style module>
.card {
  background-color: #e5e3ff;
  border: 1px solid #ccc7ff;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 2px;

  padding: 8px 6px 8px 8px;
}

.header {
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: flex-start;
  justify-content: space-between;

  width: 100%;
}

.topContent {
  display: flex;
  flex-direction: column;
  gap: 2px;

  width: 100%;
}

.title {
  font-family: 'PingFang TC', sans-serif;
  font-weight: 600;
  color: #4c4598;
  line-height: 1.2;
  letter-spacing: 0.42px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.time {
  font-family: 'PingFang TC', sans-serif;
  font-weight: 600;
  color: #4c4598;
  opacity: 0.6;
  letter-spacing: 0.42px;
}

.bookmarkContainer {
  width: 24px;
  height: 24px;
}

.speaker {
  font-family: 'PingFang TC', sans-serif;
  font-weight: 400;
  color: #4c4598;
  font-size: 0.8em;
}

.tagContainer {
  padding: 2px 0;
}
</style>
