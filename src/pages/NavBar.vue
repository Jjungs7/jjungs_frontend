<template>
  <nav>
    <ul class="flex bg-blue-800 text-lg h-14 text-white">
      <li class="mr-5 ml-4">
        <router-link to="/">
          <img class="mt-2 h-8" src="../assets/images/j.png">
        </router-link>
      </li>
      <li class="mr-5 my-3 w-8" v-for="nav in navs" :key="nav.id">
        <router-link :to="nav.route">{{ nav.text }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  // eslint-disable-next-line class-methods-use-this
  navs = [
    {
      id: 0,
      route: '/blog',
      text: 'Blog',
    },
    {
      id: 1,
      route: '/me',
      text: 'About',
    },
  ]
}
</script>

<style scoped>
</style>
