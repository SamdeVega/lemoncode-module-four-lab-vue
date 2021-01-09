<template>
  <recipe-create-page v-bind="{ recipe, recipeError, onCreateRecipe, onAddIngredient, onSave, onRemoveIngredient }" />
</template>

<script lang="ts">
import Vue from "vue";
import RecipeCreatePage from "./Page.vue";
import { fetchRecipeById, save } from "../../../rest-api/api/recipe";
import { mapRecipeModelToVm, mapRecipeVmToModel } from "./mapper";
import { createEmptyRecipe, createEmptyRecipeError } from "./viewModel";
import { validations } from "./validations";
import { fetchRecipes } from "../../../rest-api/api/recipe";
import { Recipe } from "./viewModel";
import { mapRecipeListModelToVm } from "./mapper";

export default Vue.extend({
  name: "CreateRecipePageContainer",
  components: { RecipeCreatePage },
  props: { id: String },
  data() {
    return {
      recipe: createEmptyRecipe(),
      recipeError: createEmptyRecipeError(),
      recipes: [] as Recipe[]
    };
  },
  beforeMount() {
    const id = Number(this.id || 0);
    fetchRecipeById(id)
      .then((recipe) => {
        this.recipe = mapRecipeModelToVm(recipe);
      })
      .catch((error) => console.log(error));
  },
  created() {
    fetchRecipes()
      .then((recipes) => {
        this.recipes = mapRecipeListModelToVm(recipes);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    onCreateRecipe(field: string, value: string) {
      this.recipe = {
        ...this.recipe,
        [field]: value,
      };
      this.validateRecipeField(field, value);
    },
    onSave() {
      validations.validateForm(this.recipe).then((result) => {
        if (result.succeeded) {
          console.log(result)
          const recipe = mapRecipeVmToModel(this.recipe);
          console.log(recipe)
          save(recipe)
            .then((message) => {
              console.log(message);
              this.$router.back();
            })
            .catch((error) => console.log(error));
        } else {
          this.recipeError = {
            ...this.recipeError,
            ...result.fieldErrors,
          };
        }
      });
    },
    onAddIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients || [], ingredient],
      };
      this.validateRecipeField("ingredients", this.recipe.ingredients);
    },
    onRemoveIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter((item) => item !== ingredient),
      };
      this.validateRecipeField("ingredients", this.recipe.ingredients);
    },
    validateRecipeField(field, value) {
      validations.validateField(field, value).then((result) => this.createRecipeError(field, result));
    },
    createRecipeError(field, result) {
      this.recipeError = {
        ...this.recipeError,
        [field]: result,
      };
    },
  },
});
</script>
