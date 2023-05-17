<template>
  <q-page>
    <div class="page--find">
      <form class="page--find__form" @submit.prevent="handleFormSubmit">
        <input-search
          class="page--find__search"
          placeholder="Find students..."
          @cInput="handleInputSearchInput"
        />
      </form>
      <div class="page--find__main">
        <div class="page--find__data">
          <template v-if="studentStore.queriedStudent">
            <div
              class="page--find__data--students"
              v-if="studentStore.queriedStudent.hasMultipleStudents === true"
            >
              <student-button
                v-for="student in studentStore.queriedStudent.data"
                :key="student.studentId"
                :last-name="student.lastName"
                :first-name="student.firstName"
                :student-id="student.studentId"
                :year="student.year"
                :course="student.course"
                @studentButtonClick="handleStudentButtonClick"
              />
            </div>
            <div
              class="page--find__data--student"
              v-else-if="
                studentStore.queriedStudent.hasMultipleStudents === false
              "
            >
              <div class="page--find__data--student-header">
                <div class="page--find__data--student-name-id">
                  {{
                    `${studentStore.queriedStudent.data.data[0].studentLastName},
                                  ${studentStore.queriedStudent.data.data[0].studentFirstName}
                                  (${studentStore.queriedStudent.data.data[0].studentId})`
                  }}
                </div>
                <div class="page--find__data--student-course-year">
                  {{
                    `${studentStore.queriedStudent.data.data[0].studentCourse} -
                                  ${studentStore.queriedStudent.data.data[0].studentYear} year`
                  }}
                </div>
              </div>
              <violation-table
                class="page--find__data--student-table"
                v-if="studentStore.queriedStudent.data.data"
                :violations="studentStore.queriedStudent.data.data"
                :showMajor="false"
                title="Violation"
              />
              <div class="page--find__charts">
                <div class="page--find__charts-title">
                  {{
                    `${
                      studentStore.queriedStudent.data.data[0].studentFirstName
                    } ${
                      studentStore.queriedStudent.data.data[0].studentLastName
                    }'s ${
                      settingStore.displayMajor === 0 ? "MINOR" : "MAJOR"
                    } Violations of the ${settingStore.scope.toUpperCase()}`
                  }}
                </div>
                <div class="page--find__charts-main">
                  <pie-chart
                    chartDataScope="This Year"
                    :chartOptions="getChartOptions"
                    :chartData="getThisYearChartData"
                    :chartViolations="studentStore.getThisYearViolations"
                  />
                  <pie-chart
                    v-show="settingStore.compareWith.lastYear"
                    chartDataScope="Last Year"
                    :chartOptions="getChartOptions"
                    :chartData="getLastYearChartData"
                    :chartViolations="studentStore.getLastYearViolations"
                  />
                  <pie-chart
                    v-show="settingStore.compareWith.allTime"
                    chartDataScope="All Time"
                    :chartOptions="getChartOptions"
                    :chartData="getAllTimeChartData"
                    :chartViolations="studentStore.getAllTimeViolations"
                  />
                </div>
              </div>
            </div>
            <div class="page--find__data--error" v-else>
              {{ studentStore.queriedStudent.message }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStudentStore } from "src/stores/student-store";
import StudentService from "src/services/StudentService";
import InputSearch from "src/components/InputSearch.vue";
import StudentButton from "src/components/findPage/StudentButton.vue";
import ViolationTable from "src/components/findPage/ViolationTable.vue";
import PieChart from "src/components/findPage/PieChart.vue";
import { useSettingStore } from "src/stores/setting-store";

export default {
  data() {
    return {
      searchInputValue: "",
      studentStore: useStudentStore(),
      settingStore: useSettingStore(),
      shouldLoadTable: false,
      backgroundColors: ["#F86A9D52", "#6A79FF52", "#08AF4B52", "#F88C6A52"],
      borderColors: ["#F86A9DCC", "#6A79FFCC", "#08AF4BCC", "#F88C6ACC"],
    };
  },
  computed: {
    getChartOptions() {
      return {
        options: {
          responsive: true,
          maintainAspectRation: false,
        },
        plugins: {
          datalabels: {
            padding: {
              top: 4,
              bottom: 4,
              right: 16,
              left: 16,
            },
            anchor: "end",
            align: "start",
            offset: -4,
            backgroundColor: this.borderColors,
            borderColor: this.backgroundColors,
            borderRadius: 8,
            borderWidth: 2,
            font: {
              size: 12,
              weight: 600,
            },
            color: "#f2f2fd",
            formatter: (value, context) => {
              var regExp = /\[(.*?)\]/;
              const label = context.chart.data.labels[context.dataIndex];
              return label.match(regExp)[1];
            },
          },
          legend: {
            display: true,
            fullsize: true,
            align: "left",
            position: "bottom",
          },
        },
      };
    },
    getThisYearChartData() {
      return {
        labels: this.studentStore.getThisYearLabels,
        datasets: [
          {
            label: "Violation count",
            offset: 16,
            borderWidth: 2,
            borderJoinStyle: "round",
            backgroundColor: this.backgroundColors,
            borderColor: this.borderColors,
            hoverBackgroundColor: this.borderColors,
            hoverBorderColor: this.backgroundColors,
            data: this.studentStore.getThisYearData,
          },
        ],
      };
    },
    getLastYearChartData() {
      return {
        labels: this.studentStore.getLastYearLabels,
        datasets: [
          {
            label: "Violation count",
            offset: 16,
            borderWidth: 2,
            borderJoinStyle: "round",
            backgroundColor: this.backgroundColors,
            borderColor: this.borderColors,
            hoverBackgroundColor: this.borderColors,
            hoverBorderColor: this.backgroundColors,
            data: this.studentStore.getLastYearData,
          },
        ],
      };
    },
    getAllTimeChartData() {
      return {
        labels: this.studentStore.getAllTimeLabels,
        datasets: [
          {
            label: "Violation count",
            offset: 16,
            borderWidth: 2,
            borderJoinStyle: "round",
            backgroundColor: this.backgroundColors,
            borderColor: this.borderColors,
            hoverBackgroundColor: this.borderColors,
            hoverBorderColor: this.backgroundColors,
            data: this.studentStore.getAllTimeData,
          },
        ],
      };
    },
  },
  methods: {
    handleInputSearchInput(e) {
      this.searchInputValue = e;
    },
    handleStudentButtonClick(e) {
      this.studentStore.fillQueriedStudent(e);
    },
    handleFormSubmit() {
      this.studentStore.fillQueriedStudent(this.searchInputValue.trim());
    },
  },
  components: {
    InputSearch,
    StudentButton,
    ViolationTable,
    PieChart,
  },
};
</script>

<style scoped lang="scss">
.page--find {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;

  &__form {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  &__search {
    width: 48%;
  }

  &__main {
    width: 100%;
  }

  &__header {
  }

  &__student-name-id {
  }

  &__student-course-year {
  }

  &__data {
  }

  &__data--students {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  &__data--student {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  &__data--student-header {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  &__data--student-name-id {
    font-size: 2.4rem;
    font-weight: 600;
  }

  &__data--student-course-year {
    font-size: 1.6rem;
    font-weight: 400;
  }

  &__data--error {
    color: $warning;
  }

  &__charts {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__charts-main {
    width: 100%;
    display: flex;
    align-items: flex-end;

    & > * {
      flex: 1;
    }
  }
  &__charts-title {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
    color: $primary-2;
  }
}
</style>
