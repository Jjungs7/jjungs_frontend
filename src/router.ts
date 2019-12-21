import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import Blog from '@/components/Blog.vue';
import Post from '@/components/Post.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'hello', component: HelloWorld },
    { path: '/blog', name: 'blog', component: Blog },
    { path: '/blog/:post_id', name: 'post', component: Post },
  ],
});
