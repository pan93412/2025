<script setup lang="ts">
import { data } from '#loaders/sponsor.data'

const { groupedSponsors, sponsorLevels, sponsorLevels_mapping } = data

// 轉換 Google Drive 圖片 URL
function convertDriveLinkToImageUrl(driveLink: string): string {
  const match = driveLink.match(/(?:\/d\/|id=)([^/?]+)/)
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : driveLink
}
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
                :src="convertDriveLinkToImageUrl(sponsor.image)"
              >
              <p class="name">{{ sponsor['name:zh-TW'] }}</p>
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
  color: #555;
  margin-bottom: 15px;
  text-transform: capitalize;
}

.dark .level-title {
  color: #eee;
}

.sponsor-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.sponsor {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.2s;
  width: 100%;
}

.sponsor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  background-color: #f8f9fa;
  padding: 5px;
  width: 100%;
  min-width: 150px;
  min-height: 170px;
}

.sponsor:hover {
  transform: translateY(-2px);
}

.sponsor img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 8px;
}

.sponsor .name {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  text-align: center;
  width: 100%;
  word-wrap: break-word;
}
</style>
