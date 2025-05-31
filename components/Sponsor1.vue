<script setup lang="ts">
import { data } from '#loaders/sponsor.data'
import { ref } from 'vue'

// 狀態管理
const { groupedSponsors, sponsorLevels, sponsorLevels_mapping } = data
const expandedSponsor = ref<string | null>(null)

// 切換展開的贊助商
function toggleExpand(sponsorId: string) {
  expandedSponsor.value = expandedSponsor.value === sponsorId ? null : sponsorId
}
</script>

<template>
  <div
    v-for="level in sponsorLevels"
    :key="level"
  >
    <div v-if="groupedSponsors[level] && groupedSponsors[level].length">
      <h2 class="level-title">
        {{ sponsorLevels_mapping[level] }}
      </h2>
      <div class="sponsor-list">
        <div
          v-for="sponsor in groupedSponsors[level]"
          :key="sponsor.id"
          class="sponsor-card"
          @click="toggleExpand(sponsor.id)"
        >
          <div class="sponsor-image-wrapper">
            <img
              :alt="sponsor['name:zh-TW']"
              class="sponsor-image"
              :src="sponsor.image ?? '#'"
            >
          </div>
          <!-- 右上角連結 -->
          <a
            class="sponsor-link"
            :href="sponsor.link"
            rel="noopener noreferrer"
            target="_blank"
          >
            🔗
          </a>
          <h3 class="sponsor-name">
            {{ sponsor['name:zh-TW'] }}
          </h3>

          <!-- Expandable Section -->
          <transition name="fade">
            <div
              v-if="expandedSponsor === sponsor.id"
              class="sponsor-info"
            >
              <p v-html="sponsor['intro:zh-TW']" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Sponsor Level Styling */
.level-title {
  font-size: 1.5rem;
  color: var(--vp-color-sponsor-text);
  margin-top: 30px;
  border-bottom: 2px solid var(--vp-color-sponsor-border);
  padding-bottom: 5px;
}

/* Sponsor List (Grid) */
.sponsor-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

/* Sponsor Card */
.sponsor-card {
  display: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--vp-color-sponsor-bg);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  text-align: center;
  cursor: pointer;
}

.sponsor-card:hover {
  transform: translateY(-5px);
}

/* 圖片容器，用來維持 3:2 比例並置中 */
.sponsor-image-wrapper {
  width: 100%;
  aspect-ratio: 3 / 2;
  max-width: 400px;
  margin: 0 auto 10px;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Sponsor Image */
.sponsor-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Sponsor Name */
.sponsor-name {
  font-size: 1.2rem;
  color: var(--vp-color-sponsor-text);
  margin: 10px 0;
  cursor: pointer;
  transition: color 0.2s;
}

.sponsor-name:hover {
  color: var(--vp-color-sponsor-primary);
}

/* Sponsor Information (Expandable Section) */
.sponsor-info {
  background: var(--vp-color-sponsor-surface);
  padding: 10px;
  border-radius: 5px;
  text-align: left;
  margin-top: 10px;
}

.sponsor-info p {
  font-size: 0.9rem;
  color: var(--vp-color-sponsor-muted);
  margin-bottom: 10px;
}

/* Visit Link (Right Top Corner) */
.sponsor-link {
  display: inline-block;
  text-decoration: none;
  color: var(--vp-color-sponsor-primary);
  border: 1px solid var(--vp-color-sponsor-primary);
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition:
    background 0.2s,
    color 0.2s;
  position: fixed;
  top: 10px;
  right: 10px;
}

.sponsor-link:hover {
  background: var(--vp-color-sponsor-primary);
  color: white;
}

/* Transition for Expand/Collapse */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
