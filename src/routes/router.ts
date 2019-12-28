import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/pages/Main.vue';
import blog from '@/routes/blog';
import admin from '@/routes/admin';

Vue.use(VueRouter);
const withPrefix = (prefix: string, routes: any[]): any[] => routes.map((route) => {
  const newRoute = route;
  newRoute.path = prefix + route.path;
  return newRoute;
});

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'main', component: Main },
    { path: '/login', name: 'login', component: () => import(/* webpackChunkName: "login" */'@/pages/Login.vue') },
    { path: '/me', name: 'me', component: () => import(/* webpackChunkName: "me" */'@/pages/Me.vue') },
    admin,
    ...withPrefix('/blog', blog),
  ],
});
