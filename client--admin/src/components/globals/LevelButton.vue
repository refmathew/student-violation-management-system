<template>
  <fieldset class="level-buttons__container">
    <label
      class="level-buttons__button"
      :class="{
        'level-buttons__button--active':
          level === 'minor'
            ? settingStore.displayMajor === 0
            : settingStore.displayMajor === 1,
      }"
      v-for="(level, index) in levels"
      :key="index"
      :for="level"
      v-ripple
    >
      <input
        class="level-buttons__button-radio"
        type="radio"
        :id="level"
        :value="level"
        v-model="radioButtonValue"
        @input="handleRadioClick"
      />
      <span
        class="level-buttons__button-text"
        v-text="level[0].toUpperCase() + level.slice(1)"
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
      levels: ["minor", "major"],
    };
  },
  methods: {
    handleRadioClick(e) {
      this.settingStore.$patch({
        displayMajor: e.target.value === "minor" ? 0 : 1,
      });
      console.log(e.target.value);
    },
  },
};
</script>

<style leveld lang="scss">
.level-buttons {
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
