<template>
  <q-page class="page--stats--course-year">
    <div class="page--stats--course-year__chart-title">
      {{ `Violations by Course this ${this.getScope.toUpperCase()}` }}
    </div>
    <div class="page--stats--course-year__chart-container">
      <Bar class="page--stats--course-year__chart" id="my-chart-id" :options="getChartOptions" :data="getChartData" />
    </div>
  </q-page>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement, Colors, plugins } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useViolationStore } from 'src/stores/violation-store';
import { useSettingStore } from 'src/stores/setting-store';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartDataLabels);

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
          scales: {
            xAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true,
                maxRotation: 0,
                minRotation: 0
              }
            }],
            yAxes: [{
              stacked: true,
            }]
          },
        },
        plugins: {
          colors: true,
          datalabels: {
            color: '#120e41',
          },
          legend: {
            display: true,
            fullsize: true,
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
      if (!this.violationStore.stats.courseYear.year) {
        return null;
      }

      let labels = this.violationStore.stats.courseYear[this.getScope]
        .map(violation => violation.studentCourse);
      return [...new Set(labels)]
    },
    getFirstMinor() {
      if (!this.violationStore.stats.courseYear.year) {
        return null;
      }

      const firstYearMinor = this.violationStore.stats.courseYear[this.getScope]
        .filter(item => item.studentYear === '1st' && item.violationIsMajor === 0)
        .map(item => item.violationCount);

      return firstYearMinor;
    },
    getChartData() {
      return {
        labels: this.getLabels,
        datasets: [ 
        {
          label: '1st year, minor',
          stack: "first",
          borderWidth: 2,
          borderJoinStyle: 'round',
          backgroundColor: '#F86A9D52',
          borderColor: '#f2f2fd',
          data: this.violationStore.getFirstMinor,
        },
        {
          label: '1st year, major',
          stack: "first",
          borderWidth: 2,
          borderJoinStyle: 'round',
          backgroundColor: '#F86A9DA3',
          borderColor: '#f2f2fd',
          data: this.violationStore.getFirstMajor,
        } ,
        {
          label: '2nd year, minor',
          stack: "second",
          borderWidth: 2,
          borderJoinStyle: 'round',
          backgroundColor: '#6A79FF52',
          borderColor: '#f2f2fd',
          data: this.violationStore.getSecondMinor,
        }, 
        {
          label: '2nd year, major',
          stack: "second",
          borderWidth: 2,
          borderJoinStyle: 'round',
          backgroundColor: '#6A79FFA3',
          borderColor: '#f2f2fd',
          data: this.violationStore.getSecondMajor,
        }, 
        {
          label: '3rd year, minor',
          stack: "third",
          borderWidth: 2,
          borderJoinStyle: 'round',
          backgroundColor: '#A8F86A52',
          borderColor: '#f2f2fd',
          data: this.violationStore.getThirdMinor,
        }, 
        {
          label: '3rd year, major',
          stack: "third",
          borderWidth: 2,
          borderJoinStyle: 'round',
          backgroundColor: '#A8F86AA3',
          borderColor: '#f2f2fd',
          data: this.violationStore.getThirdMajor,
        }, 
        {
          label: '4th year, minor',
          stack: "fourth",
          borderWidth: 2,
          borderJoinStyle: 'round',
          backgroundColor: '#F88C6A52',
          borderColor: '#f2f2fd',
          data: this.violationStore.getFourthMinor,
        }, 
        {
          label: '4th year, major',
          stack: "fourth",
          borderWidth: 2,
          borderJoinStyle: 'round',
          backgroundColor: '#F88C6AA3',
          borderColor: '#f2f2fd',
          data: this.violationStore.getFourthMajor,
        }, 
      ],
      }
    },
  },
  methods: {
    // getData()
  },
  components: {
    Bar
  },
  setup() {
    const violationStore = useViolationStore();
    violationStore.requestCourseYearStats();
  }
}
</script>

  <style scoped lang="scss">
.page--stats--course-year {
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
    width: 96%;
    height: 100%;
  }

  &__chart {
    width: 100% !important;
    height: 100% !important;
  }
}
  </style>
