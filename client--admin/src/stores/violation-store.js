import { defineStore } from 'pinia'
import ViolationService from "src/services/ViolationService";

export const useViolationStore = defineStore('violation', {
  state: () => {
    return {
      recent: [],
    }
  },

  getters: {
    getRecent: (state) => state.recentViolations,
  },

  actions: {
    async requestRecent() {
      this.recent = await ViolationService.getRecent()
    }
  }
})
