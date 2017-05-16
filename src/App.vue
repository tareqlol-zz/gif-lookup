<template>
  <div id="app">
    <router-view></router-view>
    <img class="powered-by-giphy" src="./assets/img/PoweredBy_200px-White_HorizLogo.png">
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
body{background: #00bcd4;}
#app {
  font-family: "PT Sans Narrow", 'Avenir', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.powered-by-giphy{
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
