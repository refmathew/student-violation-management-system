<template>
  <div class="chart">
    <div class="chart__chart-title">
      {{ chartDataScope }}
    </div>
    <div
      v-if="chartData"
      class="chart__main"
      :class="{
        'chart__main--with-others':
          settingStore.compareWith.lastYear || settingStore.compareWith.allTime,
      }"
    >
      <div class="chart__chart-container">
        <Pie
          class="chart__chart"
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
        />
      </div>
    </div>
    <div v-else>No data here</div>
  </div>
</template>

<script>
import { useSettingStore } from "src/stores/setting-store.js";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  ArcElement,
  Colors,
  plugins,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, ArcElement);

export default {
  props: {
    chartDataScope: String,
    chartOptions: Object,
    chartData: Object,
    chartViolations: Array,
  },
  data() {
    return {
      settingStore: useSettingStore(),
    };
  },
  components: {
    Pie,
  },
};
</script>

<style scoped lang="scss">
.chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;

  &__chart-title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 600;
    color: $primary-2;
  }

  &__main {
    width: 100%;
  }

  &__main--with-other {
  }

  &__chart-container {
  }

  &__chart {
    width: 100% !important;
    height: 100% !important;
  }

  &__legends {
  }

  &__legend {
  }

  &__legend-number {
  }
}
</style>
