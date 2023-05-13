<template>
  <q-page class="page--stats--violation">
    <div class="page--stats--violation__chart-title">
      {{ `${this.getLevel === 1 ? 'MAJOR' : 'MINOR'} Violations this ${this.getScope.toUpperCase()}` }}
    </div>
    <div class="page--stats--violation__main">
      <div class="page--stats--violation__chart-container">
        <Pie class="page--stats--violation__chart" id="my-chart-id" :options="getChartOptions" :data="getChartData" />
      </div>
      <table class="page--stats--violation__legends">
        <tr class="page--stats--violation__legend" :data-index="index % 4" v-for="( violation, index ) in getViolations"
          :key="index">
          <td class="page--stats--violation__legend-number">{{ violation.violationNumber }} </td>
          <td>{{ violation.violation }}</td>
        </tr>
      </table>
    </div>
  </q-page>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement, Colors, plugins } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useViolationStore } from 'src/stores/violation-store';
import { useSettingStore } from 'src/stores/setting-store';

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, ArcElement);

export default {
  data() {
    return {
      violationStore: useViolationStore(),
      settingStore: useSettingStore(),
      backgroundColors: ['#F86A9D52', '#6A79FF52', '#08AF4B52', '#F88C6A52',],
      borderColors: ['#F86A9DCC', '#6A79FFCC', '#08AF4BCC', '#F88C6ACC',],
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
            padding: {
              top: 4,
              bottom: 4,
              right: 16,
              left: 16,
            },
            anchor: 'end',
            align: 'start',
            offset: -4,
            backgroundColor: this.borderColors,
            borderColor: this.backgroundColors,
            borderRadius: 8,
            borderWidth: 2,
            font: {
              size: 12,
              weight: 600,
            },
            color: '#f2f2fd',
            formatter: (value, context) => {
              var regExp = /\[(.*?)\]/;
              const label = context.chart.data.labels[context.dataIndex]
              return label.match(regExp)[1]
            }
          },
          legend: {
            display: false,
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
        .filter(violation => violation.violationIsMajor === this.getLevel)
    },
    getChartData() {
      return {
        labels: this.getLabels,
        datasets: [{
          label: 'Violation count',
          // spacing: 2,
          offset: 32,
          borderWidth: 2,
          borderJoinStyle: 'round',
          backgroundColor: this.backgroundColors,
          borderColor: this.borderColors,
          hoverBackgroundColor: this.borderColors,
          hoverBorderColor: this.backgroundColors,
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
.page--stats--violation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  &__main {
    display: flex;
    gap: 1.6rem;
    align-items: center;

    &>* {
      flex: 1;
    }
  }

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

  &__legends {
    max-height: 54.3rem;
    overflow-y: scroll;
    border-radius: 3.2rem;
    display: block;
  }

  &__legend {
    color: #FFFFFF;
    border-radius: 3.2rem;

    &>* {
      padding: 1.6rem;
    }

    &[data-index="0"] {
      background-color: #F86A9DCC;
    }

    &[data-index="1"] {
      background-color: #6A79FFCC;
    }

    &[data-index="2"] {
      background-color: #08AF4BCC;
    }

    &[data-index="3"] {
      background-color: #F88C6ACC;
    }
  }
}
</style>
