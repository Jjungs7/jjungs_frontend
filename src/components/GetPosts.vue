<template>
  <div>
    <div class="px-2 py-4 border-b" v-for="post of posts" :key="`section-${post.ID}`">
      <h3 class="text-lg md:text-xl font-medium">
        <router-link :to="{name:'post', params:{post_id:post.ID}}">
          {{ post.Title }}
        </router-link>
      </h3>
      <post-metadata classes="text-xs md:text-sm md:mb-1 text-gray-800" :post="post"/>
      <p class="text-sm md:text-base text-gray-600">
        <router-link :to="{name:'post', params:{post_id:post.ID}}">
          {{ post.Description }}
        </router-link>
      </p>
      <my-button class="mt-2" v-if="isAdmin()" @clicked="$emit('edit-post', post.ID)">수정</my-button>
      <my-button v-if="isAdmin()" @clicked="deletePost(post.ID)">삭제</my-button>
    </div>
    <div class="text-center mt-4">
      <my-button v-for="button of buttons" :key="button.name"
                 @clicked="getPage(button.engName)"
                 :enabled="isEnabled(button.engName)">
        {{ button.name }}
      </my-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Watch, Vue,
} from 'vue-property-decorator';
import MyButton from '@/components/MyButton.vue';
import PostMetadata from '@/components/PostMetadata.vue';
import apireq from '@/utils/apiRequest';
import checkAdmin from '@/utils/isAdmin';

@Component({
  components: {
    MyButton,
    PostMetadata,
  },
})
export default class GetPosts extends Vue {
  @Prop({ default: 0 }) private active!: number;

  posts: myPost[] = [];

  prevCnt: number = 0;

  nextCnt: number = 0;

  buttons: {[key:string]: string}[] = [
    { name: '처음', engName: 'first' },
    { name: '이전', engName: 'prev' },
    { name: '다음', engName: 'next' },
    { name: '마지막', engName: 'last' },
  ];

  @Watch('active')
  getPosts(value: number, oldValue: number) {
    apireq('GET', `/post/${value}?type=board`)
      .then((res) => {
        if (!res.data.data || !res.data.data.posts) return;
        this.posts = res.data.data.posts;
        this.prevCnt = res.data.data.prevCnt;
        this.nextCnt = res.data.data.nextCnt;
        this.active = value;
      });
  }

  isEnabled(buttonName: string) : boolean {
    if (buttonName === 'first' || buttonName === 'prev') return this.prevCnt !== 0;

    if (buttonName === 'next' || buttonName === 'last') return this.nextCnt !== 0;
    return true;
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

  deletePost(postId: number) {
    const item = this.posts.find(post => post.ID === postId);
    if (item) this.posts.splice(this.posts.indexOf(item), 1);
    this.$emit('delete-post', postId);
  }

  isAdmin(): boolean {
    return this.$route.path === '/admin/post' && checkAdmin();
  }

  created() {
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

</style>
