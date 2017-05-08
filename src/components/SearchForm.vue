<template>
    <section v-bind:class="{'loading': showLoading}" class="actions keyword-search">
        <form name="searchForm" novalidate v-on:submit.prevent="search">
            <h4>Search by a keyword</h4>
            <input name="searchQuery" required placeholder="keyword for ex('sherlock', 'cats')" type="text" v-model.trim="searchQuery">
            <button>Search</button>
        </form>
    </section>
</template>

<script>
import giphyService from '@/services/giphyService';

export default {
  name: 'SearchForm',
  data() {
    return {
      showLoading: false,
      searchQuery: '',
    };
  },
  methods: {
    search() {
      const me = this;
      this.showLoading = !this.showLoading;
      giphyService
        .get(this.searchQuery)
        .then((list) => {
          window.console.log(list);
          window.console.log(me.$parent);
          me.$parent.images = list;
        });
    },
  },
};
</script>
