<template>
  <tr>
    <td :class="$style.picture">
      <img :src="recipe.picture" :alt="recipe.name">
    </td>
    <td :class="$style.name">
      <span>{{ recipe.name }}</span>
    </td>
    <td :class="$style.description">
      <span>{{ recipe.description }}</span>
    </td>
    <td :class="$style.editButton">
      <v-btn text icon :to="routeEdit">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn text icon v-on:click="onDelete(recipe.id)">
        <v-icon>delete</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { privateRoutes } from "../../../../router";
import { Recipe } from "../viewModel";

export default Vue.extend({
  name: "RowComponent",
  props: {
    recipe: { required: true } as PropOptions<Recipe>,
    onDelete: { required: true } as PropOptions<(recipeId: number) => void>,
  },
  computed: {
    routeEdit(): string {
      return `${privateRoutes.recipe}/${this.recipe.id}`;
    },
    deleteRecipe(): void {

    }
  },
});
</script>

<style module>
.name {
  padding-left: 15px;
  width: 25%;
}

.description {
  max-width: 177px;
}

.description span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
}

.edit-button {
  text-align: end;
}

.picture img {
  height: 100px;
  object-fit: cover;
  width: 100%;
}
</style>
