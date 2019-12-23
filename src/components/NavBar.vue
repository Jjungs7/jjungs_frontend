<template>
  <nav class="flex bg-blue-800 text-lg h-14 text-white">
    <ul class="flex flex-1">
      <li class="font-bold mr-5 my-3 min-w-0 ml-4">
        <router-link to="/">Jjungs</router-link>
      </li>
      <li class="mr-5 my-3 min-w-0" v-for="nav of navs" :key="nav.id">
        <router-link :to="nav.route">{{ nav.text }}</router-link>
      </li>
    </ul>
    <ul class="flex flex-1 flex-end">
      <li class="mr-5 mt-4 mb-2 min-w-0" v-for="link of links" :key="link.name">
        <a :target="link.target" :href="link.link">
          <font-awesome-icon :icon="link.icon"/>
        </a>
      </li>
      <li class="mr-5 my-3 min-w-0" v-if="isAdmin()">
        <router-link to="/admin">Admin</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  navs = [
    {
      id: 0,
      route: '/blog',
      text: 'Blog',
    },
  ];

  links = [
    {
      name: 'github',
      target: '_blank',
      link: 'https://github.com/Jjungs7',
      icon: ['fab', 'github'],
    },
    {
      name: 'instagram',
      target: '_blank',
      link: 'https://www.instagram.com/_jjungs',
      icon: ['fab', 'instagram'],
    },
    {
      name: 'mail',
      target: '',
      link: 'mailto:jeongy95@gmail.com',
      icon: ['far', 'envelope'],
    },
  ];

  isAdmin() {
    const accessToken = localStorage.getItem('auth.accessToken');
    const expiresAt = localStorage.getItem('auth.expiresAt');

    return accessToken && expiresAt && parseInt(expiresAt, 10) < (new Date()).getTime();
  }
}
</script>

<style scoped>
.flex-end {
  justify-content: flex-end;
}
</style>
