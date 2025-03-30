<script setup>
import { marked } from 'marked'
import { ref } from 'vue'

defineProps(['sponsor'])
const expanded = ref(false)

function toggleExpand() {
  expanded.value = !expanded.value
}

const parseMarkdown = (text) => marked(text || '')
</script>

<template>
  <div
    class="sponsor-card"
    @click="toggleExpand"
  >
    <img
      :alt="sponsor.name"
      class="sponsor-image"
      :src="sponsor.image"
    >
    <h3 class="sponsor-name">
      {{ sponsor['name:zh-TW'] }}
    </h3>

    <transition name="fade">
      <div
        v-if="expanded"
        class="sponsor-info"
      >
        <p v-html="parseMarkdown(sponsor['intro:zh-TW'])" />
        <a
          class="sponsor-link"
          :href="sponsor.link"
          target="_blank"
        >Visit Website</a>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.sponsor-card {
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.sponsor-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
.sponsor-link {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}
</style>
