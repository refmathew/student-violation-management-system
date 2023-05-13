import { defineStore } from "pinia";

export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      scope: 'year',
      displayMajor: 1,
    }
  },
})
