<template>
  <div>
    <h1 class="text-2xl md:text-3xl ml-6 mt-2 mb-2 md:mt-4">Admin</h1>
    <router-link class="block" to="/admin/board">게시판 관리</router-link>
    <router-link class="block" to="/admin/post">게시물 관리</router-link>
    <router-view/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MainAdmin extends Vue {
}
</script>

<style scoped>

</style>
