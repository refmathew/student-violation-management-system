<template>
  <q-page class="page--settings">
    <q-form class="page--settings__form" @submit="handleViolationSubmit">
      <div class="page--settings__form-title">New Violation</div>
      <div class="page--settings__form-main">
        <q-input class="page--settings__form-input" v-model="violation.name" label="Details*" filled
          color="deep-purple-12" :rules="inputRules" />
        <q-input class="page--settings__form-input" v-model="violation.number" label="Number*" filled
          color="deep-purple-12" :rules="inputRules" />
        <q-toggle class="page--settings__form-toggle" v-model="violation.isMajor"
          :label="violation.isMajor === 0 ? 'Minor' : 'Major'" :false-value="0" :true-value="1"
          color="deep-purple-12" />
        <q-btn no-caps type="submit" @submit="handleViolationSubmit">
          Add Violation
        </q-btn>
      </div>
    </q-form>
    <q-form class="page--settings__form" @submit="handleGuardSubmit">
      <div class="page--settings__form-title">New Guard</div>
      <div class="page--settings__form-main">
        <q-input class="page--settings__form-input" v-model="guardFirstName" label="First Name*" filled
          color="deep-purple-12" :rules="inputRules" />
        <q-input class="page--settings__form-input" v-model="guardLastName" label="Last Name*" filled
          color="deep-purple-12" :rules="inputRules" />
        <q-btn no-caps type="submit" @submit="handleGuardSubmit">
          Add Guard
        </q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import AdminService from 'src/services/AdminService';
import { useQuasar } from 'quasar';

export default {
  data() {
    return {
      $q: useQuasar(),
      guardFirstName: '',
      guardLastName: '',
      violation: {
        name: undefined,
        number: undefined,
        isMajor: 0,
      },
      inputRules: [val => (val && val.length > 0) || 'Please provide details'],
    }
  },
  methods: {
    async handleGuardSubmit() {
      const notif = this.$q.notify({
        message: 'Registration in progress...',
        color: 'accent',
        textColor: 'secondary-1',
        group: false,
        timeout: 0,
        spinner: true,
      })

      try {
        const response = await AdminService.registerGuard(this.guardFirstName, this.guardLastName);
        notif({
          message: response.message,
          color: 'accent',
          textColor: 'secondary-1',
          timeout: 4000,
          spinner: false,
          icon: 'done',
        })
      } catch (error) {
        notif({
          message: 'Error',
          caption: error.response.message,
          color: 'warning',
          textColor: 'secondary-1',
          timeout: 12000,
          spinner: false,
          icon: 'warning',
          actions: [
            { label: 'Dismiss', color: 'primary', textColor: 'secondary-1', handler: () => { } }
          ]
        })
      }
    },
    async handleViolationSubmit() {
      const notif = this.$q.notify({
        message: 'Registration in progress...',
        color: 'accent',
        textColor: 'secondary-1',
        group: false,
        timeout: 0,
        spinner: true,
      })

      try {
        const response = await AdminService.registerViolation(this.violation.name, this.violation.number, this.violation.isMajor);
        notif({
          message: response.data.message,
          color: 'accent',
          textColor: 'secondary-1',
          timeout: 4000,
          spinner: false,
          icon: 'done',
        })
      } catch (error) {
        notif({
          message: 'Error',
          caption: error.response.data.message,
          color: 'warning',
          textColor: 'secondary-1',
          timeout: 12000,
          spinner: false,
          icon: 'warning',
          actions: [
            { label: 'Dismiss', color: 'secondary-1', textColor: 'secondary-1', handler: () => { } }
          ]
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
.page--settings {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  &__form {
    width: 51.2rem;
    padding: 3.2rem;
    border: .2rem solid rgba(0, 0, 0, .12);
    border-radius: .8rem;
  }

  &__form-title {
    margin-bottom: 1.6rem;
    font-size: 1.8rem;
    font-weight: 600;
  }

  &__form-main {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  &__form-toggle {
    margin: -.8rem;
  }
}
</style>
