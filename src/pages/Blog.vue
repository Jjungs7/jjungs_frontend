<template>
  <div class="container px-4 md:mx-auto mb-4 md:mb-8">
    <h1 class="text-2xl md:text-3xl ml-6 mt-2 mb-2 md:mt-4">블로그</h1>
    <ul class="flex justify-center mt-2 border-t pt-3">
      <li class="mr-1 md:mr-2" v-for="board of boards" :key="`nav-${board.ID}`">
        <button class="inline-block py-1 px-3 text-sm md:text-lg"
                :class="active === board.ID ? 'text-gray-800' : 'text-gray-500'"
                @click="getPosts(board.ID)">{{ board.Name }}</button>
      </li>
    </ul>
    <section class="px-2 py-4 border-b" v-for="post of posts" :key="`section-${post.ID}`">
      <h3 class="text-lg md:text-xl">
        <router-link :to="{name:'post', params:{post_id:post.ID}}">
          {{ post.Title }}
        </router-link>
      </h3>
      <PostMetadata classes="text-xs md:text-sm md:mb-1 text-gray-800" :post="post"/>
      <p class="text-sm md:text-base text-gray-600">
        <router-link :to="{name:'post', params:{post_id:post.ID}}">
          {{ post.Description }}
        </router-link>
      </p>
    </section>
    <div class="text-center mt-4">
      <button v-for="button of buttons" :key="`button-${button.engName}`"
              @click="getPage(button.engName)"
              :class="getButtonClass(button.engName)">
        {{ button.name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import apireq from '@/utils/apiRequest';
import PostMetadata from '@/components/PostMetadata.vue';

@Component({
  components: {
    PostMetadata,
  },
})
export default class Blog extends Vue {
  boards: any[] = [];

  posts: any[] = [];

  prevCnt: number = 0;

  nextCnt: number = 0;

  buttons: any[] = [
    { name: '처음', engName: 'first' },
    { name: '이전', engName: 'prev' },
    { name: '다음', engName: 'next' },
    { name: '마지막', engName: 'last' },
  ];

  active = 0;

  getPosts(boardId: number) {
    apireq('GET', `/post/${boardId}?type=board`)
      .then((res) => {
        if (!res.data.data || !res.data.data.posts) return;
        this.posts = res.data.data.posts;
        this.active = boardId;
      });
  }

  getPage(buttonName: string) {
    if (this.posts.length <= 0) return;
    if (this.nextCnt <= 0 && (buttonName === 'next' || buttonName === 'last')) return;
    if (this.prevCnt <= 0 && (buttonName === 'prev' || buttonName === 'first')) return;

    let cond = '';
    if (buttonName === 'prev') cond = `&postId=${this.posts[0].ID}&before=true`;
    else if (buttonName === 'next') cond = `&postId=${this.posts[this.posts.length - 1].ID}`;
    else if (buttonName === 'last') cond = '&postId=0&before=true';
    apireq('GET', `/post/${this.active}?type=board${cond}`)
      .then((res) => {
        this.posts = res.data.data.posts;
        this.prevCnt = res.data.data.prevCnt;
        this.nextCnt = res.data.data.nextCnt;
      });
  }

  getButtonClass(buttonName: string) : string {
    if (buttonName === 'first' || buttonName === 'prev') {
      if (this.prevCnt === 0) {
        return 'bg-blue-500 text-white font-bold rounded opacity-50 cursor-not-allowed py-2 px-4 mx-2';
      }
      return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded';
    }

    if (buttonName === 'next' || buttonName === 'last') {
      if (this.nextCnt === 0) {
        return 'bg-blue-500 text-white font-bold py-2 px-4 mx-2 rounded opacity-50 cursor-not-allowed';
      }
      return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded';
    }
    return '';
  }

  created() {
    apireq('GET', '/board')
      .then((res) => {
        const all = {
          ID: 0,
          URL: 'all',
          Name: '전체',
        };
        this.boards = [all, ...res.data.data];
      });

    apireq('GET', '/post/0?type=board')
      .then((res) => {
        this.posts = res.data.data.posts;
        this.prevCnt = res.data.data.prevCnt;
        this.nextCnt = res.data.data.nextCnt;
      });
  }
}
</script>

<style scoped>
button:focus {
  outline-style: none;
}

button.text-gray-500:hover {
  @apply text-blue-500;
}
</style>
