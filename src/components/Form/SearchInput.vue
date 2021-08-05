<template>
  <div class="d-flex gap-3 align-items-center mt-3">
    <label :for="id">{{ title }}</label>
    <input
      type="search"
      class="form-control search"
      :name="id"
      :id="id"
      :placeholder="placeholder"
      :v-model="model"
      @change="change"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'SearhInput',
  props: {
    title: String,
    id: String,
    placeholder: String,
    model: String,
    change: Function,
  },
})
export default class SearhInput extends Vue {
  title!: string;

  id!: string;

  placeholder!: string;
}
</script>

<style scoped>
 input.search {
   background: #ccc !important;
   border-radius: 30px;
 }
</style>
