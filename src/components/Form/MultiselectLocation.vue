<template>
  <div class="form-group">
    <div class="d-flex gap-3 align-items-center mt-3">
      <label for="searchFilters">Localização</label>
      <input type="text"
             class="form-control search"
             name="searchLcations" id="searchLcations"
             placeholder="Pesquisar..."
             v-model="searchText"
             @change="startSearch()"
      />
    </div>
    <div class="mt-3" v-if="isActive">
      <CheckBox v-for="dataFilter in dataSearch.slice(0, 20)"
                :key="dataFilter.id"
                :label="dataFilter.label"
                :value="dataFilter.value"
                :subline="dataFilter.subline"
                @click="checkFilter(dataFilter)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CheckBox from '@/components/Form/CheckBox.vue';
import { mapMutations, mapState } from 'vuex';

@Options({
  name: 'MultiselectLocation',
  components: {
    CheckBox,
  },
  data() {
    return {
      dataLocation: [],
      dataSearch: [],
      isActive: false,
      searchText: '',
    };
  },
  beforeMount() {
    this.getLocations();
  },
  computed: mapState(['locations']),
  methods: {
    ...mapMutations(['setLocations']),
    checkFilter(data: any) {
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
    startSearch() {
      const totalFilters = this.dataLocation;
      const searchText = this.searchText.toLowerCase();
      const dataSearch = totalFilters.filter((item: any) => {
        const searchWords = searchText.split(' ');
        const label = item.label.toLowerCase();
        // const subline = item.subline.toLowerCase();
        const searchAll = searchWords.reduce((a: boolean, word: string) => {
          const regexp = new RegExp(`\\b${word}\\b`, 'i');
          const match = (label.match(regexp));
          return (a && match);
        }, true);
        return searchAll;
      });
      this.dataSearch = (searchText !== '' ? dataSearch : []);
      this.isActive = (searchText !== '');
    },
    async getLocations() {
      const localLocation = localStorage.getItem('location');
      if (localLocation) this.dataLocation = JSON.parse(localLocation);
      else {
        const res = await fetch('https://filters.app3.speedio.com.br/api/v3/filters.json');
        const dataJson = await res.json();
        const cities = dataJson.filters[1].filters[4].filterOptions;
        const states = dataJson.filters[1].filters[5].filterOptions;
        const location = [...states, ...cities];
        localStorage.setItem('location', JSON.stringify(location));
        this.dataLocation = location;
      }
    },
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
