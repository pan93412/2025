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
    <h2>
      {{ formatLevel(sponsorLevels_mapping[level]) }}
    </h2>
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
