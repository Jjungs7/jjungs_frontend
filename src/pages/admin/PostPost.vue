<template>
  <div>
    <div>
      <label for="title">제목:</label>
      <input type="text" id="title" v-model="inputPost.title"/>
    </div>
    <div>
      <label for="description">설명:</label>
      <input type="text" id="description" v-model="inputPost.description"/>
    </div>
    <div>
      <label for="board">게시판:</label>
      <input type="text" id="board" v-model="inputPost.boardId"/>
    </div>
    <div>
      <label for="tags">태그:</label>
      <input type="text" id="tags" v-model="inputPost.tags"/>
    </div>
    <editor :options="editorOptions"
            height="600px"
            :previewStyle="editorPreviewStyle"
            v-model="inputPost.body"/>
    <button @click="createPost">제출</button>
    <button @click="cancel">취소</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import apireq from '@/utils/apiRequest';

@Component
export default class PostPost extends Vue {
  // props
  @Prop({
    default() {
      return {
        boardId: 0,
        title: '',
        body: '',
        tags: '',
        description: '',
      };
    },
  }) private inputPost!: {[key: string]: any;};

  // states
  editorPreviewStyle: string = 'vertical';

  editorOptions = {
    language: 'ko_KR',
    hideModeSwitch: true,
    minHeight: '1000px',
    usageStatistics: false,
  };

  // methods
  handleResize() {
    if (window.innerWidth < 768) {
      this.editorPreviewStyle = 'tab';
    } else {
      this.editorPreviewStyle = 'vertical';
    }
  }

  createPost() {
    this.inputPost.boardId = parseInt(this.inputPost.boardId, 10);
    apireq('post', '/post', this.inputPost)
      .then((result) => {
        this.$router.push({ name: 'post', params: { post_id: result.data.data.ID } });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  cancel() {
    this.$router.push({ name: 'blog' });
  }

  // lifecycle
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style scoped>
button {
  float: right;
}
</style>
