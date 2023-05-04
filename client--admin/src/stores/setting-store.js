import { defineStore } from "pinia";

export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      scope: 'week',
      displayMajor: 1,
    }
  },
})
