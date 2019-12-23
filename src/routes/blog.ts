export default [
  {
    path: '',
    name: 'blog',
    component: () => import(/* webpackChunkName: "blog" */ '@/pages/Blog.vue'),
  },
  {
    path: '/:post_id',
    name: 'post',
    component: () => import(/* webpackChunkName: "post" */ '@/pages/Post.vue'),
  },
];
