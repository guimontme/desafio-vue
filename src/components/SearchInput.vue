<template>
  <div class="form-group">
    <label for="busca">{{ msg }}</label>
    <input type="search"
           class="form-control search"
           name="busca" id="busca"
           placeholder="Pesquisar..."
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  // data() {
  //   return {
  //     teste: '',
  //   };
  // },
  props: {
    msg: String,
  },
})
export default class SearhInput extends Vue {
  msg!: string
}
</script>

<style scoped>
 input.search {
   background: #ccc !important;
   border-radius: 30px;
 }
</style>
