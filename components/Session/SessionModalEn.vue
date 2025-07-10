<script setup lang="ts">
import type { SubmissionResponse } from '#loaders/types.ts'
import CTag from '#components/CTag.vue'
import { formatTimeRange } from '#utils/format-time.ts'
import { markdownToHtml } from '#utils/markdown.ts'
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

  if (!startDateString || !endDateString) return '(Unknown)'

  return formatTimeRange(startDateString, endDateString, true)
})

const collaborationUrl = null

const language = 'Chinese'

const difficulty = 'Beginner'
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
        <div class="content-col">
          <div class="dialog-header">
            <div class="header-spacer" />
            <DialogClose class="dialog-close">
              <IconPhX style="color: var(--color-gray-500);" />
            </DialogClose>
          </div>
          <div class="main-content">
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
                    Time
                  </div>
                  {{ sessionTime }}
                </div>
                <div class="session-detail-row">
                  <div class="session-detail-label">
                    <IconPhUser />
                    Speaker
                  </div>
                  {{ session.speakers.map(speaker => speaker.name).join(', ') }}
                </div>
                <div class="session-detail-row">
                  <div class="session-detail-label">
                    <IconPhMapPin />
                    Room
                  </div>
                  {{ session.room.name }}
                </div>
                <div
                  v-if="collaborationUrl"
                  class="session-detail-row"
                >
                  <div class="session-detail-label">
                    <IconPhFileText />
                    Collaborative Notes
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
                <h2>Abstract</h2>
                <div
                  v-if="session.abstract"
                  class="content-container"
                  v-html="markdownToHtml(session.abstract, 'zh-tw')"
                />
              </section>

              <section class="session-description">
                <h2>About the Speaker</h2>
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
                <div
                  v-if="session.speakers[0].bio"
                  class="speaker-bio content-container"
                  v-html="markdownToHtml(session.speakers[0].bio, 'zh-tw')"
                />
              </section>
            </DialogDescription>
          </div>
        </div>
        <aside class="ad-sidebar">
          <div class="ad-placeholder">
            Advertisement
          </div>
        </aside>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style>
.content-container {
  > p {
    margin-bottom: 10px;
  }
}

.content-container a {
  color: var(--color-primary-400);
  text-decoration: underline;
}
</style>

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

/***** FLEX LAYOUT REFACTOR *****/
.dialog-content {
  display: flex;
  flex-direction: row;
  position: fixed;
  z-index: 50;
  background: var(--background, #fff);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  border-left: 1px solid #e5e7eb;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  overflow-y: auto;
  padding: 0;
}

@media (min-width: 500px) {
  .dialog-content {
    width: clamp(500px, 75vw, 800px);
  }
}

.content-col {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-width: 0;
}

.dialog-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem 1.5rem 0 1.5rem;
  box-sizing: border-box;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  flex: 1 1 0%;
  min-width: 0;
}

.dialog-close {
  position: static;
  right: auto;
  top: auto;
  border-radius: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  outline: none;
  background: none;
  box-shadow: none;
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

@media (min-width: 900px) {
  .dialog-content {
    flex-direction: row;
  }
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
      object-fit: cover;
    }

    > .speaker-name {
      font-weight: 600;
      margin-top: 6px;
    }
  }
}

.ad-placeholder {
  display: none;
}

@media (min-width: 500px) {
  .ad-placeholder {
    display: block;
    width: 100%;
    height: 50vh;
    background: var(--color-gray-200);
    padding: 1rem;
  }
}
</style>
