<template>
  <q-page class="page__main">
    <form class="page__form" ref="$form">
      <CustomInput name="lastName" type="text" placeholder="Last name" iconName="student" validationCriteria="^[a-zA-Z]+$" @validate-input="checkValidity"/>
      <CustomInput name="studentId" type="password" placeholder="Student Id (Include dash. Ex: 18-00829)" iconName="studentId" validationCriteria="^\d\d-\d\d\d\d\d$" validationErrorMessage="Please check input format" @validate-input="checkValidity"/>
      <CustomInput name="violationType" type="select" placeholder="Violation Type" iconName="violationType" :selectOptions="violationTypeOptions" @validate-input="checkValidity"/>
      <CustomInput name="guardOnDuty" type="select" placeholder="Guard on Duty" iconName="guardOnDuty" :selectOptions="guardOnDutyOptions" @validate-input="checkValidity"/>
      <CustomButton disabled text="Submit" class="page__form-button"/>
    </form>
    <p class="page__footer">
      First time user?
      <router-link class="page__footer-link" to="/register"> Register </router-link>
    </p>
  </q-page>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import CustomInput from 'src/components/input/CustomInput.vue';
import CustomButton from 'src/components/CustomButton.vue';

const $form = ref(null)

const violationTypeOptions = [
  "Unauthorized or illegal possession of controlled substances" ,
  "Bringing and/or drinking liquor or alcoholic beverages",
  "Carrying or possession of firearms, deadly weapons and explosives within the school premises"
];

const guardOnDutyOptions = [
  "Juan dela Cruz" ,
  "Ernesto Topacio",
  "Tandang Sora",
  "Manong Guard",
];

const isValid = reactive({
  lastName: false,
  studentId: false,
  violationType: false,
  guardOnDuty: false
})

const checkValidity = (e)=> {
  e.valid && e.nonEmpty ? isValid[e.name] = true : isValid[e.name] = false 
}

onMounted(() => {

  watch(isValid, (newIsValid) => {
    const $submit = $form.value.querySelector('.page__form-button')
    let areAllValid = true

    for ( const item in newIsValid ) {
      if ( newIsValid[ item ] === false ) areAllValid = false
    }

    !areAllValid ? $submit.disabled = true : $submit.disabled = false 
  })
})

// watch(isValid, )
</script>

<style scoped lang="sass">
.page
  &__form
    display: flex
    flex-direction: column
    gap: 2.4rem
    align-items: center

  &__footer
    margin-top: 4.8rem
    font-size: 1.4rem
    font-weight: 500

  &__footer-link
    font-weight: 700
</style>
