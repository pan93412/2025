<script setup lang="ts">
import IconsBookmark from '#components/Icons/Bookmark.vue'
</script>

<template>
  <div class="bookmark-container">
    <IconsBookmark />
    <IconsBookmark bookmarked />
  </div>
</template>

<style scoped>
.bookmark-container {
  display: flex;
  gap: 10px;
}
</style>
