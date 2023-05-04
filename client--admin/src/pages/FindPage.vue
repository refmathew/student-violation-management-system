<template>
  <q-page>
    <div class="page--find">
      <form class="page--find__form" @submit.prevent="handleFormSubmit">
        <input-search class="page--find__search" placeholder="Find students..." @cInput="handleInputSearchInput" />
      </form>
      <div class="page--find__main">
        <div class="page--find__data">
          <template v-if="studentStore.queriedStudent">
            <div class="page--find__data--students" v-if="studentStore.queriedStudent.hasMultipleStudents === true">
              <student-button v-for="student in studentStore.queriedStudent.data" :key="student.studentId"
                :last-name="student.lastName" :first-name="student.firstName" :student-id="student.studentId"
                :year="student.year" :course="student.course" @studentButtonClick="handleStudentButtonClick" />
            </div>
            <div class="page--find__data--student"
              v-else-if="studentStore.queriedStudent.hasMultipleStudents === false">
              <div class="page--find__data--student-header">
                <div class="page--find__data--student-name-id">{{
                    `${studentStore.queriedStudent.data[0].studentLastName},
                                  ${studentStore.queriedStudent.data[0].studentFirstName}
                                  (${studentStore.queriedStudent.data[0].studentId})`
                }}</div>
                <div class="page--find__data--student-course-year">{{
                    `${studentStore.queriedStudent.data[0].studentCourse} -
                                  ${studentStore.queriedStudent.data[0].studentYear} year`
                }}</div>
              </div>
              <violation-table class="page--find__data--student-table" :violations="studentStore.queriedStudent.data"
                :showMajor=false title="Violation" />
            </div>
            <div class="page--find__data--error" v-else>{{ studentStore.queriedStudent.message }}</div>
          </template>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStudentStore } from 'src/stores/student-store';
import StudentService from 'src/services/StudentService';
import InputSearch from 'src/components/InputSearch.vue';
import StudentButton from 'src/components/findPage/StudentButton.vue';
import ViolationTable from 'src/components/findPage/ViolationTable.vue';

export default {
  data() {
    return {
      searchInputValue: '',
      studentStore: useStudentStore(),
      shouldLoadTable: false,
    }
  },
  methods: {
    handleInputSearchInput(e) {
      this.searchInputValue = e;
    },
    async handleStudentButtonClick(e) {
      const studentData = await StudentService.findStudent(e);
      this.studentStore.updateQueriedStudent(studentData);
    },
    async handleFormSubmit() {
      const studentData = await StudentService.findStudent(this.searchInputValue.trim());
      this.studentStore.updateQueriedStudent(studentData);
    },
  },
  setup() {
  },
  components: {
    InputSearch,
    StudentButton,
    ViolationTable
  }
}
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

  &__main {}

  &__header {}

  &__student-name-id {}

  &__student-course-year {}

  &__data {}

  &__data--students {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .8rem;
  }

  &__data--student {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  &__data--student-header {
    display: flex;
    flex-direction: column;
    gap: .4rem;
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
}
</style>
