<template>
  <section class="content">
    <section is="SearchForm"></section>
    <section is="SearchList" :images="images" keep-alive></section>
  </section>
</template>

<script>
import SearchForm from '@/components/SearchForm';
import SearchList from '@/components/SearchList';

export default {
  name: 'home',
  data() {
    return {
      images: [],
    };
  },
  components: { SearchForm, SearchList },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
