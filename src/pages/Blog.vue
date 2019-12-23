<template>
  <div class="container mx-auto">
    <h1 class="text-3xl ml-8 mt-2 md:mt-4">블로그</h1>
    <ul class="flex justify-center mt-2">
      <li class="mr-1 md:mr-2" v-for="board of boards" :key="`nav-${board.ID}`">
        <button class="inline-block py-1 px-3 text-sm md:text-lg"
                :class="active === board.ID ? 'text-gray-800' : 'text-gray-500'"
                @click="getPosts(board.URL)">{{ board.Name }}</button>
      </li>
    </ul>
    <section class="px-2 py-4 border-b" v-for="post of posts" :key="`section-${post.ID}`">
      <h3 class="text-lg md:text-xl md:font-medium">
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

  active = 0;

  getPosts(url: string) {
    apireq('GET', `/board/${url}`)
      .then((res) => {
        if (!res.data.data || !res.data.data.Posts) return;
        this.posts = res.data.data.Posts;
        this.active = res.data.data.Board.ID;
      });
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

    apireq('GET', '/board/os')
      .then((res) => {
        this.posts = res.data.data.Posts;
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
