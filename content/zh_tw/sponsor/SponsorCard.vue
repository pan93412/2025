<script setup lang="ts">
import type { Sponsor } from '#loaders/sponsor.data'

defineProps<{ sponsor: Sponsor }>()
</script>

<template>
  <div
    class="sponsor-card"
  >
    <div class="sponsor-image-wrap">
      <a :href="sponsor.link">
        <img
          :alt="sponsor['name:zh-TW']"
          class="sponsor-image"
          :src="sponsor.image ?? '#'"
        >
      </a>
    </div>
    <div class="sponsor-content-wrap">
      <h3 class="sponsor-name">
        <a :href="sponsor.link">
          {{ sponsor['name:en'] }}
        </a>
      </h3>
      <input
        v-show="false"
        :id="`sponsor-${sponsor.id}`"
        type="checkbox"
      >
      <div class="sponsor-info">
        <p v-html="sponsor['intro:zh-TW']" />
      </div>
      <label
        :for="`sponsor-${sponsor.id}`"
      />
    </div>
    <span
      v-if="sponsor.type === '3'"
      class="badge"
    >
      累計 {{ sponsor.times }} 年合作
    </span>
    <span
      v-else-if="sponsor.type === '2'"
      class="badge"
    >
      累計 {{ sponsor.times }} 年贊助
    </span>
    <span
      v-else-if="sponsor.type === '1'"
      class="badge"
    >
      連續 {{ sponsor.times }} 年贊助
    </span>
  </div>
</template>

<style scoped>
a {
  font-weight: bold;
  color: var(--vp-c-brand-3);
  text-decoration: none;
}

.sponsor-card {
  position: relative;
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  background: var(--vp-color-sponsor-card-bg);
  border: 1px solid var(--vp-color-sponsor-card-border);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  gap: 0 15px;
}

.sponsor-card:hover {
  transform: translateY(-4px);
}

.sponsor-image-wrap {
  position: relative;
}

.sponsor-image-wrap img {
  min-width: 240px;
  aspect-ratio: 3 / 2;
  position: sticky;
  top: 75px;
  margin-top: 50px;
}

.sponsor-info {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
}

.sponsor-content-wrap label::after {
  content: '閱讀更多';
  color: var(--vp-c-brand-3);
  font-weight: bold;
  margin-left: 4px;
  display: block;
  cursor: pointer;
}

.sponsor-content-wrap input:checked ~ label::after {
  content: '較少顯示';
}

.sponsor-content-wrap input:checked ~ .sponsor-info {
  -webkit-line-clamp: none;
}

.badge {
  width: 185px;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  background: var(--vp-c-brand-3);
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  transform: translateY(70%) translateX(-15%) rotate(-30deg);
  font-size: 0.8em;
}

@media screen and (max-width: 600px) {
  .sponsor-card {
    flex-direction: column;
  }

  .sponsor-image-wrap img {
    position: static;
    margin-top: 0;
  }
}
</style>
