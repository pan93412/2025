<script setup lang="ts">
import SponsorOneColumn from './SponsorOneColumn.vue'
import SponsorTwoColumns from './SponsorTwoColumns.vue'
</script>

<template>
  <SponsorOneColumn
    :sponsor-levels="['titanium']"
  />
  <SponsorTwoColumns
    :sponsor-levels="[
      'gold',
      'silver',
      'bronze',
      'friend',
      'over-seas',
      'co-promotion-partner',
      'co-host',
      'co-organizer',
      'special-thanks',
    ]"
  />
</template>
