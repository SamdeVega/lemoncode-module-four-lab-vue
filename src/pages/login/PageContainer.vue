<template>
  <login-page v-bind="{ login, updateLogin, loginRequest, loginError, requestError }" />
</template>

<script lang="ts">
import Vue from "vue";
import { loginRequest } from "../../rest-api/api/user";
import { privateRoutes } from "../../router";
import LoginPage from "./Page.vue";
import { createEmptyLogin, Login, createEmptyLoginError } from "./viewModel";
import { mapLoginVMToModel } from "./mapper";
import { validation } from "./validations";

export default Vue.extend({
  name: "PageLoginContainer",
  components: { LoginPage },
  data() {
    return {
      login: createEmptyLogin(),
      loginError: createEmptyLoginError(),
      requestError: '',
    };
  },
  methods: {
    updateLogin(field: string, value: string) {
      this.login = {
        ...this.login,
        [field]: value
      };

      validation.validateField(field, value).then(result => {
        this.loginError = {
          ...this.loginError,
          [field]: result
        };
      });
    },
    loginRequest() {
      this.requestError = ''
      validation.validateForm(this.login).then(result => {
        if (result.succeeded) {
          const loginModel = mapLoginVMToModel(this.login);
          loginRequest(loginModel)
            .then(() => {
              this.$router.push(privateRoutes.recipe);
            })
            .catch(error => {
              this.requestError = error
            });
        } else {
          this.loginError = {
            ...this.loginError,
            ...result.fieldErrors,
          };
        }
      });
    }
  }
});
</script>
