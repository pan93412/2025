<script setup lang="ts">
import { computed } from 'vue'
import Bookmark from './Icons/Bookmark.vue'

import Tag from './Tag.vue'

interface Props {
  title: string
  time: string
  speaker: string
  bookmarked?: boolean
  tagText?: string
  status?: 'default' | 'actived' | 'disabled'
}

const props = withDefaults(defineProps<Props>(), {
  bookmarked: false,
  tagText: '主議程軌',
  status: 'default',
})

const tagColor = computed(() => props.bookmarked ? '#fccee8' : '#ccc7ff')
const tagTextColor = computed(() => props.bookmarked ? '#c6005c' : '#4c4598')
</script>

<template>
  <div
    :class="[
      $style.card,
      $style[`card${props.status.charAt(0).toUpperCase() + props.status.slice(1)}`],
      props.bookmarked ? $style.cardBookmarked : '',
    ]"
  >
    <!-- Header with title, time and bookmark -->
    <div :class="$style.header">
      <div :class="$style.topContent">
        <div
          :class="[
            $style.title,
            props.status === 'disabled' ? $style.titleDisabled : '',
            props.bookmarked ? $style.titleBookmarked : '',
          ]"
        >
          {{ props.title }}
        </div>
        <div :class="[$style.time, props.bookmarked ? $style.timeBookmarked : '']">
          {{ props.time }}
        </div>
      </div>
      <div :class="$style.bookmarkContainer">
        <Bookmark :bookmarked="props.bookmarked" />
      </div>
    </div>

    <!-- Speaker -->
    <div :class="[$style.speaker, props.bookmarked ? $style.speakerBookmarked : '']">
      {{ props.speaker }}
    </div>

    <!-- Tag -->
    <div :class="$style.tagContainer">
      <Tag
        :color="tagColor"
        :text-color="tagTextColor"
      >
        {{ props.tagText }}
      </Tag>
    </div>
  </div>
</template>

<style module>
.card {
  background-color: #e5e3ff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 6px 8px 8px;
}

.cardDisabled {
  background-color: rgba(229, 227, 255, 0.8);
  border: 1px dashed #998ffe;
}

.cardDefault {
  border: 1px solid #ccc7ff;
}

.cardActived {
  border: 2px solid #7f73fe;
  box-shadow:
    0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -2px rgba(0, 0, 0, 0.05);
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

.titleDisabled {
  opacity: 0.6;
}

/* Bookmarked theme styles */
.cardBookmarked {
  background-color: #fce7f3;
}

.cardBookmarked.cardDefault {
  border-color: #fccee8;
}

.cardBookmarked.cardActived {
  background-color: #fdf2f8;
  border-color: #fb64b6;
}

.cardBookmarked.cardDisabled {
  background-color: rgba(252, 231, 243, 0.8);
  border-color: #fccee8;
}

.titleBookmarked {
  color: #e60076;
}

.timeBookmarked {
  color: #e60076;
}

.speakerBookmarked {
  color: #e60076;
}
</style>
