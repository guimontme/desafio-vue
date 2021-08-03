<template>
  <div class="form-group">
    <div class="d-flex gap-3 align-items-center mt-3">
      <label for="searchFilters">Setores</label>
      <input type="text"
             class="form-control search"
             name="searchFilters" id="searchFilters"
             placeholder="Pesquisar..."
             v-model="searchText"
             @focusout="startSearch()"
      />
      <button class="btn btn-primary" @click="startSearch()">Buscar</button>
    </div>
    <div class="mt-3" v-if="isActive">
      <CheckBox v-for="dataFilter in dataSearch.slice(0, 20)"
                :key="dataFilter.id"
                :label="dataFilter.label"
                :value="dataFilter.value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CheckBox from '@/components/Form/CheckBox.vue';

@Options({
  components: {
    CheckBox,
  },
  data() {
    return {
      dataFilters: [],
      dataSearch: [],
      dataLocation: [],
      isActive: false,
      searchText: '',
    };
  },
  beforeMount() {
    this.getFilters();
  },
  methods: {
    startSearch() {
      const totalFilters = this.dataFilters;
      const searchText = this.searchText.toLowerCase();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dataSearch = totalFilters.filter((item: any) => {
        const searchWords = searchText.split(' ');
        const label = item.label.toLowerCase();
        const searchAll = searchWords.reduce((a: any, word: any) => {
          const regexp = new RegExp(`\\b${word}\\b`, 'i');
          return (a && label.match(regexp));
        }, true);
        return searchAll;
      });
      this.dataSearch = dataSearch;
      this.isActive = (searchText !== '');
    },
    async getFilters() {
      const filtersLocal = localStorage.getItem('filters');
      if (filtersLocal) this.dataFilters = JSON.parse(filtersLocal);
      else {
        try {
          const res = await fetch('https://filters.app3.speedio.com.br/api/v3/filters.json');
          const dataJson = await res.json();
          const filters = dataJson.filters[0].filters[0].filterOptions;
          localStorage.setItem('filters', JSON.stringify(filters));
          this.dataFilters = filters;
        } catch (e) {
          console.error('There was an error!', e);
        }
      }
    },
    // async getLocation() {
    //   const localLocation = localStorage.getItem('location');
    //   if (localLocation) this.dataLocation = JSON.parse(localLocation);
    //   else {
    //     const res = await fetch('https://filters.app3.speedio.com.br/api/v3/filters.json');
    //     const dataJson = await res.json();
    //     const cities = dataJson.filters[1].filters[4].filterOptions;
    //     const states = dataJson.filters[1].filters[5].filterOptions;
    //     const location = [...states, ...cities];
    //     localStorage.setItem('location', JSON.stringify(location));
    //     this.dataLocation = location;
    //   }
    // },
  },
})
export default class Multiselect extends Vue {
}
</script>

<style scoped>
  input.search {
    background: #ccc !important;
    border-radius: 30px;
    width: 100%;
  }
</style>
