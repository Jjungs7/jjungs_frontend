<template>
  <authenticated>
    <div class="text-right">
      <router-link to="/admin/new-post">
        <my-button class="my-3">글쓰기</my-button>
      </router-link>
    </div>
    <get-posts @edit-post="editPost" @delete-post="deletePost"/>
  </authenticated>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MyButton from '@/components/MyButton.vue';
import apireq from '@/utils/apiRequest';
import PostMetadata from '@/components/PostMetadata.vue';
import Authenticated from '@/components/Authenticated.vue';
import GetPosts from '@/components/GetPosts.vue';

@Component({
  components: {
    GetPosts,
    Authenticated,
    PostMetadata,
    'my-button': MyButton,
  },
})
export default class ManagePosts extends Vue {
  posts: myPost[] = [];

  editPost(postId: number) {
    this.$router.push({
      name: 'edit',
      params: {
        postId: postId.toString(),
      },
    });
  }

  deletePost(postId: number) {
    apireq('delete', '/admin/post', {
      id: postId,
    }).then((res) => {
      // done
    });
  }

  created() {
    apireq('get', '/post/0?type=board')
      .then((res) => {
        this.posts = res.data.data.posts;
      });
  }
}
</script>
