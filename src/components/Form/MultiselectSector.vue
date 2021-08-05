<template>
  <div class="form-group">
    <div class="d-flex gap-3 align-items-center mt-3">
      <label for="searchFilters">Setores</label>
      <input type="text"
             class="form-control search"
             name="searchFilters" id="searchFilters"
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
                :checked="false"
                @click="checkFilter(dataFilter)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CheckBox from '@/components/Form/CheckBox.vue';
import { mapState, mapMutations } from 'vuex';

@Options({
  name: 'Multiselect',
  components: {
    CheckBox,
  },
  data() {
    return {
      dataFilters: [],
      dataSearch: [],
      isActive: false,
      searchText: '',
    };
  },
  beforeMount() {
    this.getFilters();
  },
  computed: mapState(['sectors']),
  methods: {
    ...mapMutations(['setSectors']),
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
        localStorage.setItem('checkedSectors', JSON.stringify(array));
        this.setSectors(array);
      }
    },
    startSearch() {
      const totalFilters = this.dataFilters;
      const searchText = this.searchText.toLowerCase();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dataSearch = totalFilters.filter((item: any) => {
        const searchWords = searchText.split(' ');
        const label = item.label.toLowerCase();
        const searchAll = searchWords.reduce((a: boolean, word: string) => {
          const regexp = new RegExp(`\\b${word}\\b`, 'i');
          return (a && label.match(regexp));
        }, true);
        return searchAll;
      });
      this.dataSearch = (searchText !== '' ? dataSearch : []);
      this.isActive = (searchText !== '');
    },
    async getFilters() {
      const filtersLocal = localStorage.getItem('sectors');
      if (filtersLocal) this.dataFilters = JSON.parse(filtersLocal);
      else {
        try {
          const res = await fetch('https://filters.app3.speedio.com.br/api/v3/filters.json');
          const dataJson = await res.json();
          const filters = dataJson.filters[0].filters[0].filterOptions;
          localStorage.setItem('sectors', JSON.stringify(filters));
          this.dataFilters = filters;
        } catch (e) {
          console.error('There was an error!', e);
        }
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
