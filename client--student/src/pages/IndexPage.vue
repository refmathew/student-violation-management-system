<template>
  <q-page class="page__main">
    <form class="page__form" ref="$form" @submit="handleSubmit">
      <CustomInput
        name="lastName"
        type="text"
        placeholder="Last name"
        iconName="student"
        validationCriteria="^[a-zA-Z]+$"
        @validate-input="checkValidity"
      />
      <CustomInput
        name="studentId"
        type="password"
        placeholder="Student Id (Include dash. Ex: 18-00829)"
        iconName="studentId"
        validationCriteria="^\d\d-\d\d\d\d\d$"
        validationErrorMessage="Please check input format"
        @validate-input="checkValidity"
      />
      <q-select
        class="page__select-input"
        filled
        v-model="violation"
        use-input
        input-debounce="0"
        label="Violation"
        :options="violationList"
        @filter="violationFilter"
      >
        <template v-slot:prepend>
          <q-icon name="error" style="color: #8b86bd" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        class="page__select-input"
        filled
        v-model="guard"
        use-input
        input-debounce="0"
        label="Guard on Duty"
        :options="guardList"
        @filter="filterFn"
      >
        <template v-slot:prepend>
          <q-icon name="shield" style="color: #8b86bd" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <CustomButton
        @click="handleSubmit"
        text="Submit"
        class="page__form-button"
      />
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
import UserService from "../services/UserService";
import CustomInput from "src/components/input/CustomInput.vue";
import CustomButton from "src/components/CustomButton.vue";
import AppService from "src/services/AppService";
const $q = useQuasar();

const guard = ref(null);
const guardList = ref([]);
const getGuardList = async () => {
  let response = await AppService.getGuardList();
  guardList.value = response.data.data.map((data) => {
    return data.name;
  });
};
getGuardList();

const violation = ref(null);
const violationList = ref([]);
const getViolationList = async () => {
  let response = await AppService.getViolationList();
  violationList.value = response.data.data.map((data) => {
    return data.violation;
  });
};
getViolationList();

// =========================================================================== >

const inputs = reactive({
  studentId: {
    inputValue: undefined,
    isValid: false,
  },
  lastName: {
    inputValue: undefined,
    isValid: false,
  },
});

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
  if (!guard.value) areAllValid = false;
  if (!violation.value) areAllValid = false;

  if (!areAllValid) {
    $q.notify({
      message: "Please complete required fields",
      color: "warning",
      textColor: "secondary",
      icon: "warning",
      badgeColor: "warning",
      badgeTextColor: "secondary",
    });
  } else {
    recordViolation(
      inputs.lastName.inputValue,
      inputs.studentId.inputValue,
      violation.value,
      guard.value
    );
  }
};

const recordViolation = async (
  lastName,
  studentId,
  violationType,
  guardOnDuty
) => {
  const notif = $q.notify({
    message: "Recording...",
    color: "accent",
    textColor: "secondary",
    group: false,
    timeout: 0,
    spinner: true,
  });

  try {
    const response = await UserService.recordViolation(
      lastName,
      studentId,
      violationType,
      guardOnDuty
    );
    notif({
      message: response.data.message,
      color: "accent",
      textColor: "secondary",
      timeout: 4000,
      spinner: false,
      icon: "done",
    });
  } catch (error) {
    notif({
      message: "Error",
      caption: error.response.data.message,
      color: "warning",
      textColor: "secondary",
      timeout: 12000,
      spinner: false,
      icon: "warning",
      actions: [
        {
          label: "Dismiss",
          color: "primary",
          textColor: "secondary",
          handler: () => {},
        },
      ],
    });
  }
};
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

  &__select-input
    width: 100%
    background: $secondary-1
    border-radius: 1.6rem
    overflow: hidden

  &__footer
    margin-top: 4.8rem
    font-size: 1.4rem
    font-weight: 500

  &__footer-link
    font-weight: 700
</style>
