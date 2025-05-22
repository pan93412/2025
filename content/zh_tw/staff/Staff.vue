<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const staffData = ref([])

onMounted(async () => {
  const response = await axios.get('https://coscup.org/2024/json/staff.json')
  staffData.value = response.data.map((staff) => ({
    ...staff,
    group: staff.name.replace(/[\s\-－].*$/, ''),
  }))
})
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
}

.avatar {
  width: 120%;
  /* height: 80%; */
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
