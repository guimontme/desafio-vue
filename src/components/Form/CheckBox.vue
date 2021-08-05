<template>
  <div class="checkbox">
    <input
      :id="value"
      type="checkbox"
      :value="value"
      :checked="checked"
    />
    <label class="ms-2" :for="value">
      {{ label }} <span v-if="subline" class="small">{{ subline }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'CheckBox',
  props: {
    label: String,
    value: String,
    checked: Boolean,
    subline: String,
  },
  methods: {
    check($event: any) {
      $event.preventDefault();
      if (this.checked === false) {
        this.checked = !this.checked;
      }
    },
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
label .small {
  display: inline-block;
  color: #444;
  background-color: #ddd;
  border-radius: 3px;
  padding: 2px 5px;
  font-size: 0.7em !important;
  margin-left: 10px;
}
</style>
