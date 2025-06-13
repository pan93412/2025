<template>
  <div :class="$style.tab">
    <slot />
  </div>
</template>

<style module>
.tab {
  display: flex;
  gap: 7px;
  font-family: Inter;
  color: #fff;
}

.tab > * {
  flex: 1;
}
</style>
