<template>
  <div class="search-list">
    <div class="image" @click="item.isPlaying = !item.isPlaying" v-for="item in images" v-bind:class="{'playing' :item.isPlaying}">
      <img v-if="!item.isPlaying" v-bind:src="item.stillImage" v-bind:alt="item.title" >
      <video autoplay loop v-if="item.isPlaying">
        <source v-bind:src="item.gifImage" type="video/mp4">
        Your browser does not support HTML5 video.
      </video>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SearchList',
  props: ['images'],
  data() {
    return {};
  },
};
</script>
