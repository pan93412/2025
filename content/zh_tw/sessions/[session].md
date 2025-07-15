---
layout: page
---

<script setup lang="ts">
import { useData } from 'vitepress'
import { data as submissions } from '#loaders/allSubmissions.zh-tw.data.ts'
import { computed } from 'vue';

const { params } = useData();
const sessionCode = computed(() => {
    return params.value?.session;
})
</script>

<SessionsPage locale="zh-tw" :session-code="sessionCode" :submissions="submissions" />
