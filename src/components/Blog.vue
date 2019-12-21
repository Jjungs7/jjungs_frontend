<template>
  <div class="container mx-auto">
    <ul class="flex justify-center mt-2 md:mt-6 md:mb-2">
      <li class="mr-1 md:mr-3" v-for="board of boards" :key="`nav-${board.ID}`">
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
      <div class="text-xs md:text-sm md:mb-1 text-gray-800">
        <i>hits</i> 0
        <i>생성: </i>{{ parseTime(post.CreatedAt) }}
        <span v-if="isUpdated(post.CreatedAt, post.UpdatedAt)">
          <i>수정: </i>
          {{ parseTime(post.UpdatedAt) }}
        </span>
      </div>
      <p class="text-sm md:text-base text-gray-600">
        <router-link :to="{name:'post', params:{post_id:post.ID}}">
          {{ post.Description }}
        </router-link>
      </p>
    </section>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import apireq from '@/utils/apiRequest';
import { timediff, getTimeAgo } from '@/utils/date';

@Component
export default class Blog extends Vue {
  boards = [];

  posts = [];

  active = 0;

  isUpdated(d1, d2) {
    return timediff(d2, d1) >= 60; // 1분 미만의 시간 내에 갱신했을 경우 갱신으로 안 침
  }

  parseTime(date) {
    return getTimeAgo(date);
  }

  getPosts(url) {
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
        console.log(this.boards);
      });

    apireq('GET', '/board/os')
      .then((res) => {
        this.posts = res.data.data.Posts;
        console.log(this.posts);
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
