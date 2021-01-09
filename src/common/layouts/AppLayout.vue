<template>
  <div>
    <v-app-bar app dark color="amber">
      <v-toolbar-title>Recipe App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            color="warning"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>account_circle</v-icon> {{ user }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="onLogout">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-container class="py-10">
      <slot />
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { baseRoutes } from "../../router";
import { logoutRequest } from "../../rest-api/api/user";

export default Vue.extend({
  name: "AppLayout",
  data() {
    return {
      user: '',
    }
  },
  beforeMount() {
    this.user =  localStorage.getItem('recipe_app_user') || ''
  },
  methods: {
    onLogout() {
      logoutRequest().then(() => {
        this.$router.push(baseRoutes.login)
      })
    }
  }
});
</script>