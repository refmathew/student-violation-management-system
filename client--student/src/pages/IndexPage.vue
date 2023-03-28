<template>
  <q-page class="page__main">
    <form class="page__inputs">
      <CustomInput type="text" placeholder="Last name" iconName="student"/>
      <CustomInput type="password" placeholder="Student Id (Include dash. Ex: 18-00829)" iconName="studentId"/>
      <CustomInput type="select" placeholder="Violation Type" iconName="violationType" :selectOptions="violationTypeOptions"/>
      <CustomInput type="select" placeholder="Guard on Duty" iconName="guardOnDuty" :selectOptions="guardOnDutyOptions"/>
    </form>
    <p class="page__footer">
      First time user?
      <router-link class="page__footer-link" to="/register"> Register </router-link>
    </p>
  </q-page>
</template>

<script setup>
import CustomInput from 'src/components/input/CustomInput.vue';

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
</script>

<style scoped lang="sass">
.page
  &__inputs
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
