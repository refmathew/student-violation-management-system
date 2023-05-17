<template>
  <q-page class="page--stats--time">
    <div class="page--stats--time__chart-title">
      {{ `Violations by Time this ${this.getScope.toUpperCase()}` }}
    </div>
    <div class="page--stats--time__chart-container">
      <Radar
        class="page--stats--time__chart"
        id="my-chart-id"
        :options="getChartOptions"
        :data="getChartData"
      />
    </div>
  </q-page>
</template>

<script>
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useViolationStore } from "src/stores/violation-store";
import { useSettingStore } from "src/stores/setting-store";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default {
  data() {
    return {
      violationStore: useViolationStore(),
      settingStore: useSettingStore(),
    };
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
            color: "#120e41",
          },
          legend: {
            display: false,
            fullsize: true,
          },
          title: {
            display: false,
            text: `Number of ${
              this.getLevel === 1 ? "MAJOR" : "MINOR"
            } Violations this ${this.getScope.toUpperCase()}`,
            font: {
              family: "'Poppins', 'sans-serif'",
              size: 14,
              weight: 600,
            },
            color: "#6F6AF8",
            fullsize: true,
          },
        },
      };
    },
    getTitle() {
      return `Number of violations(${this.getLevel}) by${this.getScope}`;
    },
    getScope() {
      return this.settingStore.scope;
    },
    getLevel() {
      return this.settingStore.displayMajor;
    },
    getLabels() {
      if (!this.violationStore.stats.time.year) {
        return null;
      }

      return this.violationStore.stats.time.year // Year, since it encapsulates week and month
        .map((violation) => violation.violationTime)
        .map((violation) =>
          violation > 12 ? `${violation - 12} pm` : `${violation} am`
        );
    },
    getChartData() {
      return {
        labels: this.getLabels,
        datasets: [
          {
            label: `Violation Count this ${this.getScope}`,
            borderWidth: 2,
            borderJoinStyle: "round",
            backgroundColor: "#6A79FF29",
            borderColor: "#6A79FFFF",
            pointBackgroundColor: "#6A79FFFF",
            pointBorderColor: "#FFFFFFFF",
            pointHoverBackgroundColor: "#FFFFFFFF",
            pointHoverBorderColor: "#6A79FFFF",
            pointRadius: 8,
            pointBorderWidth: 2,
            fill: true,
            data: this.violationStore.getTimeStats,
          },
        ],
      };
    },
  },
  setup() {
    const violationStore = useViolationStore();
    violationStore.requestTimeStats();
  },
  components: { Radar },
};
</script>

<style scoped lang="scss">
.page--stats--time {
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
