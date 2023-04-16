<template>
  <q-layout view="hHh Lpr lFf">
    <layout-drawer @hoverDrawer="handleHoverDrawer" />
    <div class="drawer-dummy" :class="{ 'drawer-dummy--active': drawerActive }"></div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import LayoutDrawer from '../components/LayoutDrawer.vue'

const drawerActive = ref(false);
const handleHoverDrawer = (e) => {
  drawerActive.value = e.value;
}


</script>

<style scoped lang="scss">
.q-layout {
  display: flex;
  gap: 3.2rem;
  background-color: $secondary-1;
}

.drawer-dummy {
  width: 9.6rem;
  height: 1.2rem;
  transition: 400ms width ease;

  &--active {
    width: 21.5rem;
  }
}
</style>

