<script setup lang="ts">
import type { Sponsor } from '#loaders/sponsor.data'
import { marked } from 'marked'
import { ref } from 'vue'

defineProps<{ sponsor: Sponsor }>()

const expanded = ref(false)

function toggleExpand() {
  expanded.value = !expanded.value
}

const parseMarkdown = (text: string) => marked(text || '')
</script>

<template>
  <div
    class="sponsor-card"
    @click="toggleExpand"
  >
    <a
      class="sponsor-link"
      :href="sponsor.link"
      rel="noopener noreferrer"
      target="_blank"
    >
      🔗 Visit Website
    </a>
    <img
      :alt="sponsor['name:zh-TW']"
      class="sponsor-image"
      height="100"
      :src="sponsor.image"
      width="100"
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
      </div>
    </transition>
  </div>
</template>

<style scoped>
.sponsor-card {
  position: relative;
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* Right-top link button */
.sponsor-link {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.85rem;
  text-decoration: none;
  background: #fff;
  color: #007bff;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #007bff;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  z-index: 1;
}

/* Icon-style link for dark mode */
.dark .sponsor-link {
  background: #f0f4ff;
  color: #4ea1ff;
  border-color: #4ea1ff;
}

.dark .sponsor-link:hover {
  background: #4ea1ff;
  color: #000;
}
</style>
