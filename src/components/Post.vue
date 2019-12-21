<template>
  <div>
    Post!
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import apireq from '@/utils/apiRequest';

@Component
export default class Post extends Vue {
  post = null;

  created() {
    apireq('GET', `/post/${this.$route.params.post_id}`)
      .then((res) => {
        this.post = res.data.data;
        console.log(this.post);
      });
  }
}
</script>

<style scoped>

</style>
