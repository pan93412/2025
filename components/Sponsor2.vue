<script setup lang="ts">
import { data } from '#loaders/sponsor.data'
import SponsorCard1 from './SponsorCard1.vue'

const { groupedSponsors, sponsorLevels, sponsorLevels_mapping } = data

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
      <SponsorCard1
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
}

.dark .sponsor-card {
  background: linear-gradient(135deg, #dcdcdc 0%, #f5f5f5 100%);
  color: #222;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition:
    transform 0.2s,
    box-shadow 0.3s;
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
  color: #007bff;
  font-weight: bold;
  padding: 5px 10px;
  border: 1px solid #007bff;
  border-radius: 5px;
  transition:
    background 0.2s,
    color 0.2s;
}

.dark .sponsor-link {
  color: #4ea1ff;
  border-color: #4ea1ff;
}

.dark .sponsor-link:hover {
  background: #4ea1ff;
  color: #000;
}
</style>
