<template>
  <q-page class="page--stats--guard">
    <div class="page--stats--guard__chart-title">
      {{ getTitle }}
    </div>
    <div class="page--stats--guard__chart-container">
      <Radar class="page--stats--guard__chart" v-if="violationStore.stats.guard.year" id="my-chart-id"
        :options="getChartOptions" :data="getChartData" />
    </div>
  </q-page>
</template>

<script>
import { Radar } from 'vue-chartjs';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { useViolationStore } from 'src/stores/violation-store';
import { useSettingStore } from 'src/stores/setting-store';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default {
  data() {
    return {
      violationStore: useViolationStore(),
      settingStore: useSettingStore(),
    }
  },
  computed: {
    getChartOptions() {
      if (!this.violationStore.stats.violations.year) {
        return null;
      }

      return {
        options: {
          responsive: true,
          maintainAspectRation: false,
          parsing: {
            key: 'violationCount'
          }
        },
        plugins: {
          type: 'radar',
          colors: true,
          datalabels: {
            color: '#120e41',
          },
          legend: {
            display: true,
            fullsize: true,
          },
        }
      }
    },
    getTitle() {
      return `Violations by Guard this ${this.getScope.toUpperCase()}`
    },
    getScope() {
      return this.settingStore.scope;
    },
    getLevel() {
      return this.settingStore.displayMajor;
    },
    getChartData() {
      return {
        labels: this.violationStore.getGuardStatLabels,
        datasets: [
          {
            borderWidth: 2,
            borderJoinStyle: 'round',
            backgroundColor: '#6A79FF29',
            borderColor: '#6A79FFFF',
            pointBackgroundColor: '#6A79FFFF',
            pointBorderColor: '#FFFFFFFF',
            pointHoverBackgroundColor: '#FFFFFFFF',
            pointHoverBorderColor: '#6A79FFFF',
            pointRadius: 8,
            pointBorderWidth: 2,
            fill: true,
            data: this.violationStore.getGuardStats,
          }
        ],
      }
    },
  },
  setup() {
    const violationStore = useViolationStore();
    violationStore.requestGuardStats();
  },
  components: { Radar },
}
</script>

<style scoped lang="scss">
.page--stats--guard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  &__chart-title {
    font-size: 1.6rem;
    font-weight: 600;
    color: $primary-2;
  }

  &__chart-container {
    position: relative;
    width: 64%;
    height: 100%;
  }

  &__chart {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
