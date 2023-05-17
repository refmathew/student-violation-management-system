<template>
  <div class="overlay__wrapper">
    <div class="overlay__main">
      <p class="overlay__header" v-text="props.header"></p>
      <p class="overlay__sub-header" v-text="props.subHeader"></p>
      <div class="overlay__body" v-text="props.body"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  header: String,
  subHeader: String,
  body: String,
});
</script>

<style scoped lang="sass">
.overlay
  &__wrapper
    position: absolute
    top: 0
    left: 0
</style>
