<script setup lang="ts">
import { data } from '#loaders/staff.data'

const { staffData } = data
</script>

<template>
  <main id="staff">
    <div
      v-for="(staff, index) in staffData"
      :key="staff.tid"
      class="group-section"
      :class="`group-section-${index % 2}`"
    >
      <section class="group-content">
        <h2 class="group-name">
          {{ staff.group }}
        </h2>
        <div class="member-grid">
          <div
            v-for="member in staff.members"
            :key="member.name"
            class="member-card"
          >
            <img
              :alt="member.name"
              class="avatar"
              :src="`https://www.gravatar.com/avatar/${member.email_hash}?s=320&d=identicon&r=g&d=https://volunteer.coscup.org/img/nonavatar.png`"
            >
            <span class="name">{{ member.name }}</span>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.group-section {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 3rem 1rem;
  box-sizing: border-box;
}

.group-content {
  max-width: 1200px;
  margin: auto;
  padding: 0 5rem;
}

.group-name {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  margin-top: 0;
  border-top: none;
  padding-top: 0;
}

.member-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.member-card {
  text-align: center;
  width: 120px;
}

.avatar {
  width: 100%;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
  border: 2px solid #eee;
  background-color: #eee;
  padding: 3px;
}

.name {
  display: block;
  margin-top: 0.5rem;
  font-size: 1rem;
}
</style>
