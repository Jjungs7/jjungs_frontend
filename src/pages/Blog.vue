<template>
  <div class="container px-4 md:mx-auto mb-4 md:mb-8">
    <h1 class="text-2xl md:text-3xl ml-6 mt-2 mb-2 md:mt-4">블로그</h1>
    <ul class="flex justify-center mt-2 border-t pt-3">
      <li class="mr-1 md:mr-2" v-for="board of boards" :key="`nav-${board.ID}`">
        <button class="inline-block py-1 px-3 text-sm md:text-lg"
                :class="active === board.ID ? 'text-gray-800' : 'text-gray-500'"
                @click="active = board.ID">{{ board.Name }}</button>
      </li>
    </ul>
    <get-posts :active="active"/>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { apireq } from '@/utils/apiRequest';
import PostMetadata from '@/components/PostMetadata.vue';
import MyButton from '@/components/MyButton.vue';
import GetPosts from '@/components/GetPosts.vue';

@Component({
  components: {
    PostMetadata,
    MyButton,
    GetPosts,
  },
})
export default class Blog extends Vue {
  boards: myBoard[] = [];

  active = 0;

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
