---
layout: page
---

<script setup lang="ts">
import { data as submissions } from '#loaders/allSubmissions.en.data.ts'
</script>

<SessionsPage locale="en" :session-code="undefined" :submissions="submissions" />
