<script setup lang="ts">
import { data as submissions } from '#loaders/allSubmissions.zh-tw.data.ts'
</script>

<SessionsPage locale="zh-tw" :session-code="undefined" :submissions="submissions" />
