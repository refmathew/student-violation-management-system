<template>
  <div class="setting-drawer" ref="settingDrawer">
    <div class="setting-drawer__handle">
      <div />
      <div />
    </div>
    <div class="setting-drawer__main"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settingDrawerHeight: undefined,
      settingDrawerHandleHeight: undefined,
    };
  },
  mounted() {
    // (() => {
    // this.settingDrawerWidth = this.$refs.settingDrawer.clientWidth;
    // this.settingDrawerHandleWidth = this.$refs.settingDrawer.firstChild.clientWidth;
    // this.$refs.settingDrawer.style.bottom = `-${this.settingDrawerWidth - this.settingDrawerHandleWidth - 8}px`;
    // this.$refs.settingDrawer.childNodes.forEach((child) => {
    // child.addEventListener("mouseover", () => {
    // this.$refs.settingDrawer.style.bottom = 0;
    // });
    // });
    // this.$refs.settingDrawer.childNodes.forEach((child) => {
    // child.addEventListener("mouseleave", () => {
    // this.$refs.settingDrawer.style.bottom = `-${this.settingDrawerWidth - this.settingDrawerHandleWidth - 8}px`;
    // });
    // });
    // })();
  },
};
</script>

<style scoped lang="scss">
.setting-drawer {
  position: fixed;
  height: 80%;
  right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: bottom 400ms ease;

  &__handle {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.8rem 1.6rem;
    border-radius: 3.2rem 3.2rem 0 0;
    background-color: $secondary-1;
    box-shadow: 0 0.4rem 0.8rem 0.2rem rgba($primary-2, 0.32);

    div {
      width: 3.2rem;
      height: 0.2rem;
      background-color: $primary-2;
      border-radius: 0.1rem;
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
    box-shadow: 0 0.4rem 0.8rem 0.2rem rgba($primary-2, 0.32);
  }
}
</style>
