<template>
  <fieldset class="compare-buttons__container">
    <span class="compare-buttons__title">
      Compare:
    </span>
    <q-checkbox class="compare-buttons__checkbox" v-model="lastYear" label="Last year" color="deep-purple-4" />
    <q-checkbox class="compare-buttons__checkbox" v-model="allTime" label="All time" color="deep-purple-4" />
  </fieldset>
</template>

<script>
import { useSettingStore } from 'src/stores/setting-store';

export default {
  data() {
    return {
      radioButtonValue: '',
      settingStore: useSettingStore(),
      scopes: ['week', 'month', 'year'],
      lastYear: false,
      allTime: false,
    }
  },
  watch: {
    lastYear(upd, old) {
      this.settingStore.$patch({ compareWith: { lastYear: upd } })
    },
    allTime(upd, old) {
      this.settingStore.$patch({ compareWith: { allTime: upd } })
    }
  }
}
</script>

<style scoped lang="scss">
.compare-buttons {

  &__container {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 600;
    color: $primary-2;
  }

  &__checkbox {
    & .q-checkbox__label {
      font-size: 1.2rem !important;
      font-weight: 600;
      color: $primary-2;
    }
  }
}
</style>
