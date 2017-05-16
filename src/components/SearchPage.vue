<template>
  <section class="content">
  <!-- loading -->
    <div class="loading white-text center-align" v-show="loading">
      <h4>Looking for {{currentKeyword}}</h4>
      <img src="../assets/img/loading.gif">
    </div>
  <!-- loading -->

  <!-- results -->
    <div class="center-align row" v-show="!loading">
    <h4 class="white-text" v-if="currentKeyword">
      <span v-show="images.length === 0">Opps no results</span>
      <span v-show="images.length">You searched</span>
      for <b>{{currentKeyword}}</b> | <small> <router-link class="text-underline white-text" :to="'/'">back to Search form</router-link></small></h4>

      <div class="img-holder" @click="item.isPlaying = !item.isPlaying" v-for="item in images" v-bind:class="{'playing' :item.isPlaying}">
        <img v-if="!item.isPlaying" v-bind:src="item.stillImage" v-bind:alt="item.title" />
        <video autoplay loop v-if="item.isPlaying">
          <source v-bind:src="item.gifImage" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
        <div class="play-button white-text" v-show="!item.isPlaying">▶</div>
        <div class="stripe white">
          <a class="text-underline black-text" target="_blank" :href="item.url">Giphy link</a> |
          <a class="text-underline black-text" target="_blank" :href="item.gifImage">image link</a>
        </div>
      </div>
    </div>

    <div class="loading white-text center-align" v-show="images.length === 0">
      <img src="https://media.giphy.com/media/KKOMG9EB7VqBq/giphy-downsized-large.gif">
    </div>
  </section>
</template>

<script>
import giphyService from '@/services/giphyService';

export default {
  name: 'searchPage',
  data() {
    return {
      loading: this.$route.params.loading,
      images: this.$route.params.images,
      limit: this.$route.params.limit,
      currentKeyword: this.$route.params.keyword,
    };
  },
  beforeRouteEnter(to, from, next) {
    const params = to.params;
    params.loading = true;
    params.keyword = params.keyword === 'random' ? '' : params.keyword;
    giphyService
      .get(params.keyword, params.limit)
      .then((list) => {
        params.images = list;
        params.loading = false;
        next();
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-underline{
  text-decoration: underline;
}
.img-holder{
  position: relative;
  display: inline-block;
  width: 180px;
  height: 150px;
  padding: 10px;
  background: white;
  margin: 5px;
  border: 5px solid white;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}
 .img-holder img, .img-holder video{
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}
.stripe{
  opacity: .7;
  position: absolute;
  bottom: -20px;
  left: 0;
  padding: 0 5px;
  text-align: right;
  width: 100%;
  transition: 300ms all;
}
.img-holder:hover .stripe{
  bottom: 0;
}
.play-button{
  position: absolute;
  left: 40%;
  top: 38%;
  width: 30px;
  height: 30px;
  line-height: 31px;
  border: 1px dashed;
  text-indent: 3px;
  font-size: 13px;
  border-radius: 100%;
}
</style>
