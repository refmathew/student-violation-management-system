<template>
  <q-page class="page--stats-violation">
    <div class="page--stats-violation__chart-title">
      {{ `${this.getLevel === 1 ? 'MAJOR' : 'MINOR'} Violations this ${this.getScope.toUpperCase()}` }}
    </div>
    <div class="page--stats-violation__chart-container">
      <Pie class="page--stats-violation__chart" id="my-chart-id" :options="getChartOptions" :data="getChartData" />
    </div>
  </q-page>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement, Colors, plugins } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useViolationStore } from 'src/stores/violation-store';
import { useSettingStore } from 'src/stores/setting-store';

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, ArcElement, ChartDataLabels);

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
        },
        plugins: {
          colors: true,
          datalabels: {
            color: '#120e41',
          },
          legend: {
            display: false,
            fullsize: true,
            align: 'start',
          },
          title: {
            display: false,
            text: `Number of ${this.getLevel === 1 ? 'MAJOR' : 'MINOR'} Violations this ${this.getScope.toUpperCase()}`,
            font: {
              family: "'Poppins', 'sans-serif'",
              size: 14,
              weight: 600,
            },
            color: '#6F6AF8',
            fullsize: true,
          }
        }
      }
    },
    getTitle() {
      return `Number of violations(${this.getLevel}) by${this.getScope}`
    },
    getScope() {
      return this.settingStore.scope;
    },
    getLevel() {
      return this.settingStore.displayMajor;
    },
    getLabels() {
      if (!this.violationStore.stats.violations.year) {
        return null;
      }
      return this.violationStore.stats.violations[this.getScope]
        .filter(violation => violation.violationIsMajor === this.getLevel)
        .map(violation => `[${violation.violationNumber}] ${violation.violation}`);
    },
    getData() {
      if (!this.violationStore.stats.violations.year) {
        return null;
      }
      return this.violationStore.stats.violations[this.getScope]
        .filter(violation => violation.violationIsMajor === this.getLevel)
        .map(violation => violation.count);
    },
    getChartData() {
      return {
        labels: this.getLabels,
        datasets: [{
          label: 'Violation count',
          borderWidth: 8,
          borderJoinStyle: 'round',
          backgroundColor: [
            '#120E4129',
            '#6F6AF87A',
            '#8B86BD7A',
          ],
          borderColor: '#f2f2fd',
          data: this.getData
        }]
      }
    },
  },
  components: {
    Pie,
  },
  setup() {
    const violationStore = useViolationStore();
    violationStore.requestViolationStats();
  }
}
</script>

<style scoped lang="scss">
.page--stats-violation {
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
