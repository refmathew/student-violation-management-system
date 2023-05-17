<template>
  <div class="page--login">
    <div class="page--login__title-container">
      <div class="page--login__title">Student Violation Record System</div>
      <div class="page--login__sub-title">Sign in to continue</div>
    </div>
    <q-form class="page--login__form" @submit="handleSubmit">
      <q-input
        class="page--login__username"
        v-model="username"
        label="Username"
        filled
        color="deep-purple-12"
      />
      <q-input
        class="page--login__password"
        v-model="password"
        type="password"
        label="Password"
        filled
        color="deep-purple-12"
      />
      <q-btn label="Sign in" type="Submit" color="deep-purple-12" />
    </q-form>
  </div>
</template>

<script>
import UserService from "../services/UserService";
import { useUserStore } from "../stores/user-store.js";
import { useQuasar } from "quasar";

export default {
  data() {
    return {
      username: "",
      password: "",
      $q: useQuasar(),
      userStore: useUserStore(),
    };
  },
  methods: {
    async handleSubmit() {
      const response = await UserService.SignIn(this.username, this.password);

      if (!this.username || !this.password) {
        return this.$q.notify({
          message: "Please fill input fields",
          color: "warning",
          textcolor: "secondary-3",
          icon: "warning",
          badgecolor: "warning",
          badgetextcolor: "secondary-3",
        });
      }

      if (response.success === false) {
        return this.$q.notify({
          message: response.message,
          color: "warning",
          textcolor: "secondary-3",
          icon: "warning",
          badgecolor: "warning",
          badgetextcolor: "secondary-3",
        });
      }

      this.userStore.$patch({ user: response.data });

      this.$router.push("/");
    },
  },
  setup() {},
};
</script>

<style scoped lang="scss">
.page--login {
  min-height: 100vh;
  min-width: 100%;
  padding: 12.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $secondary-3;

  &__title-container {
    margin-bottom: 2.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4.8rem;
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    color: $primary-1;
  }

  &__title {
    font-size: 3.6rem;
  }

  &__sub-title {
    font-size: 2rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
  }

  &__username {
  }

  &__password {
  }
}
</style>
