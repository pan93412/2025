<script setup lang="ts">
import type { SubmissionResponse } from '#loaders/types.ts'
import CTag from '#components/CTag.vue'
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

const collaborationUrl = null

const language = '中文'

const difficulty = '入門'
</script>

<template>
  <DialogRoot
    :open="open"
    @update:open="$emit('close')"
  >
    <DialogPortal>
      <DialogOverlay class="dialog-overlay" />
      <DialogContent
        as="article"
        class="dialog-content"
      >
        <DialogTitle
          v-if="session"
          as="h1"
          class="dialog-title"
        >
          {{ session.title }}
        </DialogTitle>

        <DialogDescription
          v-if="session"
          as="section"
          class="dialog-description"
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
            <div
              v-if="collaborationUrl"
              class="session-detail-row"
            >
              <div class="session-detail-label">
                <IconPhFileText />
                共筆
              </div>
              {{ collaborationUrl }}
            </div>
          </section>

          <section class="session-tags">
            <CTag variant="secondary">
              {{ language }}
            </CTag>
            <CTag variant="secondary">
              {{ difficulty }}
            </CTag>
          </section>

          <section class="session-tags">
            <CTag variant="primary">
              {{ session.track.name }}
            </CTag>
          </section>

          <hr class="separator">

          <section class="session-description">
            <h2>簡介</h2>
            <!-- TODO: parse Markdown for abstract -->
            <p>{{ session.abstract }}</p>
          </section>

          <!-- TODO: insert AD here -->

          <section class="session-description">
            <h2>關於講者</h2>
            <img
              :alt="session.speakers[0].name"
              class="speaker-avatar"
              height="80"
              :src="session.speakers[0].avatar"
              width="80"
            >
            <p class="speaker-name">
              {{ session.speakers[0].name }}
            </p>
            <p class="speaker-bio">
              {{ session.speakers[0].bio }}
            </p>
          </section>
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
/* #region component */
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
  /* FIXME: Remove for actual AD */
  padding-right: calc(1.5rem + 160px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: clamp(500px, 75vw, 800px);
  border-left: 1px solid #e5e7eb;
  /* Animation states */
  animation-duration: 0.5s;
  animation-fill-mode: both;
  overflow-y: auto;
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
/* #endregion component */

.dialog-title {
  font-size: var(--text-2xl);
  line-height: 32px;
  font-weight: 600;
  color: var(--color-primary-400);
  margin-bottom: 12px;
}

.dialog-description {
  display: flex;
  flex-direction: column;
  gap: 12px;

  > .session-details {
    display: flex;
    flex-direction: column;
    gap: 12px;

    > .session-detail-row {
      display: flex;
      gap: 12px;

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

  > .session-tags {
    display: flex;
    gap: 12px;
  }

  > .separator {
    width: 100%;
    border: none;
    border-top: 1px solid var(--color-gray-300);
    margin-block: 16px;
  }

  > .session-description {
    font-size: var(--text-sm);

    > h2 {
      font-weight: 600;
      color: var(--color-primary-400);
      margin-bottom: 10px;
    }

    > p {
      font-weight: 400;
      margin-bottom: 10px;
    }

    > .speaker-avatar {
      margin-block: 6px;
      border-radius: 50%;
      height: 80px;
      width: 80px;
    }

    > .speaker-name {
      font-weight: 600;
      margin-top: 6px;
    }
  }
}
</style>
