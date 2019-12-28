export default {
  path: '/admin',
  component: () => import(/* webpackChunkName: "adminMain" */'@/pages/admin/Main.vue'),
  redirect: '/admin/post',
  children: [
    {
      path: 'new-post',
      component: () => import(/* webpackChunkName: "postPost" */'@/pages/admin/PostPost.vue'),
    },
    {
      path: 'edit-post/:postId',
      name: 'edit',
      component: () => import(/* webpackChunkName: "postPost" */'@/pages/admin/PostPost.vue'),
    },
    {
      path: 'post',
      component: () => import(/* webpackChunkName: "managePost" */'@/pages/admin/ManagePosts.vue'),
    },
    {
      path: 'board',
      component: () => import(/* webpackChunkName: "manageBoard" */'@/pages/admin/ManageBoards.vue'),
    },
  ],
};
