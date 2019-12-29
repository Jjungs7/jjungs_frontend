<template>
  <div class="absolute inset-0 -z-30 min-h-screen">
    <div class="main bg-cover absolute inset-0 -z-30"></div>
    <div class="layer bg-black opacity-75 absolute inset-0 -z-20"></div>
    <div class="flex column inset-0 items-center text-center justify-center min-h-full
                -z-10">
      <h1 class="text-2xl md:text-4xl text-white font-semibold pb-40">
        환영합니다!
      </h1>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Main extends Vue { }
</script>

<style scoped>
.main {
  background-image: url('/background.jpg');
}
</style>
