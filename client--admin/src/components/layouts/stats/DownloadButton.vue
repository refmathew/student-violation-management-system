<template>
  <q-page-sticky v-if="isStatPage" position="bottom-right" :offset="[32, 32]">
    <q-btn fab icon="download" color="accent" @click="handleDownload">
      <q-tooltip anchor="center left" self="center right">Download violation data</q-tooltip>
    </q-btn>
  </q-page-sticky>
</template>

<script>
import { useViolationStore } from "src/stores/violation-store";
import { utils ,writeFile} from "xlsx";

export default {
  data() {
    return {
      violationStore: useViolationStore(),
    }
  },
  methods: {
    handleDownload() {
      switch (this.getRouteName) {
        case 'statsViolationPage':
          this.prepareViolationExcel(this.violationStore.stats.violations);
          break;
        case 'statsTimeAndDatePage':
          this.prepareTimeExcel(this.violationStore.stats.time);
          break;
        case 'statsCourseAndYearPage':
          this.prepareCourseYearExcel(this.violationStore.stats.courseYear);
          break;
        case 'statsGuardPage':
          this.prepareGuardExcel(this.violationStore.stats.guard);
          break;
      }
    },
    async prepareViolationExcel(data) {
      const workbook = utils.book_new();
      const weekSheet = utils.json_to_sheet(this.transformViolationStats(data.week))
      const monthSheet = utils.json_to_sheet(this.transformViolationStats(data.month))
      const yearSheet = utils.json_to_sheet(this.transformViolationStats(data.year))
      utils.book_append_sheet(workbook, weekSheet, "Week");
      utils.book_append_sheet(workbook, monthSheet, "Month");
      utils.book_append_sheet(workbook, yearSheet, "Year");
      writeFile(workbook, "Violation_data_by_count.xlsx", { compression: true });
    },
    async prepareCourseYearExcel(data) {
      const workbook = utils.book_new();
      const weekSheet = utils.json_to_sheet(this.transformCourseYearStats(data.week))
      const monthSheet = utils.json_to_sheet(this.transformCourseYearStats(data.month))
      const yearSheet = utils.json_to_sheet(this.transformCourseYearStats(data.year))
      utils.book_append_sheet(workbook, weekSheet, "Week");
      utils.book_append_sheet(workbook, monthSheet, "Month");
      utils.book_append_sheet(workbook, yearSheet, "Year");
      writeFile(workbook, "Violation_data_by_course_and_year.xlsx", { compression: true });
    },
    async prepareTimeExcel(data) {
      const workbook = utils.book_new();
      const weekSheet = utils.json_to_sheet(this.transformTimeStats(data.week))
      const monthSheet = utils.json_to_sheet(this.transformTimeStats(data.month))
      const yearSheet = utils.json_to_sheet(this.transformTimeStats(data.year))
      utils.book_append_sheet(workbook, weekSheet, "Week");
      utils.book_append_sheet(workbook, monthSheet, "Month");
      utils.book_append_sheet(workbook, yearSheet, "Year");
      writeFile(workbook, "Violation_data_by_time_of_the_day.xlsx", { compression: true });
    },
    async prepareGuardExcel(data) {
      const workbook = utils.book_new();
      const weekSheet = utils.json_to_sheet(this.transformGuardStats(data.week))
      const monthSheet = utils.json_to_sheet(this.transformGuardStats(data.month))
      const yearSheet = utils.json_to_sheet(this.transformGuardStats(data.year))
      utils.book_append_sheet(workbook, weekSheet, "Week");
      utils.book_append_sheet(workbook, monthSheet, "Month");
      utils.book_append_sheet(workbook, yearSheet, "Year");
      writeFile(workbook, "Violation_data_by_guard.xlsx", { compression: true });
    },
    transformViolationStats(violationStats) {
      return violationStats.map( violationStat => {
        return { 
          Count: violationStat.count,
          Level: violationStat.violationIsMajor === 0? 'Minor' : 'Major',
          Number: violationStat.violationNumber,
          Violation: violationStat.violation
        }
      } )
    },
    transformTimeStats(timeStats) {
      return timeStats.map(timeStat => {
        return { 
          "Time of the Day": timeStat.violationTime,
          Count: timeStat.violationCount,
        }
      })
    },
    transformCourseYearStats(courseYearStats) {
      return courseYearStats.map(courseYearStat => {
        return { 
          Course: courseYearStat.studentCourse,
          Year: courseYearStat.studentYear,
          Count: courseYearStat.violationCount,
          Level: courseYearStat.violationIsMajor === 0? 'Minor' : 'Major',
        }
      })
    },
    transformGuardStats(guardStats) {
      return guardStats.map(guardStat => {
        return { 
          Count: guardStat.violationCount,
          Guard: guardStat.violationGuard,
        }
      })
    },
  },
  computed: {
    getRouteName() {
      return this.$route.name
    },
    isStatPage() {
      return this.$route.fullPath.includes('stats')
    }
  },
}
</script>
