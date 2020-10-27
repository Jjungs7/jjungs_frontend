<template>
  <div class="container mx-auto mb-6 px-6 py-4 lg:px-32 xl:px-64 md:px-8 md:py-4">
    <h1 class="text-3xl font-medium md:text-4xl pt-1 md:pt-3">
      {{ post.Title }}
    </h1>
    <p class="text-sm md:text-base float-right text-blue-500 cursor-pointer"
       @click="toComments">댓글 보기</p>
    <post-metadata class="text-xs md:text-sm md:mb-1 pb-2 text-gray-800 border-b" :post="post"/>
    <viewer ref="tuiViewer"/>
    <div id="comments" class="mx-auto border-t-2 p-2 pt-4 mt-8 border-gray-600 border-opacity-25">
      <Disqus :url="this.$route.path"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { apireq } from '@/utils/apiRequest';
import PostMetadata from '@/components/PostMetadata.vue';
import { Viewer } from '@toast-ui/vue-editor';

@Component({
  components: {
    'post-metadata': PostMetadata,
  },
})
export default class Post extends Vue {
  // states
  post: myPost = {
    BoardID: 0,
    Body: 'loading...',
    CreatedAt: '0',
    DeletedAt: '0',
    Description: '',
    ID: 0,
    PostTags: [],
    Title: '',
    UpdatedAt: '0',
    Hits: 0,
  };

  @Ref() tuiViewer!: Viewer;

  // methods
  toComments() {
    const commentEl = document.getElementById('comments');
    if (commentEl) {
      commentEl.scrollIntoView(false);
    }
  }

  // lifecycle
  created() {
    apireq('GET', `/post/${this.$route.params.post_id}?type=post`)
      .then((res) => {
        this.post = res.data.data;
        this.tuiViewer.invoke('setMarkdown', this.post.Body);
      });
  }
}
</script>

<style>
.tui-editor-contents {
  font-size: 1rem;
}

.tui-editor-contents pre {
  font-size: 0.9rem;
}

.tui-editor-contents img {
  @apply mx-auto
}

@media (min-width: 768px) {
  .tui-editor-contents {
    font-size: 1.1rem;
  }

  .tui-editor-contents pre {
    font-size: 0.95rem;
  }
}
</style>
