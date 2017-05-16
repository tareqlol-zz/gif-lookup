import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import SearchPage from '@/components/SearchPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    }, {
      path: '/search/:keyword',
      name: 'SearchPage',
      component: SearchPage,
    }, {
      path: '*',
      redirect: '/',
    },
  ],
});
