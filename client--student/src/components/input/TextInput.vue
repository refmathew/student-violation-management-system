<template>
  <div class="text-input__wrapper" >
    <div class="text-input__icon-wrapper"
      :class="{ 'text-input__icon-wrapper--active': inputActive, 'text-input__icon-wrapper--inactive': !inputActive }" 
      v-html="props['icon']['icon']" />
    <input class="text-input__input" :placeholder="props['placeholder']"  :type="props.type" ref="$input"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';


const props = defineProps({
  type: String,
  icon: String,
  placeholder: String,
})


const $input = ref(null)
const inputActive = ref(false);

onMounted(()=>{
  $input.value.addEventListener('focus', ()=>{
    inputActive.value = true
  })

  $input.value.addEventListener('focusout', ()=>{
    if ( !$input.value.value ) {
      inputActive.value = false
    }
  })
})
</script>

<style lang="sass">
.text-input
  &__wrapper
    color: $primary-1 

  &__input
    color: $accent

  &__icon-wrapper--active svg path
    fill: $accent

  &__icon-wrapper--inactive svg path
    fill: $primary-1
</style>
