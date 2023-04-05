<template>
  <q-page> 
    <form class="form">
      <CustomInput
        name="studentId"
        type="text"
        placeholder="Student Id (Include dash. Ex: 18-00829)"
        iconName="studentId"
        validationCriteria="^\d\d-\d\d\d\d\d$"
        validationErrorMessage="Please check input format"
        @validate-input="checkValidity"
      />
      <CustomInput
        name="lastName"
        type="text"
        placeholder="Last name"
        iconName="student"
        validationCriteria="^[a-zA-Z]+$"
        @validate-input="checkValidity"
      />
      <CustomInput
        name="firstName"
        type="text"
        placeholder="First name"
        iconName="student"
        validationCriteria="^[a-zA-Z]+$"
        @validate-input="checkValidity"
      />
      <CustomInput
        name="course"
        type="select"
        placeholder="Course"
        iconName="course"
        :selectOptions="courseOptions"
        @validate-input="checkValidity"
      />
      <CustomInput
        name="year"
        type="select"
        placeholder="Year"
        iconName="year"
        :selectOptions="yearOptions"
        @validate-input="checkValidity"
      />
      <CustomButton @click="handleSubmit" text="Register" />
    </form>
  </q-page>
  </template>

<script setup>
import { ref, reactive } from 'vue';
import { useQuasar } from "quasar";
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

const yearOptions = ref(['1st', '2nd', '3rd', '4th']);

const isValid = reactive({
  studentId: false,
  lastName: false,
  firstName: false,
  course: false,
  year: false,
});


// =========================================================================== >

const checkValidity = (e) => {
  e.valid && e.nonEmpty ? (isValid[e.name] = true) : (isValid[e.name] = false);
  console.log(isValid)
};

const handleSubmit = () => {
  let areAllValid = true;

  for (const item in isValid) {
    if (isValid[item] === false) areAllValid = false;
  }

  if ( !areAllValid ) {
    $q.notify({
      message: 'Please complete required fields',
      color: 'warning',
      textColor: 'secondary',
      icon: 'warning',
      badgeColor: 'warning',
      badgeTextColor: 'secondary'
    }) 
  } else {
    recordViolation();
  }
}

const recordViolation = async (lastName, studentId, violationType, guardOnDuty) => {
  const notif = $q.notify({
    message: 'Recording...',
    color: 'accent',
    textColor: 'secondary',
    group: false,
    timeout: 0,
    spinner: true,
  }) 

  try {
    await UserService.recordViolation(lastName, studentId, violationType, guardOnDuty)

    notif({
      message: 'Violation Recorded',
      color: 'accent',
      textColor: 'secondary',
      timeout: 2000,
      spinner: false,
      icon: 'done',
    })
  } catch(error) {
    notif({
      message: 'Error',
      caption: error.message,
      color: 'accent',
      textColor: 'secondary',
      timeout: 12000,
      spinner: false,
      icon: 'done',
      actions: [ 
        {label: 'Dismiss', color: 'primary', handler: () => {}}
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
