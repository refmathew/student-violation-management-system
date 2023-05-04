import { defineStore } from 'pinia'
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
      }
    }
  },

  getters: {
    getRecent: (state) => state.recentViolations,
  },

  actions: {
    async requestRecent() {
      this.recent = await ViolationService.getRecent();
    },
    async requestViolationStats() {
      this.stats.violations = await ViolationService.getViolationStats();
    }
  }
})
