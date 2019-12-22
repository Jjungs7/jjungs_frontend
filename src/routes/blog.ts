import Blog from '@/pages/Blog.vue';
import Post from '@/pages/Post.vue';

export default [
  { path: '', name: 'blog', component: Blog },
  { path: '/:post_id', name: 'post', component: Post },
];
