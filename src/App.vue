<template>
  <div class="container my-4">
    <h1>Desafio Vue.js</h1>
    <Multiselect />
    <MultiselectLocation />
    <div class="row">
      <div class="col-md-6 mt-4">
        <h3 class="h4">Setores</h3>
        <section>
          <CheckBox v-for="sector in sectors"
                          :key="sector.id"
                          :label="sector.label"
                          :value="sector.value"
                          :checked="!!sector"
                          @click="checkFilter(sector)"
                />
        </section>
      </div>
      <div class="col-md-6 mt-4">
        <h3 class="h4">Localização</h3>
         <CheckBox v-for="location in locations"
                          :key="location.id"
                          :label="location.label"
                          :value="location.value"
                          :checked="!!location"
                          @click="checkLocations(location)"
                />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Multiselect from '@/components/Form/MultiselectSector.vue';
import CheckBox from '@/components/Form/CheckBox.vue';
import MultiselectLocation from '@/components/Form/MultiselectLocation.vue';
import { mapState, mapMutations } from 'vuex';

@Options({
  components: {
    Multiselect,
    MultiselectLocation,
    CheckBox,
  },
  beforeMount() {
    this.getSectors();
    this.getLocations();
  },
  computed: mapState(['sectors', 'locations']),
  methods: {
    ...mapMutations(['setSectors', 'setLocations']),
    getSectors() {
      const localChecked = localStorage.getItem('checkedSectors');
      if (localChecked) {
        const checkedFilters = JSON.parse(localChecked);
        this.setSectors(checkedFilters);
      }
    },
    getLocations() {
      const localChecked = localStorage.getItem('checkedLocations');
      if (localChecked) {
        const checkedLocations = JSON.parse(localChecked);
        this.setLocations(checkedLocations);
      }
    },
    checkFilter(data: any) {
      const localChecked = localStorage.getItem('checkedSectors');
      if (localChecked) {
        const checkedFilters = JSON.parse(localChecked);
        const filteredChecked = checkedFilters.filter((item: any) => item.value !== data.value);
        if (filteredChecked.length === checkedFilters.length) {
          checkedFilters.push(data);
          localStorage.setItem('checkedSectors', JSON.stringify(checkedFilters));
          this.setSectors(checkedFilters);
        } else {
          localStorage.setItem('checkedSectors', JSON.stringify(filteredChecked));
          this.setSectors(filteredChecked);
        }
      } else {
        const array = [data];
        localStorage.setItem('checkedFilters', JSON.stringify(array));
        this.setSectors(array);
      }
    },
    checkLocations(data: any) {
      const localChecked = localStorage.getItem('checkedLocations');
      if (localChecked) {
        const checkedLocations = JSON.parse(localChecked);
        const filteredChecked = checkedLocations.filter((item: any) => item.value !== data.value);
        if (filteredChecked.length === checkedLocations.length) {
          checkedLocations.push(data);
          localStorage.setItem('checkedLocations', JSON.stringify(checkedLocations));
          this.setLocations(checkedLocations);
        } else {
          localStorage.setItem('checkedLocations', JSON.stringify(filteredChecked));
          this.setLocations(filteredChecked);
        }
      } else {
        const array = [data];
        localStorage.setItem('checkedLocations', JSON.stringify(array));
        this.setLocations(array);
      }
    },
  },
})
export default class App extends Vue {}
</script>

<style>

</style>
