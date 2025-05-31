<script setup lang="ts">
import { data } from '#loaders/sponsor.data'

const { groupedSponsors, sponsorLevels, sponsorLevels_mapping } = data
</script>

<template>
  <div class="sponsor-footer-content">
    <div
      v-for="level in sponsorLevels"
      :key="level"
      class="sponsor-group"
    >
      <div v-if="groupedSponsors[level]?.length">
        <h3 class="level-title">
          {{ sponsorLevels_mapping[level] }}
        </h3>
        <div class="sponsor-list">
          <a
            v-for="sponsor in groupedSponsors[level]"
            :key="sponsor.id"
            class="sponsor"
            :href="sponsor.link"
            rel="noopener"
            target="_blank"
          >
            <div class="sponsor-item">
              <img
                :alt="sponsor['name:zh-TW']"
                :src="sponsor.image ?? '#'"
              >
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sponsor-footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.sponsor-group {
  margin-bottom: 30px;
}

.level-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-transform: capitalize;
}

.sponsor-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.sponsor {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.2s;
  width: 100%;
}

.sponsor-item {
  padding: 8px;
  min-width: 120px;
  min-height: 120px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.sponsor:hover img {
  transform: scale(1.5); /* 圖片 hover 放大 */
}

.sponsor img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease;
}
</style>
