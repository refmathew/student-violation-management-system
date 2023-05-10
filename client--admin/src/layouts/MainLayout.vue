<template>
  <q-layout>
    <layout-drawer @hoverDrawer="handleHoverDrawer" />
    <div class="drawer-dummy" :class="{ 'drawer-dummy--active': drawerActive }"></div>
    <div class="layout--main__main">
      <div class="layout--main__header">
        <div class="layout--main__title">
          <!-- Title -->
          <span class="layout--main__main-title" v-if="route.meta.title">{{ route.meta.title }}</span>
          <span class="layout--main__main-title" v-else>Statistics</span>
          <!-- Subtitle -->
          <span class="layout--main__sub-title" v-if="route.meta.title === 'Home'">Welcome back, {{ userFirstName
          }}</span>
          <span class="layout--main__sub-title" v-else-if="route.meta.title === 'Find student'">Query student
            data</span>
          <span class="layout--main__sub-title" v-else-if="route.meta.title === 'Filter violations'">Specify violation
            queries</span>
          <span class="layout--main__sub-title" v-else>{{ route.meta.subTitle }}</span>
        </div>
        <logout-button v-if="userStore.user.firstname" :first-name="useUserStore.user.firstname"
          :last-name="userLastName" icon="student" />
      </div>
      <q-page-container>
        <router-view />
      </q-page-container>
      <setting-drawer />
    </div>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';
import LayoutDrawer from '../components/LayoutDrawer.vue'
import SettingDrawer from 'src/components/globals/SettingDrawer.vue';
import LogoutButton from 'src/components/LogoutButton.vue';

const userLastName = ref('dela Cruz');
const userFirstName = ref('John');

const route = useRoute();
const userStore = useUserStore();

const drawerActive = ref(false);
const handleHoverDrawer = (e) => {
  drawerActive.value = e.value;
}
</script>

<style scoped lang="scss">
.q-layout {
  display: flex;
  padding: 3.2rem;
  background-color: $secondary-1;
}

.drawer-dummy {
  flex-shrink: 0;
  width: 9.6rem;
  height: 1.2rem;
  transition: 400ms width ease;

  &--active {
    width: 21.5rem;
  }
}

.layout--main {
  &__main {
    display: flex;
    flex: 1;
    flex-shrink: 0;
    flex-direction: column;
    gap: 4.3rem;
    margin-left: 3.2rem;
    padding: 3.2rem;
    color: $primary-1;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    display: flex;
    flex-direction: column;
  }

  &__main-title {
    font-size: 3.2rem;
    font-weight: 600;
  }

  &__sub-title {
    font-size: 1.4rem;
    font-weight: 300;
  }
}
</style>

