// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import vueResource from 'node_modules/vue-resource/dist/vue-resource.min';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.use(vueResource);

Vue.config.productionTip = false;

// Vue.http.interceptor.before = (request, next) => {
//   next();
// };

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
