import HelloWorld from '@/pages/HelloWorld.vue';
import CreatePost from '@/pages/admin/CreatePost.vue';

export default [
  { path: '', name: 'admin', component: HelloWorld },
  { path: '/new-post', name: 'admin', component: CreatePost },
];
