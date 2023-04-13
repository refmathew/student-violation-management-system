<template>
  <q-page class="page__main">
    <form class="page__form" ref="$form">
      <CustomInput name="lastName" type="text" placeholder="Last name" iconName="student"
        validationCriteria="^[a-zA-Z]+$" @validate-input="checkValidity" />
      <CustomInput name="studentId" type="password" placeholder="Student Id (Include dash. Ex: 18-00829)"
        iconName="studentId" validationCriteria="^\d\d-\d\d\d\d\d$" validationErrorMessage="Please check input format"
        @validate-input="checkValidity" />
      <CustomInput name="violationType" type="select" placeholder="Violation Type" iconName="violationType"
        :selectOptions="violationTypeOptions" @validate-input="checkValidity" />
      <CustomInput name="guardOnDuty" type="select" placeholder="Guard on Duty" iconName="guardOnDuty"
        :selectOptions="guardOnDutyOptions" @validate-input="checkValidity" />
      <CustomButton @click="handleSubmit" text="Submit" class="page__form-button" />
    </form>
    <p class="page__footer">
      First time user?
      <router-link class="page__footer-link" to="/register">
        Register
      </router-link>
    </p>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useQuasar } from "quasar";
import UserService from "../services/UserService"
import CustomInput from "src/components/input/CustomInput.vue";
import CustomButton from "src/components/CustomButton.vue";
const $q = useQuasar();

// =========================================================================== >

const inputs = reactive({
  studentId: {
    inputValue: undefined,
    isValid: false
  },
  lastName: {
    inputValue: undefined,
    isValid: false
  },
  violationType: {
    inputValue: undefined,
    isValid: false
  },
  guardOnDuty: {
    inputValue: undefined,
    isValid: false
  },
})

const guardOnDutyOptions = [
  "Juan dela Cruz",
  "Ernesto Topacio",
  "Tandang Sora",
  "Manong Guard",
];

const violationTypeOptions = [
  "Unauthorized or illegal possession of controlled substances",
  "Bringing and/or drinking liquor or alcoholic beverages",
  "Carrying or possession of firearms, deadly weapons and explosives within the school premises",
];

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
    recordViolation(
      inputs.lastName.inputValue,
      inputs.studentId.inputValue,
      inputs.violationType.inputValue,
      inputs.guardOnDuty.inputValue
    );
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
    const response = await UserService.recordViolation(lastName, studentId, violationType, guardOnDuty)
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
.page
  &__main
    position: relative

  &__form
    display: flex
    flex-direction: column
    gap: 2.4rem
    align-items: center
    width: 38.5rem
    margin: auto
    
  &__footer
    margin-top: 4.8rem
    font-size: 1.4rem
    font-weight: 500

  &__footer-link
    font-weight: 700
</style>
