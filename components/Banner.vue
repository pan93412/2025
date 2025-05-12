<script setup lang="ts">
import mobileBanner from '#assets/images/banner-mobile.png'
import banner from '#assets/images/banner.png'
</script>

<template>
  <div class="banner">
    <img
      alt="COSCUP x RubyConf Taiwan 2025 banner"
      :src="banner"
    >
    <img
      alt="COSCUP x RubyConf Taiwan 2025 mobile banner"
      class="mobile"
      :src="mobileBanner"
    >
  </div>
</template>

<style scoped>
@media screen and (min-width: 513px) {
  .banner > .mobile {
    display: none;
  }
}

@media screen and (max-width: 512px) {
  .banner > :not(.mobile) {
    display: none;
  }
}

@media screen and (min-width: 1920px) {
  .banner {
    width: 1920px;
    margin: 0 auto;
  }
}
</style>
