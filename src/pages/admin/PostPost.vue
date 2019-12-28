<template>
  <div>
    <div class="mt-3">
      <label for="title">제목</label>
      <input type="text" id="title" v-model="inputPost.title"/>
    </div>
    <div class="mt-2">
      <label for="description">설명</label>
      <input type="text" id="description" v-model="inputPost.description"/>
    </div>
    <div class="mt-2">
      <label for="board">게시판</label>
      <select class="block w-full bg-gray-200 border
       border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight
       focus:outline-none focus:bg-white focus:border-gray-500" id="board"
              v-model="inputPost.boardId">
        <option v-for="board of boards" :key="`board-${board.ID}`" :value="board.ID">
          {{ board.Name }}
        </option>
      </select>
    </div>
    <div class="mt-2 mb-2">
      <label for="tags">태그</label>
      <input type="text" id="tags" v-model="inputPost.tags"/>
    </div>
    <editor :options="editorOptions"
            height="600px"
            :previewStyle="editorPreviewStyle"
            v-model="inputPost.body"/>
    <my-button class="my-3" @clicked="doPost">제출</my-button>
    <my-button class="my-3" @clicked="cancel">취소</my-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MyButton from '@/components/MyButton.vue';
import apireq from '@/utils/apiRequest';

declare type myInputPost = {
  id: number,
  boardId: number,
  title: string,
  body: string,
  tags: string,
  description: string,
};

@Component({
  components: {
    MyButton,
  },
})
export default class PostPost extends Vue {
  // states
  inputPost: myInputPost = {
    id: 0,
    boardId: 0,
    title: '',
    body: '',
    tags: '',
    description: '',
  };

  boards: myBoard[] = [];

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

  doPost() {
    const isEdit = this.$route.path.includes('edit');
    if (isEdit) this.editPost();
    else this.createPost();
  }

  createPost() {
    apireq('post', '/admin/post', this.inputPost)
      .then((result) => {
        this.$router.push({ name: 'post', params: { post_id: result.data.data.ID } });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  editPost() {
    apireq('put', '/admin/post', this.inputPost)
      .then((result) => {
        this.$router.push({ name: 'post', params: { post_id: result.data.data.ID } });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  cancel() {
    this.$router.push({ path: '/admin' });
  }

  // lifecycle
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    apireq('get', '/board')
      .then((res) => {
        this.boards = res.data.data;
      });

    if (this.$route.params.postId) {
      const { postId } = this.$route.params;
      this.inputPost.id = parseInt(postId, 10);
      apireq('get', `/post/${postId}?type=post`)
        .then((res) => {
          const post: myPost = res.data.data;
          this.inputPost.boardId = post.BoardID;
          this.inputPost.title = post.Title;
          this.inputPost.body = post.Body;
          this.inputPost.tags = post.PostTags.join(' ');
          this.inputPost.description = post.Description;
        });
    }
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

input {
  display: block;
  @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full;
  @apply py-2 px-4 text-gray-700 leading-tight;
}

label {
  @apply inline text-gray-700 text-lg font-bold mb-2 pl-4 pr-32;
}
</style>
