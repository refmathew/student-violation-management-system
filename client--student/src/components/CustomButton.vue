<template>
  <button type="button" v-text="props.text" />
</template>

<script setup>
const props = defineProps({
  text: String 
})
</script>

<style scoped lang="sass">
button 
  padding: 1.6rem 16.6rem
  background-color: $accent
  border-radius: 1.6rem
  box-shadow: 0 1.6rem 1.6rem rgba(#000, .16)
  color: $secondary
  cursor: pointer
  transition: box-shadow 800ms ease

  &:hover
    box-shadow: 0 0 0 rgba(#000, .16)

  &:disabled
    box-shadow: 0 1.6rem 1.6rem rgba(#000, .16)
</style>

