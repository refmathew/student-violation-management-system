<template>
  <div class="drawer-container">
    <div class="drawer" :class="{ 'drawer--open': isHovered }" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
      <app-logo :showLetters="isHovered" />
      <div class="drawer__gen">
        <drawer-button v-for="( button, index ) in drawerGenButtons" :key="index" :title="button.title"
          :icon="button.icon" :link="button.link" :showTitle="isHovered" />
      </div>
      <div class="drawer__stats">
        <drawer-button v-for="( button, index ) in drawerStatButtons" :key="index" :title="button.title"
          :icon="button.icon" :link="button.link" :showTitle="isHovered" />
      </div>
      <div>
        <drawer-button title="Sign out" icon="signout" link="/login" :showTitle="isHovered" />
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import AppLogo from "components/AppLogo.vue";
import DrawerButton from "components/DrawerButton.vue";

const drawerGenButtons = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Find student',
    icon: 'find',
    link: '/find'
  },
  // {
  // title: 'Filter violations',
  // icon: 'filter',
  // link: '/filter'
  // },
]

const drawerStatButtons = [
  {
    title: 'Violation',
    icon: 'violation',
    link: '/stats/violation'
  },
  {
    title: 'Course & Year',
    icon: 'courseAndYear',
    link: '/stats/course-and-year'
  },
  {
    title: 'Time of the Day',
    icon: 'timeAndDate',
    link: '/stats/time-and-date'
  },
  {
    title: 'Guard',
    icon: 'guard',
    link: '/stats/guard'
  },
]

const emit = defineEmits(['hoverDrawer'])
const handleMouseOver = () => {
  isHovered.value = true;
  emit('hoverDrawer', isHovered);
}

const handleMouseOut = () => {
  isHovered.value = false;
  emit('hoverDrawer', isHovered);
}

const isHovered = ref(false);
</script>

<style scoped lang="scss">
.drawer {
  position: fixed;
  top: 3.2rem;
  bottom: 3.2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3.2rem;
  width: 9.6rem;
  padding: 3.2rem 0;
  overflow-x: hidden;
  box-shadow: 0 .4rem .8rem .2rem rgba($primary-1, .32);
  border-radius: 1.6rem;
  background-color: $primary-1;
  color: $secondary-1;
  transition: 400ms width ease;

  &::-webkit-scrollbar {
    display: none;
  }

  &--open {
    width: 21.5rem;
  }

}
</style>
