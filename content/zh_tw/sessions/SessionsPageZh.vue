<script setup lang="ts">
import CButton from '#/components/CButton.vue'
import CCard from '#/components/CCard.vue'
import CIconButton from '#/components/CIconButton.vue'
import SessionDateItem from '#/components/Session/Date/Item.vue'
import SessionDateTab from '#/components/Session/Date/Tab.vue'
import SessionModal from '#/components/Session/SessionModal.vue'
import { data as submissions } from '#loaders/allSubmissions.zh-tw.data.ts'
import { END_HOUR, SessionScheduleLayout, START_HOUR, TIME_SLOT_HEIGHT } from '#utils/session-layout.ts'
import { computed, ref } from 'vue'

const props = defineProps<{
  session: string | undefined
}>()

// Bookmarked sessions state
const bookmarkedSessions = ref(new Set<string>())

// View state
const selectedView = ref<'議程' | '我的收藏'>('議程')

// Date selection state
const selectedDate = ref<'Aug.9' | 'Aug.10'>('Aug.9')

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

const layout = new SessionScheduleLayout(submissions)

// Extract unique rooms from submissions
const rooms = computed(() => {
  const roomMap = new Map()

  submissions.forEach((submission) => {
    if (submission.room) {
      roomMap.set(submission.room.id, submission.room)
    }
  })

  return Array.from(roomMap.values())
})

// Get sessions for display
const displaySessions = computed(() => {
  const filteredSessions = submissions.filter((session) => {
    if (!session.start) return false
    const startDate = new Date(session.start)
    // Conference dates: 2025-08-09 and 2025-08-10
    if (selectedDate.value === 'Aug.9') {
      return startDate.getFullYear() === 2025 && startDate.getMonth() === 7 && startDate.getDate() === 9
    } else {
      return startDate.getFullYear() === 2025 && startDate.getMonth() === 7 && startDate.getDate() === 10
    }
  })

  if (selectedView.value === '我的收藏') {
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

function handleOpenSession(sessionCode: string) {
  location.href = `./${sessionCode}`
}

function handleCloseSession() {
  location.href = './'
}

const openedSession = computed(() => {
  if (props.session) {
    return submissions.find((session) => session.code === props.session) ?? null
  }

  return null
})
</script>

<template>
  <div class="schedule-page">
    <!-- Date Selection -->
    <div class="date-selection">
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
    </div>

    <!-- Header Controls -->
    <div class="header-controls">
      <div class="filter-section">
        <CButton
          class="time-zone-btn"
          variant="secondary"
        >
          <template #icon>
            <div class="icon">
              🌐
            </div>
          </template>
          Time zone
        </CButton>

        <CButton variant="basic">
          <template #icon>
            <div class="icon">
              👥
            </div>
          </template>
          社群
        </CButton>

        <CButton variant="basic">
          <template #icon>
            <div class="icon">
              🏷️
            </div>
          </template>
          標籤
        </CButton>

        <CIconButton variant="basic">
          <div class="icon">
            🔍
          </div>
        </CIconButton>
      </div>

      <div class="view-controls">
        <div class="view-toggle">
          <button
            :class="{ active: selectedView === '議程' }"
            @click="selectedView = '議程'"
          >
            議程
          </button>
          <button
            :class="{ active: selectedView === '我的收藏' }"
            @click="selectedView = '我的收藏'"
          >
            我的收藏
          </button>
        </div>

        <CIconButton variant="basic">
          <div class="icon">
            📤
          </div>
        </CIconButton>
      </div>
    </div>

    <!-- Schedule Container -->
    <div class="schedule-container">
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
                  :tag-text="session.track?.name || '主議程軌'"
                  :title="session.title"
                  @bookmark="toggleBookmark(session.code)"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SessionModal
      :open="!!openedSession"
      :session="openedSession"
      @close="handleCloseSession"
    />
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
  overflow-y: visible;
  width: 100%;
}

.room-headers {
  display: flex;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
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

.session-card:hover {
  transform: translateY(-2px);
  z-index: 4;
}

.icon {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date-selection {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 20px 0;
}
</style>
