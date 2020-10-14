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
    <div class="text-right">
      <my-button class="my-3" @click="showFileUpload = !showFileUpload">파일 업로드</my-button>
    </div>
    <div class="my-2 pb-2 border-b" v-if="showFileUpload">
      <div class="mt-2">
        <label for="uploadName">파일명</label>
        <input type="text" id="uploadName" v-model="uploadName">
      </div>
      <div class="mt-2">
        <label for="file">파일</label>
        <input type="file" id="file" @change="changeFile($event)"/>
      </div>
      <div class="mt-2">
        <label>업로드 된 파일</label>
        <ul class="list-disc px-6 my-1">
          <li v-for="(fname, idx) of uploadedFiles" :key="`file-${idx}`">
            <div class="inline-block text-blue-600 cursor-pointer pr-16 py-1"
                 @click="copyToClipboard($event)">
              {{ fname }}
            </div>
          </li>
        </ul>
      </div>
      <div class="text-right mt-2">
        <my-button @click="showFileUpload = false">취소</my-button>
        <my-button @click="uploadFile">업로드</my-button>
      </div>
    </div>
    <editor :options="editorOptions"
            height="600px"
            :previewStyle="editorPreviewStyle"
            v-model="inputPost.body"/>
    <div class="text-right">
      <my-button class="my-3" @click="cancel">취소</my-button>
      <my-button class="my-3" @click="doPost">제출</my-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueClipboard from 'vue-clipboard2';
import MyButton from '@/components/MyButton.vue';
import { apireq, fileUpload } from '@/utils/apiRequest';

declare type myInputPost = {
  id: number,
  boardId: number,
  title: string,
  body: string,
  tags: string,
  description: string,
};

Vue.use(VueClipboard);
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

  uploadedFiles: string[] = [];

  showFileUpload = false;

  file?: File;

  uploadName = '';

  editorPreviewStyle = 'vertical';

  editorOptions = {
    language: 'ko_KR',
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

  changeFile(event: { target: HTMLInputElement }) {
    const node = event.target;
    if (!node || !node.files || node.files.length <= 0) return;
    [this.file] = node.files;
    this.uploadName = this.uploadName || this.file.name;
  }

  uploadFile() {
    if (!this.file) return;
    this.uploadName = this.uploadName || this.file.name;
    if (this.uploadName === '') {
      alert('파일 이름이 없습니다(bug)');
      return;
    }

    const data = new FormData();
    data.append('file', this.file);
    if (this.file.size > (32 * 1024 * 1024)) {
      alert('파일은 32MB 까지 업로드 가능합니다');
      return;
    }

    fileUpload(this.uploadName, data)
      .then((res) => {
        this.uploadedFiles.push(res.data.data);
      });
  }

  copyToClipboard(event: {target: HTMLDivElement}) {
    const imgExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileName = `https://api.jjungs.kr/file/${event.target.innerText}`;
    const isImg = imgExtensions.some(ss => fileName.toLowerCase().includes(ss));
    let text = '';

    if (isImg) text = `![](${fileName})`;
    else text = `[](${fileName})`;
    this.$copyText(text)
      .then((res) => {
        alert(`Successfully copied as ${isImg ? 'img' : 'file'}`);
      });
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
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  editPost() {
    apireq('put', '/admin/post', this.inputPost)
      .then((result) => {
        this.$router.push({ name: 'post', params: { post_id: result.data.data.ID } });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
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
        this.inputPost.boardId = this.boards[0].ID;
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
input {
  display: block;
  @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full;
  @apply py-2 px-4 text-gray-700 leading-tight;
}

label {
  @apply inline text-gray-700 text-lg font-bold mb-2 pl-4 pr-32;
}
</style>
