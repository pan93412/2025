<template>
  <nav :class="$style.tab">
    <slot />
  </nav>
</template>

<style module>
.tab {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-family: Inter, sans-serif;
  color: #fff;
}
</style>
