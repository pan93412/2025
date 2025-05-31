<script setup lang="ts">
import { data } from '#loaders/sponsor.data'
import SponsorCard from './SponsorCard.vue'

defineProps<{ sponsorLevels: string[] }>()
const { groupedSponsors, sponsorLevels_mapping } = data

const formatLevel = (level: string): string => level.charAt(0).toUpperCase() + level.slice(1)
</script>

<template>
  <div
    v-for="level in sponsorLevels"
    :key="level"
  >
    <!-- 顯示贊助層級名稱 -->
    <h2>
      {{ formatLevel(sponsorLevels_mapping[level]) }}
    </h2>

    <!-- 顯示贊助商卡片 -->
    <div v-if="groupedSponsors[level]">
      <SponsorCard
        v-for="sponsor in groupedSponsors[level]"
        :key="sponsor.id"
        :sponsor="sponsor"
      />
    </div>
  </div>
</template>

<style scoped>
.sponsor-card {
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background: var(--vp-color-sponsor-bg);
  color: var(--vp-color-sponsor-muted);
  transition: transform 0.2s;
}

.sponsor-card:hover {
  transform: translateY(-4px);
}

.sponsor-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 10px;
  display: block;
}

.sponsor-link {
  display: inline-block;
  text-decoration: none;
  color: var(--vp-color-sponsor-primary);
  font-weight: bold;
  padding: 5px 10px;
  border: 1px solid var(--vp-color-sponsor-border);
  border-radius: 5px;
  transition:
    background 0.2s,
    color 0.2s;
}

.sponsor-link:hover {
  background: var(--vp-color-sponsor-primary);
  color: white;
}
</style>
