<script setup lang="ts">
import { data } from '#loaders/staff.data'

const { staffData } = data
</script>

<template>
  <main
    id="staff"
    class="page"
  >
    <div
      v-for="staff in staffData"
      :key="staff.tid"
      class="group"
    >
      <section>
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
.page {
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}
.group {
  margin-bottom: 2rem;
}

.group-name {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.member-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

.member-card {
  text-align: center;
  width: 130px;
  margin-right: 5px;
}

.avatar {
  width: 90%;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
  background-color: white;
  padding: 3px;
}

.name {
  display: block;
  margin-top: 0.5rem;
  font-size: 1rem;
}
</style>
