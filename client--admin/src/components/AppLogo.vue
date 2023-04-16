<template>
  <div class="logo" :class="{ 'logo--active': showLetters }">
    <img src="../assets/logo.svg" alt="">
    <p class="logo__name" :class="{ 'logo__name--shown': showLetters }">SVMS</p>
  </div>
</template>

<script setup>
const props = defineProps({
  showLetters: Boolean
})
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  display: flex;
  align-items: center;
  gap: .4rem;
  padding-left: 3.2rem;
  font-size: 3.2rem;
  font-weight: 600;
  letter-spacing: -.4rem;
  transition: 300ms 100ms padding-left ease-out;

  &--active {
    padding-left: 4.6rem;
  }
}

.logo__name {
  margin-bottom: 0;
  opacity: 0;
  transition: 300ms 100ms opacity ease-out;

  &--shown {
    opacity: 1;
  }
}
</style>
