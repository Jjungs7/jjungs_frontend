<template>
  <div class="text-center mt-8">
    <h1 class="text-bold text-4xl">
      404
    </h1>
    <p class="text-2xl mb-2">
      죄송합니다. 페이지를 찾을 수 없습니다
    </p>
    <router-link to="/">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
        메인으로 돌아가기
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NotFound extends Vue { }
</script>

<style scoped>

</style>
