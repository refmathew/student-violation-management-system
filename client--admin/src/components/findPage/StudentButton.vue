<template>
  <button class="student-button" @click="handleButtonClick">
    <div class="student-button__upper">
      <span class="student-button__name">{{
        `${lastName}, ${firstName}`
      }}</span>
      <span class="student-button__id">{{ `(${studentId})` }}</span>
    </div>
    <div class="student-button__lower">{{ `${course} - ${year} year` }}</div>
  </button>
</template>

<script>
import StudentService from "src/services/StudentService";

export default {
  props: {
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleButtonClick() {
      this.$emit("studentButtonClick", this.studentId);
    },
  },
  emits: ["studentButtonClick"],
};
</script>

<style scoped lang="scss">
.student-button {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 44.7rem;
  padding: 1.6rem 0 1.6rem 3.2rem;
  background-color: $secondary-2;
  border-radius: 0.8rem;
  box-shadow: 0 0 0 rgba($primary-1, 0);
  color: $primary-2;
  cursor: pointer;
  transition: box-shadow 400ms ease;

  &:hover {
    box-shadow: 0 0.4rem 1.6rem rgba($primary-1, 0.16);
  }

  &__upper {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  &__name {
    font-weight: 600;
    font-size: 1.6rem;
  }

  &__id {
    font-size: 1.4rem;
  }

  &__lower {
    font-size: 1.4rem;
  }
}
</style>
