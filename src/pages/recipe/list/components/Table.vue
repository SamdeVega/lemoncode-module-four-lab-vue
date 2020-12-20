<template>
  <v-data-table
    :headers="[
      { text: 'Picture', value: 'picture' },
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: '' },
    ]"
    :items="recipes"
    item-key="name"
  >
    <template v-slot:[`item`]="{ item }">
      <row-component :key="item.id" :recipe="item" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Recipe } from "../viewModel";
import HeaderComponent from "./Header.vue";
import RowComponent from "./Row.vue";

export default Vue.extend({
  name: "TableComponent",
  components: { HeaderComponent, RowComponent },
  props: {
    recipes: { required: true } as PropOptions<Recipe[]>,
  },
});
</script>

<style scoped>
.table {
  border-collapse: collapse;
  width: 100%;
}

.table tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
