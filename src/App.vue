<template>
  <div class="container">
    <Multiselect />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Multiselect from '@/components/Form/Multiselect.vue';

@Options({
  components: {
    Multiselect,
  },
  data() {
    return {
      dataFilters: [],
      dataLocation: [],
    };
  },
  beforeMount() {
    // this.getFilters();
    // this.getLocation();
  },
  methods: {
    // async getFilters() {
    //   const filtersLocal = localStorage.getItem('filters');
    //   if (filtersLocal) this.dataFilters = JSON.parse(filtersLocal);
    //   else {
    //     try {
    //       const res = await fetch('https://filters.app3.speedio.com.br/api/v3/filters.json');
    //       const dataJson = await res.json();
    //       // const filters = dataJson.filters[0].filters[0].filterOptions;
    //       const filters = dataJson.filters[0].filters[0].filterOptions;
    //       localStorage.setItem('filters', JSON.stringify(filters));
    //       this.dataFilters = filters;
    //     } catch (e) {
    //       console.error('There was an error!', e);
    //     }
    //   }
    // },
    // async getLocation() {
    //   const localLocation = localStorage.getItem('location');
    //   if (localLocation) this.dataLocation = JSON.parse(localLocation);
    //   else {
    //     const res = await fetch('https://filters.app3.speedio.com.br/api/v3/filters.json');
    //     const dataJson = await res.json();
    //     const cities = dataJson.filters[1].filters[4].filterOptions;
    //     const states = dataJson.filters[1].filters[5].filterOptions;
    //     console.log(states);
    //     const location = [[...states], [...cities]];
    //     // console.log(location);
    //     localStorage.setItem('location', JSON.stringify(location));
    //     this.dataLocation = location;
    //   }
    // },
  },
})
export default class App extends Vue {}
</script>

<style>

</style>
