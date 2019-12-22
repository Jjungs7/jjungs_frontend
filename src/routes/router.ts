import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/pages/HelloWorld.vue';
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
    { path: '/', name: 'hello', component: HelloWorld },
    ...withPrefix('/blog', blog),
    ...withPrefix('/admin', admin),
  ],
});
