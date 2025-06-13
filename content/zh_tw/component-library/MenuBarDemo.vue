<script setup lang="ts">
import MenuBarGroup from '#components/MenuBar/Group.vue'
import MenuBarTriggerItem from '#components/MenuBar/TriggerItem.vue'
</script>

<template>
  <MenuBarGroup>
    <MenuBarTriggerItem>議程</MenuBarTriggerItem>
    <MenuBarTriggerItem :selected="true">
      我的收藏
    </MenuBarTriggerItem>
  </MenuBarGroup>
</template>
