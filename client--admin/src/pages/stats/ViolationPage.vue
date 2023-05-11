<template>
  <q-page class="page--stats--violation">
    <div class="page--stats--violation__chart-title">
      {{ `${this.getLevel === 1 ? 'MAJOR' : 'MINOR'} Violations this ${this.getScope.toUpperCase()}` }}
    </div>
    <div class="page--stats--violation__legends">
      <button class="page--stats--violation__legend" v-for="( violation, index ) in getViolations" :key="index">
        <span class="page--stats--violation__legend-number">[{{ violation.violationNumber }}] </span>
        <span class="page--stats--violation__legend-name">{{ violation.violation }}</span>
      </button>
    </div>
    <div class="page--stats--violation__chart-container">
      <Pie class="page--stats--violation__chart" id="my-chart-id" :options="getChartOptions" :data="getChartData" />
    </div>
  </q-page>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement, Colors, plugins } from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useViolationStore } from 'src/stores/violation-store';
import { useSettingStore } from 'src/stores/setting-store';

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, ArcElement, autocolors);

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
          autocolors: {
            enabled: true,
            mode: 'data',
          },
          colors: true,
          datalabels: {
            color: '#120e41',
            formatter: (value, context) => {
              var regExp = /\[(.*?)\]/;
              const label = context.chart.data.labels[context.dataIndex]
              return label.match(regExp)[1]
            }
          },
          legend: {
            display: true,
            fullsize: true,
            align: 'left',
            position: 'top',
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
          },
          tooltip: {
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
    getViolations() {
      if (!this.violationStore.stats.violations.year) {
        return null;
      }

      return this.violationStore.stats.violations[this.getScope]
    },
    getChartData() {
      return {
        labels: this.getLabels,
        datasets: [{
          label: 'Violation count',
          borderWidth: 8,
          borderJoinStyle: 'round',
          // backgroundColor: [
          // '#120E4129',
          // '#6F6AF87A',
          // '#8B86BD7A',
          // ],
          borderColor: '#f2f2fd',
          data: this.getData
        }]
      }
    },
  },
  methods: {
    poolColors(a) {
      let pool = [];
      for (i = 0; i < a; i++) {
        pool.push(dynamicColors());
      }
      return pool;
    },

    dynamicColors() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
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
.page--stats--violation {
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
