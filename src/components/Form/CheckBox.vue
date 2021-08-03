<template>
  <div class="checkbox">
    <input :id="value" type="checkbox" :value="value"/>
    <label class="ms-2" :for="value">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    label: String,
    value: String,
  },
})
export default class CheckBox extends Vue {
  label!: string;

  value!: string;
}
</script>

<style scoped>
  .checkbox {
    display: flex;
    align-items: center;
  }
  label {
    display: block;
    width: 100%;
  }
</style>
