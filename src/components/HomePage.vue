<template>
  <section class="content">
    <section is="SearchForm"></section>
  </section>
</template>

<script>
import SearchForm from '@/components/SearchForm';

export default {
  name: 'home',
  data() {
    return {
      images: [],
    };
  },
  components: { SearchForm },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
