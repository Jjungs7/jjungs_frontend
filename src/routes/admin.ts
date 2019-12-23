export default [
  {
    path: '',
    name: 'admin',
    component: () => import(/* webpackChunkName: "mainAdmin" */ '@/pages/admin/Main.vue'),
  },
  {
    path: '/new-post',
    name: 'newPost',
    component: () => import(/* webpackChunkName: "postPost" */ '@/pages/admin/PostPost.vue'),
  },
];
