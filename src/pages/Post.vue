<template>
  <div class="container mx-auto p-4 md:p-8">
    <h1 class="text-xl md:text-3xl pt-1 pb-2 md:pb-4 md:pt-3 border-b">
      {{ post.Title }}
    </h1>
    <viewer class="test" :value="post.Body"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import apireq from '@/utils/apiRequest';

@Component
export default class Post extends Vue {
  post = {
    Board: null,
    BoardID: 0,
    Body: 'loading...',
    CreatedAt: '0',
    DeletedAt: '0',
    Description: '',
    ID: 0,
    PostTags: [],
    Title: '',
    UpdatedAt: '0',
  };

  created() {
    apireq('GET', `/post/${this.$route.params.post_id}`)
      .then((res) => {
        this.post = res.data.data;
      });
  }
}
</script>

<style scoped>
.tui-editor-contents {
  font-size: 18px;
}
</style>
