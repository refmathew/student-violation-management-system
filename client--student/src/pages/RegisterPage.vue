<template>
  <q-page>
    <form class="form">
      <CustomInput name="studentId" type="text" placeholder="Student Id (Include dash. Ex: 18-00829)"
        iconName="studentId" validationCriteria="^\d\d-\d\d\d\d\d$" validationErrorMessage="Please check input format"
        @validate-input="checkValidity" />
      <CustomInput name="lastName" type="text" placeholder="Last name" iconName="student"
        validationCriteria="^[a-zA-Z]+$" @validate-input="checkValidity" />
      <CustomInput name="firstName" type="text" placeholder="First name" iconName="student"
        validationCriteria="^[a-zA-Z]+$" @validate-input="checkValidity" />
      <CustomInput name="course" type="select" placeholder="Course" iconName="course" :selectOptions="courseOptions"
        @validate-input="checkValidity" />
      <CustomInput name="year" type="select" placeholder="Year" iconName="year" :selectOptions="yearOptions"
        @validate-input="checkValidity" />
      <CustomButton @click="handleSubmit" text="Register" />
    </form>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useQuasar } from "quasar";
import UserService from 'src/services/UserService';
import CustomInput from 'src/components/input/CustomInput.vue';
import CustomButton from 'src/components/CustomButton.vue';
const $q = useQuasar();

// =========================================================================== >

const courseOptions = ref([
  'BSCS',
  'BEED',
  'BSED',
  'BSP',
  'BSPH'
])

const inputs = reactive({
  studentId: {
    inputValue: undefined,
    isValid: false
  },
  lastName: {
    inputValue: undefined,
    isValid: false
  },
  firstName: {
    inputValue: undefined,
    isValid: false
  },
  course: {
    inputValue: undefined,
    isValid: false
  },
  year: {
    inputValue: undefined,
    isValid: false
  },
})

const yearOptions = ref(['1st', '2nd', '3rd', '4th']);

// =========================================================================== >

const checkValidity = (e) => {
  inputs[e.name].inputValue = e.value;
  inputs[e.name].isValid = e.isValueValid;
};

const handleSubmit = () => {
  let areAllValid = true;

  for (const input in inputs) {
    if (!inputs[input].inputValue || !inputs[input].isValid) {
      areAllValid = false;
    }
  }

  if (!areAllValid) {
    $q.notify({
      message: 'Please complete required fields',
      color: 'warning',
      textColor: 'secondary',
      icon: 'warning',
      badgeColor: 'warning',
      badgeTextColor: 'secondary'
    })
  } else {
    registerStudent(
      inputs.studentId.inputValue,
      inputs.lastName.inputValue,
      inputs.firstName.inputValue,
      inputs.course.inputValue,
      inputs.year.inputValue,
    );
  }
}

const registerStudent = async (studentId, lastName, firstName, course, year) => {
  const notif = $q.notify({
    message: 'Recording...',
    color: 'accent',
    textColor: 'secondary',
    group: false,
    timeout: 0,
    spinner: true,
  })

  try {
    const response = await UserService.registerStudent(studentId, lastName, firstName, course, year);
    notif({
      message: response.data.message,
      color: 'accent',
      textColor: 'secondary',
      timeout: 4000,
      spinner: false,
      icon: 'done',
    })
  } catch (error) {
    notif({
      message: 'Error',
      caption: error.response.data.message,
      color: 'warning',
      textColor: 'secondary',
      timeout: 12000,
      spinner: false,
      icon: 'warning',
      actions: [
        { label: 'Dismiss', color: 'primary', textColor: 'secondary', handler: () => { } }
      ]
    })
  }
}
</script>

<style scoped lang="sass">
.form 
  display: flex
  flex-direction: column
  gap: 2.4rem
  align-items: center
  width: 38.5rem
  margin: auto
</style>
