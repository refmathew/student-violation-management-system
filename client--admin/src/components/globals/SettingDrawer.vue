<template>
  <div class="setting-drawer" ref="settingDrawer">
    <div class="setting-drawer__handle">
      <div />
      <div />
    </div>
    <div class="setting-drawer__main">
      <level-button />
      <scope-button />
    </div>
  </div>
</template>

<script>
import ScopeButton from './ScopeButton.vue';
import LevelButton from './LevelButton.vue';

export default {
  props: {
    buttons: {
      required: true
    }
  },
  data() {
    return {
      settingDrawerHeight: undefined,
      settingDrawerHandleHeight: undefined,
    };
  },
  mounted() {
    (() => {
      this.settingDrawerHeight = this.$refs.settingDrawer.clientHeight;
      this.settingDrawerHandleHeight = this.$refs.settingDrawer.firstChild.clientHeight;
      this.$refs.settingDrawer.style.bottom = `-${this.settingDrawerHeight - this.settingDrawerHandleHeight - 8}px`;

      this.$refs.settingDrawer.childNodes.forEach((child) => {
        child.addEventListener("mouseover", () => {
          this.$refs.settingDrawer.style.bottom = 0;
        });
      });

      this.$refs.settingDrawer.childNodes.forEach((child) => {
        child.addEventListener("mouseleave", () => {
          this.$refs.settingDrawer.style.bottom = `-${this.settingDrawerHeight - this.settingDrawerHandleHeight - 8}px`;
        });
      });
    })();
  },
  components: { ScopeButton, LevelButton }
}
</script>

<style scoped lang="scss">
.setting-drawer {
  position: fixed;
  width: 80%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: bottom 400ms ease;

  &__handle {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    padding: .8rem 1.6rem;
    border-radius: 3.2rem 3.2rem 0 0;
    background-color: $secondary-1;
    box-shadow: 0 .4rem .8rem .2rem rgba($primary-2, .32);

    div {
      width: 3.2rem;
      height: .2rem;
      background-color: $primary-2;
      border-radius: .1rem;
    }
  }

  &__main {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    gap: 12.8rem;
    min-height: 6.4rem;
    padding: 1.6rem 25.6rem 1.2rem;
    background-color: $secondary-1;
    border-radius: 3.2rem 3.2rem 0 0;
    box-shadow: 0 .4rem .8rem .2rem rgba($primary-2, .32);
  }

}
</style>
