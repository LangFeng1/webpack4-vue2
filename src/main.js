import Css from './main.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Foo from './vue/foo.vue';
import Bar from './vue/bar.vue';

const routers = [
  {
    name: 'defaut',
    path: '',
    redirect: {
      name: 'foo'
    }
  },
  {
    name: 'foo',
    path: '/foo',
    component: Foo
  },
  {
    name: 'bar',
    path: '/bar',
    component: Bar
  }
]

const router = new VueRouter({
  routes: routers
})

const app = new Vue({
  router
}).$mount('#app')