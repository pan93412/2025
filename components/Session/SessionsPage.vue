<script setup lang="ts">
import type SessionModal from '#components/Session/SessionModal.vue'
import type { SubmissionResponse } from '#loaders/types.ts'
import type { Locale } from './session-messages'
import CCard from '#/components/CCard.vue'
import CIconButton from '#/components/CIconButton.vue'
import SessionDateItem from '#/components/Session/Date/Item.vue'
import SessionDateTab from '#/components/Session/Date/Tab.vue'
import { END_HOUR, SessionScheduleLayout, START_HOUR, TIME_SLOT_HEIGHT } from '#utils/session-layout.ts'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vitepress'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { messages } from './session-messages'

const props = defineProps<{
  sessionCode: string | undefined
  submissions: SubmissionResponse[]
  locale: Locale
}>()

// Bookmarked sessions state
const bookmarkedSessions = useStorage('bookmarked-sessions', new Set<string>())

// View state
const selectedView = useStorage<'conference' | 'bookmarked'>('selected-view', 'conference')

// Date selection state
const selectedDate = useStorage<'Aug.9' | 'Aug.10'>('selected-date', 'Aug.9')

// Generate time slots from 8AM to 6PM
const timeSlots = computed(() => {
  const slots = []
  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    const displayHour = hour <= 12 ? hour : hour - 12
    const period = hour < 12 ? 'AM' : 'PM'
    const displayTime = hour === 12 ? '12PM' : `${displayHour}${period}`
    slots.push(displayTime)
  }
  return slots
})

const layout = new SessionScheduleLayout(props.submissions)

// Extract unique rooms from submissions
const rooms = computed(() => {
  const roomMap = new Map()

  props.submissions.forEach((submission) => {
    if (submission.room) {
      roomMap.set(submission.room.id, submission.room)
    }
  })

  // Sort rooms alphabetically by name
  return Array.from(roomMap.values()).sort((a, b) => a.name.localeCompare(b.name))
})

// Get sessions for display
const displaySessions = computed(() => {
  const filteredSessions = props.submissions.filter((session) => {
    if (!session.start) return false
    const startDate = new Date(session.start)
    // Conference dates: 2025-08-09 and 2025-08-10
    if (selectedDate.value === 'Aug.9') {
      return startDate.getFullYear() === 2025 && startDate.getMonth() === 7 && startDate.getDate() === 9
    } else {
      return startDate.getFullYear() === 2025 && startDate.getMonth() === 7 && startDate.getDate() === 10
    }
  })

  if (selectedView.value === 'bookmarked') {
    return filteredSessions.filter((session) =>
      bookmarkedSessions.value.has(session.code),
    )
  }

  return filteredSessions
})

// Toggle bookmark
function toggleBookmark(sessionCode: string) {
  if (bookmarkedSessions.value.has(sessionCode)) {
    bookmarkedSessions.value.delete(sessionCode)
  } else {
    bookmarkedSessions.value.add(sessionCode)
  }
}

// Get sessions for a specific room
function getSessionsForRoom(roomId: number | string) {
  return displaySessions.value.filter((session) =>
    session.room?.id === roomId,
  )
}

const router = useRouter()

const sessionModalRef = ref<InstanceType<typeof SessionModal>>()

function handleOpenSession(sessionCode: string) {
  const pathname = new URL(sessionCode, location.href).pathname
  router.go(pathname)
}

function handleCloseSession() {
  const pathname = new URL('.', location.href).pathname
  router.go(pathname)
}

const openedSession = computed(() => {
  if (props.sessionCode) {
    return props.submissions.find((session) => session.code === props.sessionCode) ?? null
  }

  return null
})

// --- Scroll bottom fade state ---
const scrolledToBottom = ref(true)
const scheduleContainerRef = ref<HTMLElement | null>(null)
const scrollRightFadeRef = ref<HTMLElement | null>(null)
const scrollLeftFadeRef = ref<HTMLElement | null>(null)
const scrolledToLeft = ref(true)

function checkScrollBottom() {
  const el = scheduleContainerRef.value
  if (!el) return
  // 1px buffer for floating point
  scrolledToBottom.value = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
}

// --- Scroll right fade state ---
const scrolledToRight = ref(true)

function checkScrollRight() {
  const el = scheduleContainerRef.value
  if (!el) return
  // 1px buffer for floating point
  scrolledToRight.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
  scrolledToLeft.value = el.scrollLeft <= 1
  // 讓右側遮罩跟著 scrollLeft 移動，並調整高度與 top
  if (scrollRightFadeRef.value) {
    scrollRightFadeRef.value.style.transform = `translateX(${el.scrollLeft}px)`
    scrollRightFadeRef.value.style.height = `${el.clientHeight}px`
    scrollRightFadeRef.value.style.top = `${el.scrollTop}px`
  }
  // 讓左側遮罩跟著 scrollLeft 移動，並調整高度與 top
  if (scrollLeftFadeRef.value) {
    scrollLeftFadeRef.value.style.transform = `translateX(${el.scrollLeft}px)`
    scrollLeftFadeRef.value.style.height = `${el.clientHeight}px`
    scrollLeftFadeRef.value.style.top = `${el.scrollTop}px`
  }
}

// 進入頁面時也要初始化高度與 top
onMounted(() => {
  const el = scheduleContainerRef.value
  if (el) {
    el.addEventListener('scroll', checkScrollBottom)
    el.addEventListener('scroll', checkScrollRight)
    // 初始檢查
    checkScrollBottom()
    checkScrollRight()
  }
})
onUnmounted(() => {
  const el = scheduleContainerRef.value
  if (el) {
    el.removeEventListener('scroll', checkScrollBottom)
    el.removeEventListener('scroll', checkScrollRight)
  }
})
</script>

<template>
  <!-- make the main content show earlier -->
  <SessionModal
    ref="sessionModalRef"
    :locale="locale"
    :session="openedSession"
    @close="handleCloseSession"
  />

  <div class="schedule-page">
    <!-- Date Selection -->
    <SessionDateTab>
      <SessionDateItem
        :selected="selectedDate === 'Aug.9'"
        @click="selectedDate = 'Aug.9'"
      >
        Aug.9
      </SessionDateItem>
      <SessionDateItem
        :selected="selectedDate === 'Aug.10'"
        @click="selectedDate = 'Aug.10'"
      >
        Aug.10
      </SessionDateItem>
    </SessionDateTab>

    <!-- Header Controls -->
    <div class="header-controls">
      <div class="filter-section">
        <!--
        <CButton
          class="time-zone-btn"
          variant="secondary"
        >
          <template #icon>
            🌐
          </template>
          Time zone
        </CButton>

        <CButton variant="basic">
          <template #icon>
            👥
          </template>
          {{ messages[props.locale].community || 'Community' }}
        </CButton>

        <CButton variant="basic">
          <template #icon>
            🏷️
          </template>
          {{ messages[props.locale].tags || 'Tags' }}
        </CButton>

        <CIconButton variant="basic">
          🔍
        </CIconButton>
        -->
      </div>

      <div class="view-controls">
        <div class="view-toggle">
          <button
            :class="{ active: selectedView === 'conference' }"
            @click="selectedView = 'conference'"
          >
            {{ messages[props.locale].conference || 'Conference' }}
          </button>
          <button
            :class="{ active: selectedView === 'bookmarked' }"
            @click="selectedView = 'bookmarked'"
          >
            {{ messages[props.locale].bookmarked || 'Bookmarked' }}
          </button>
        </div>

        <CIconButton variant="basic">
          📤
        </CIconButton>
      </div>
    </div>

    <!-- Schedule Container -->
    <div
      ref="scheduleContainerRef"
      class="schedule-container"
    >
      <!-- Room Headers -->
      <div class="room-headers">
        <div class="time-header" />
        <div
          v-for="room in rooms"
          :key="room.id"
          class="room-header"
        >
          {{ room.name }}
        </div>
      </div>

      <!-- Main Schedule Grid -->
      <div class="schedule-content">
        <!-- Time Column -->
        <div class="time-column">
          <div
            v-for="timeSlot in timeSlots"
            :key="timeSlot"
            class="time-slot"
          >
            {{ timeSlot }}
          </div>
        </div>

        <!-- Sessions Area -->
        <div class="sessions-area">
          <!-- Grid Lines -->
          <div class="grid-lines">
            <div
              v-for="(_, index) in timeSlots"
              :key="`line-${index}`"
              class="grid-line"
              :style="{ top: `${index * TIME_SLOT_HEIGHT}px` }"
            />
          </div>

          <!-- Room Columns -->
          <div class="room-columns">
            <div
              v-for="(room, roomIndex) in rooms"
              :key="room.id"
              class="room-column"
            >
              <!-- Vertical Separator -->
              <div
                v-if="roomIndex > 0"
                class="column-separator"
              />

              <!-- Session Cards for this room -->
              <a
                v-for="session in getSessionsForRoom(room.id)"
                :key="session.code"
                class="session-card"
                :style="layout.getSessionStyle(session.code)"
                @click="handleOpenSession(session.code)"
              >
                <CCard
                  :bookmarked="bookmarkedSessions.has(session.code)"
                  :end-at="session.end"
                  :height-factor="layout.getHeightFactor(session.code)"
                  :speaker="session.speakers?.map(s => s.name).join(', ') || 'TBD'"
                  :start-at="session.start"
                  :status="openedSession?.code === session.code ? 'actived' : 'default'"
                  :tag-text="session.track?.name || messages[props.locale].mainTrack"
                  :title="session.title"
                  @bookmark="toggleBookmark(session.code)"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- 視覺引導淡出遮罩（底部） -->
      <div
        v-show="!scrolledToBottom"
        class="scroll-bottom-fade"
      />
      <!-- 視覺引導淡出遮罩（左側） -->
      <div
        v-show="!scrolledToLeft"
        ref="scrollLeftFadeRef"
        class="scroll-left-fade"
      />
      <!-- 視覺引導淡出遮罩（右側） -->
      <div
        v-show="!scrolledToRight"
        ref="scrollRightFadeRef"
        class="scroll-right-fade"
      />
    </div>
  </div>
</template>

<style>
body {
  background: #f9fafb !important;
}

.container {
  width: 100% !important;
  max-width: 100% !important;
}

.content {
  max-width: 100% !important;
}

.content-container {
  max-width: 100% !important;
}

.aside {
  display: none !important;
}
</style>

<style scoped>
.schedule-page {
  width: 100%;
  min-width: 100%;
  padding: 20px 0;
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 0;
}

@media (max-width: 500px) {
  .header-controls {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.time-zone-btn {
  border: 1px solid #d1d5db;
}

.view-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.view-toggle {
  display: flex;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 4px;
}

.view-toggle button {
  padding: 8px 16px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'PingFang TC', sans-serif;
  transition: all 0.2s;
  color: #364153;
}

.view-toggle button.active {
  background: #e5e3ff;
  color: #4c4598;
}

.schedule-container {
  background: white;
  border: 1px solid #99a1af;
  border-radius: 12px;
  overflow-x: auto;
  overflow-y: auto;
  width: 100%;
  height: 80vh;
  position: relative;
}

.room-headers {
  display: flex;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
  width: max-content;
}

.time-header {
  width: 68px;
  border-right: 1px solid #e5e7eb;
}

.room-header {
  flex: 1;
  min-width: 320px;
  padding: 12px;
  text-align: center;
  font-family: 'PingFang TC', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #7f73fe;
  letter-spacing: 0.54px;
}

.schedule-content {
  display: flex;
  position: relative;
  min-height: calc(300px * 11);
  min-width: 900px;
}

.time-column {
  width: 68px;
  background: #f9fafb;
  border-right: 1px solid #e5e7eb;
  position: relative;
}

.time-slot {
  width: 68px;
  height: 400px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-right: 12px;
  padding-top: 4px;
  font-family: 'PingFang TC', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #99a1af;
  position: relative;
}

.sessions-area {
  flex: 1;
  position: relative;
  min-height: calc(300px * 11);
}

.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.grid-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(229, 231, 235, 0.5);
}

.room-columns {
  display: flex;
  height: 100%;
  position: relative;
  z-index: 2;
  min-width: 900px;
}

.room-column {
  flex: 1;
  min-width: 320px;
  position: relative;
  padding: 8px;
}

.column-separator {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 1px;
  background: rgba(229, 231, 235, 0.5);
  z-index: 1;
}

.session-card {
  position: absolute;
  left: 8px;
  right: 8px;
  cursor: pointer;
  z-index: 3;
  transition: transform 0.2s ease;
}

a.session-card {
  text-decoration: none;
}

.session-card:hover {
  transform: translateY(-2px);
  z-index: 4;
}

.scroll-bottom-fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48px;
  pointer-events: none;
  z-index: 20;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 100%);
}

.scroll-right-fade {
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 100%;
  pointer-events: none;
  z-index: 20;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 100%);
}

.scroll-left-fade {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 100%;
  pointer-events: none;
  z-index: 20;
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 100%);
}
</style>
