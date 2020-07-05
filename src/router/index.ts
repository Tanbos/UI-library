import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/mybutton',
    name: 'PageMyButton',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/PageMyButton.vue'),
  },
  {
    path: '/mycarousel',
    name: 'PageMyCarousel',
    component: () => import('../views/PageMyCarousel.vue'),
  },
  {
    path: '/mygrid',
    name: 'PageMyGrid',
    component: () => import('../views/PageMyGrid.vue'),
  },
  {
    path: '/mymodal',
    name: 'PageMyModal',
    component: () => import('../views/PageMyModal.vue'),
  },
  {
    path: '/mytable',
    name: 'PageMyTable',
    component: () => import('../views/PageMyTable.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
