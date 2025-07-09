<script setup lang="ts">
import type { SubmissionResponse } from '#loaders/types.ts'
import { formatTimeRange } from '#utils/format-time.ts'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<{
  open: boolean
  session: SubmissionResponse | null
}>()

defineEmits<{
  (e: 'close'): void
}>()

const sessionTime = computed(() => {
  const startDateString = props?.session?.start
  const endDateString = props?.session?.end

  if (!startDateString || !endDateString) return '（未知）'

  return formatTimeRange(startDateString, endDateString, true)
})
</script>

<template>
  <DialogRoot
    :open="open"
    @update:open="$emit('close')"
  >
    <DialogPortal>
      <DialogOverlay
        class="dialog-overlay"
      />
      <DialogContent
        as="article"
        class="dialog-content"
      >
        <DialogTitle
          v-if="session"
          as="h1"
        >
          {{ session.title }}
        </DialogTitle>

        <DialogDescription
          v-if="session"
          as="section"
        >
          <section class="session-details">
            <div class="session-detail-row">
              <div class="session-detail-label">
                <IconPhClock />
                時間
              </div>
              {{ sessionTime }}
            </div>
            <div class="session-detail-row">
              <div class="session-detail-label">
                <IconPhUser />
                講者
              </div>
              {{ session.speakers.map(speaker => speaker.name).join(', ') }}
            </div>
            <div class="session-detail-row">
              <div class="session-detail-label">
                <IconPhMapPin />
                位置
              </div>
              {{ session.room.name }}
            </div>
            <div class="session-detail-row">
              <div class="session-detail-label">
                <IconPhFileText />
                共筆
              </div>
              (尚未上架)
            </div>
          </section>

          議程軌：{{ session.track.name }}
          <!-- Tags -->

          <hr>

          <p>簡介</p>
          <p>{{ session.description }}</p>

          <!-- About -->
          <p>關於講者</p>
          <img
            :alt="session.speakers[0].name"
            height="100"
            :src="session.speakers[0].avatar"
            width="100"
          >
          <p>{{ session.speakers[0].name }}</p>
          <p>{{ session.speakers[0].bio }}</p>
        </DialogDescription>

        <DialogClose
          class="dialog-close"
        >
          <IconPhX style="color: var(--color-gray-500);" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.8);
}
[data-state='open'].dialog-overlay {
  animation: fade-in-0 0.2s forwards;
}
[data-state='closed'].dialog-overlay {
  animation: fade-out-0 0.2s forwards;
}

@keyframes fade-in-0 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out-0 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.dialog-content {
  position: fixed;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--background, #fff);
  padding: 1.5rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 75vw;
  border-left: 1px solid #e5e7eb;
  /* Animation states */
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
.dialog-content[data-state='open'] {
  animation-name: slide-in-from-right;
  animation-duration: 0.5s;
}
.dialog-content[data-state='closed'] {
  animation-name: slide-out-to-right;
  animation-duration: 0.3s;
}
@media (min-width: 640px) {
  .dialog-content {
    max-width: 75vw; /* sm:max-w-sm */
  }
}
@keyframes slide-in-from-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-out-to-right {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.dialog-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  outline: none;
}
.dialog-close:hover {
  opacity: 1;
}
.dialog-close:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--ring-color, #3b82f6);
}
.dialog-close:disabled {
  pointer-events: none;
}
.dialog-close[data-state='open'] {
  background-color: var(--secondary-bg, #f3f4f6);
}

.session-details {
  > .session-detail-row {
    display: flex;
    gap: 1rem;

    font-size: var(--text-sm);
    font-weight: 400;

    > .session-detail-label {
      display: flex;
      align-items: center;
      gap: 2px;
      color: var(--color-gray-400);
    }
  }
}
</style>
