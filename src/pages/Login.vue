<template>
  <form class="w-full max-w-sm ml-4" @submit="validate">
    <label class="block text-gray-700 text-lg font-bold my-2" for="pw">
      비밀번호
    </label>
    <div class="flex items-center">
      <input class="appearance-none bg-transparent border w-full text-gray-700 mr-3 py-2 px-3
       leading-tight focus:outline-none" type="text" placeholder="Password" id="pw" v-model="pw">
      <button class="flex-shrink-0 bg-blue-600 hover:bg-blue-800
      text-sm text-white py-2 px-3 rounded"
              type="submit">
        로그인
      </button>
      <button class="flex-shrink-0 text-blue-500 hover:text-blue-800 text-sm py-2 px-3 rounded"
              type="button"
              @click="$router.push('/')">
        취소
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import apireq from '../utils/apiRequest';

@Component
export default class Login extends Vue {
  times = 0;

  pw = '';

  validate(event: Event) {
    event.preventDefault();
    apireq('post', '/auth', {
      pw: this.pw,
    })
      .then((res) => {
        if (res.data.data) {
          const ONE_HALF = 5400 * 1000; // milliseconds
          localStorage.setItem('auth.accessToken', res.data.data);
          localStorage.setItem('auth.expiresAt', ((new Date()).getTime() + ONE_HALF).toString());
          this.$router.push('/admin');
          return;
        }
        this.times += 1;

        if (this.times === 1) {
          alert('비밀번호를 1회 틀렸습니다');
        } else if (this.times > 1) {
          alert('비밀번호를 2회 이상 틀렸습니다. 메인페이지로 돌아갑니다');
          this.$router.push('/');
        }
      });
  }
}
</script>

<style scoped>

</style>
