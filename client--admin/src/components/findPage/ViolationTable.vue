<template>
  <div class="violation-table__container">
    <div class="violation-table__title">{{ title }}</div>
    <q-table class="violation-table__table" :rows="showMajor ? violationsMajor : violationsMinor" row-key="violationTD"
      virtual-scroll wrap-cells :columns="columns" :rows-per-page-options="[0]" style="max-height: 48rem;" flat bordered
      hide-bottom no-results-label="No data to show" />
    <div class="violation-table__buttons-container">
      <button class="violation-table__button" :class="{ 'violation-table__button--active': !showMajor }"
        @click="showMajor = false" v-ripple>Minor</button>
      <button class="violation-table__button" :class="{ 'violation-table__button--active': showMajor }"
        @click="showMajor = true" v-ripple>Major</button>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  props: {
    violations: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      showMajor: false,
      columns: [
        {
          name: 'timestamp',
          label: 'Date & Time',
          field: 'violationTD',
          sortable: true,
          format: (violationTD) => `${format(new Date(violationTD), 'dd LLL yyyy | HH:mm')}`,
          style: 'font-size: 1.4rem; font-weight: 300',
          align: 'left',
          headerStyle: 'font-weight: 600'
        },
        {
          name: 'violation',
          label: 'Offense',
          field: 'violation',
          sortable: true,
          style: 'font-size: 1.4rem; font-weight: 300',
          align: 'left',
          headerStyle: 'font-weight: 600'
        },
        {
          name: 'guard',
          label: 'Guard on Duty',
          field: 'violationGuard',
          sortable: true,
          style: 'font-size: 1.4rem; font-weight: 300',
          align: 'left',
          headerStyle: 'font-weight: 600'
        },
      ]
    }
  },
  computed: {
    violationsMajor() {
      return this.violations.filter(violation => violation.violationIsMajor === 1)
    },
    violationsMinor() {
      return this.violations.filter(violation => violation.violationIsMajor === 0)
    }
  },
  setup() { }
}
</script>

<style scoped lang="scss">
.violation-table {
  &__container {
    display: flex;
    flex-direction: column;
    gap: .4rem;
  }

  &__title {
    font-weight: 600;
    font-size: 1.6rem;
  }

  &__table {}

  &__buttons-container {
    position: fixed;
    bottom: 3.2rem;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 .4rem .32rem rgba($primary-1, .16);
    border-radius: .8rem;
    overflow: hidden;
  }

  &__button {
    position: relative;
    background-color: $secondary-1;
    font-size: 1.2rem;
    font-weight: 600;
    color: $primary-1;
    padding: .8rem 1.2rem;
    cursor: pointer;
  }

  &__button--active {
    background-color: $primary-1;
    color: $secondary-1;
    padding: .8rem 1.2rem;
  }
}
</style>
