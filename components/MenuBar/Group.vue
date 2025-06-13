<template>
  <div :class="$style.group">
    <slot />
  </div>
</template>

<style module>
.group {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 32px;
  padding: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  color: #4c4598;
  font-family: 'PingFang TC';
  background: #fff;
}
</style>
