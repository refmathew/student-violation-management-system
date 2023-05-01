import { defineStore } from "pinia";

export const useStudentStore = defineStore('student', {
  state: () => {
    return {
      queriedStudent: undefined,
    }
  },
  actions: {
    updateQueriedStudent(studentData) {
      this.queriedStudent = studentData;
    },
  }
})
