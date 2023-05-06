import { defineStore } from 'pinia'
import { useSettingStore } from './setting-store';
import ViolationService from "src/services/ViolationService";

export const useViolationStore = defineStore('violation', {
  state: () => {
    return {
      recent: [],
      stats: {
        violations: {},
        courseYear: {},
        time: {},
        guard: {},
      },
      settingStore: useSettingStore(),
    }
  },

  getters: {
    getRecent: (state) => state.recentViolations,
    getFirstMinor: (state) => {
      if (!state.stats.courseYear.year) return undefined;
      let values = {};
      state.stats.courseYear[state.settingStore.scope]
        .filter(item => item.studentYear === '1st' && item.violationIsMajor === 0)
        .forEach(item => values[item['studentCourse']] = item.violationCount)

      return values;
    },
    getFirstMajor: (state) => {
      if (!state.stats.courseYear.year) return undefined;
      let values = {};
      state.stats.courseYear[state.settingStore.scope]
        .filter(item => item.studentYear === '1st' && item.violationIsMajor === 1)
        .forEach(item => values[item['studentCourse']] = item.violationCount)

      return values;
    },
    getSecondMinor: (state) => {
      if (!state.stats.courseYear.year) return undefined;
      let values = {};
      state.stats.courseYear[state.settingStore.scope]
        .filter(item => item.studentYear === '2nd' && item.violationIsMajor === 0)
        .forEach(item => values[item['studentCourse']] = item.violationCount)

      return values;
    },
    getSecondMajor: (state) => {
      if (!state.stats.courseYear.year) return undefined;
      let values = {};
      state.stats.courseYear[state.settingStore.scope]
        .filter(item => item.studentYear === '2nd' && item.violationIsMajor === 1)
        .forEach(item => values[item['studentCourse']] = item.violationCount)

      return values;
    },
    getThirdMinor: (state) => {
      if (!state.stats.courseYear.year) return undefined;
      let values = {};
      state.stats.courseYear[state.settingStore.scope]
        .filter(item => item.studentYear === '3rd' && item.violationIsMajor === 0)
        .forEach(item => values[item['studentCourse']] = item.violationCount)

      return values;
    },
    getThirdMajor: (state) => {
      if (!state.stats.courseYear.year) return undefined;
      let values = {};
      state.stats.courseYear[state.settingStore.scope]
        .filter(item => item.studentYear === '3rd' && item.violationIsMajor === 1)
        .forEach(item => values[item['studentCourse']] = item.violationCount)

      return values;
    },
    getFourthMinor: (state) => {
      if (!state.stats.courseYear.year) return undefined;
      let values = {};
      state.stats.courseYear[state.settingStore.scope]
        .filter(item => item.studentYear === '4th' && item.violationIsMajor === 0)
        .forEach(item => values[item['studentCourse']] = item.violationCount)

      return values;
    },
    getFourthMajor: (state) => {
      if (!state.stats.courseYear.year) return undefined;
      let values = {};
      state.stats.courseYear[state.settingStore.scope]
        .filter(item => item.studentYear === '4th' && item.violationIsMajor === 1)
        .forEach(item => values[item['studentCourse']] = item.violationCount)

      return values;
    },
  },

  actions: {
    async requestRecent() {
      this.recent = await ViolationService.getRecent();
    },
    async requestViolationStats() {
      this.stats.violations = await ViolationService.getViolationStats();
    },
    async requestCourseYearStats() {
      this.stats.courseYear = await ViolationService.getCourseYearStats();
    }
  }
})
