<template>
  <fieldset class="scope-buttons__container">
    <label
      class="scope-buttons__button"
      :class="{ 'scope-buttons__button--active': settingStore.scope === scope }"
      v-for="(scope, index) in scopes"
      :key="index"
      :for="scope"
      v-ripple
    >
      <input
        class="scope-buttons__button-radio"
        type="radio"
        :id="scope"
        :value="scope"
        v-model="radioButtonValue"
        @input="handleRadioClick"
      />
      <span
        class="scope-buttons__button-text"
        v-text="scope[0].toUpperCase() + scope.slice(1)"
      />
    </label>
  </fieldset>
</template>

<script>
import { useSettingStore } from "src/stores/setting-store";

export default {
  data() {
    return {
      radioButtonValue: "",
      settingStore: useSettingStore(),
      scopes: ["week", "month", "year"],
    };
  },
  methods: {
    handleRadioClick(e) {
      this.settingStore.$patch({ scope: e.target.value });
    },
  },
};
</script>

<style scoped lang="scss">
.scope-buttons {
  &__container {
    display: flex;
    align-items: flex-end;
    gap: 1.2rem;
  }

  &__button {
    position: relative;
    padding: 0.8rem 1.6rem;
    background-color: $secondary-3;
    border-radius: 0.8rem;
    box-shadow: 0 0.4rem 0 $primary-2;
    cursor: pointer;
    transition: background-color 128ms ease, box-shadow 128ms ease,
      margin 128ms ease;
    margin-bottom: 0;

    &:hover {
      background-color: $secondary-1;
    }
  }

  &__button--active {
    box-shadow: 0 0 0 $primary-2;
    margin-bottom: -4px;

    &:hover {
      background-color: $secondary-3;
    }
  }

  &__button-radio {
  }

  &__button-text {
    font-size: 1.2rem;
    font-weight: 600;
    color: $primary-2;
  }
}
</style>
