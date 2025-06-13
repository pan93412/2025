<script setup lang="ts">
import SessionDateItem from '#components/Session/Date/Item.vue'
import SessionDateTab from '#components/Session/Date/Tab.vue'
</script>

<template>
  <SessionDateTab>
    <SessionDateItem>Aug.9</SessionDateItem>
    <SessionDateItem :selected="true">
      Aug.10
    </SessionDateItem>
  </SessionDateTab>
</template>
