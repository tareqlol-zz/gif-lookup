<template>
    <div class="container">
      <section class="keyword-search">
       <div class="row">
          <div class="col s12 m6 white-text intro">
            <h1>Gif Lookup</h1>
            <p>From here you can look for gif images using <b><a target="_blank" href="https://giphy.com/">GIPHY's</a> API.</b></p>
            <p>Start typing a keyword, or nothing for random gifs!</p>
          </div>
          <div class="col s12 m6">
            <div class="card">
              <form v-if="!loading" name="searchForm" novalidate="novalidate" v-on:submit.prevent="search">
                <div class="col s12 m10">
                  <div class="input-field">
                    <input name="searchQuery" required placeholder="keyword for ex('sherlock', 'cats')" type="text" v-model.trim="searchQuery">
                    <label for="searchQuery" class="active">Search</label>
                  </div>
                </div>
                <div class="col s12 m2">
                  <div class="input-field">
                    <input v-model="limit" type="number" min="1" max="30" @blur="limitNumber" value="30">
                    <label for="searchQuery" class="active">limit</label>
                  </div>
                </div>
                  <button class="btn" type="submit" name="action">Search</button>
              </form>
              <div v-if="loading" class="preloader-wrapper active">
                <div class="spinner-layer spinner-green-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      searchQuery: '',
      limit: 30,
      loading: false,
    };
  },
  methods: {
    search() {
      this.loading = true;
      this.$router.push({ name: 'SearchPage', params: { keyword: (this.searchQuery ? this.searchQuery : 'random'), limit: this.limit } });
    },
    limitNumber(event) {
      if ((event.target.value) < (event.target.min)) {
        this.limit = event.target.min;
      }
      if ((event.target.value) > (event.target.max)) {
        this.limit = event.target.max;
      }
    },
  },
};
</script>
<style scoped>
  .keyword-search{margin-top: 25vh;}
  .intro{font-size: 25px;}
  a{color:#121212;text-decoration: underline;}
  .card{
    padding: 10px;
    margin-top: 80px;
    min-height: 137px;
  }
  .preloader-wrapper{margin-top: 30px;}
</style>
