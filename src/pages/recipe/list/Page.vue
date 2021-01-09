<template>
  <app-layout>
    <v-card>
      <v-card-title class="text-h4">
        Recipes
        <v-btn text icon :to="routeAdd">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <search-bar-component :search-text="searchText" :on-search="onSearch" />
        <table-component :recipes="recipes" v-bind="{ onDelete }" />
      </v-card-text>
    </v-card>
  </app-layout>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { AppLayout } from "../../../common/layouts";
import { Recipe } from "./viewModel";
import { TableComponent, SearchBarComponent } from "./components";
import { privateRoutes } from "../../../router";

export default Vue.extend({
  name: "RecipeListPage",
  components: { AppLayout, TableComponent, SearchBarComponent },
  props: {
    recipes: { required: true } as PropOptions<Recipe[]>,
    searchText: String,
    onSearch: { required: true } as PropOptions<(value: string) => void>,
    onDelete: { required: true } as PropOptions<(recipeId: number) => void>,
  },
  computed: {
    routeAdd(): string {
      return `${privateRoutes.add}`;
    },
  }
});
</script>
