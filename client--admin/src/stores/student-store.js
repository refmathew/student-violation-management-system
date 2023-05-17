import { defineStore } from "pinia";
import { useSettingStore } from "./setting-store";
import StudentService from "src/services/StudentService";

export const useStudentStore = defineStore("student", {
  state: () => {
    return {
      queriedStudent: {
        data: {
          data: undefined,
          stats: {
            thisYear: [],
            lastYear: [],
            allTime: [],
          },
        },
      },
      settingStore: useSettingStore(),
    };
  },
  getters: {
    getThisYearLabels: (state) => {
      return state.queriedStudent.data.stats.thisYear
        .filter(
          (violation) =>
            violation.violationIsMajor === state.settingStore.displayMajor
        )
        .map(
          (violation) => `[${violation.violationNumber}] ${violation.violation}`
        );
    },
    getThisYearData: (state) => {
      return state.queriedStudent.data.stats.thisYear
        .filter(
          (violation) =>
            violation.violationIsMajor === state.settingStore.displayMajor
        )
        .map((violation) => violation.count);
    },
    getThisYearViolations: (state) => {
      return state.queriedStudent.data.stats.thisYear;
    },
    getLastYearLabels: (state) => {
      return state.queriedStudent.data.stats.lastYear
        .filter(
          (violation) =>
            violation.violationIsMajor === state.settingStore.displayMajor
        )
        .map(
          (violation) => `[${violation.violationNumber}] ${violation.violation}`
        );
    },
    getLastYearData: (state) => {
      return state.queriedStudent.data.stats.lastYear
        .filter(
          (violation) =>
            violation.violationIsMajor === state.settingStore.displayMajor
        )
        .map((violation) => violation.count);
    },
    getLastYearViolations: (state) => {
      return state.queriedStudent.data.stats.lastYear;
    },
    getAllTimeLabels: (state) => {
      return state.queriedStudent.data.stats.allTime
        .filter(
          (violation) =>
            violation.violationIsMajor === state.settingStore.displayMajor
        )
        .map(
          (violation) => `[${violation.violationNumber}] ${violation.violation}`
        );
    },
    getAllTimeData: (state) => {
      return state.queriedStudent.data.stats.allTime
        .filter(
          (violation) =>
            violation.violationIsMajor === state.settingStore.displayMajor
        )
        .map((violation) => violation.count);
    },
    getAllTimeViolations: (state) => {
      return state.queriedStudent.data.stats.allTime;
    },
  },
  actions: {
    async fillQueriedStudent(query) {
      this.queriedStudent = await StudentService.findStudent(query);
      console.log("hey");
    },
  },
});
