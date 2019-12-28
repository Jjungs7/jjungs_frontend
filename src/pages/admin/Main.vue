<template>
  <authenticated class="container px-4 mb-4 md:mx-auto md:mb-8">
    <h1 class="text-2xl md:text-3xl ml-6 mt-2 mb-2 md:mt-4">Admin</h1>
    <ul class="flex border-b">
      <li :class="isSelectedLi(tab.id)" v-for="tab of tabs" :key="tab.id"
          @click="selected = tab.id">
        <router-link :class="isSelectedA(tab.id)" :to="tab.route">{{ tab.text }}</router-link>
      </li>
    </ul>
    <router-view/>
  </authenticated>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Authenticated from '@/components/Authenticated.vue';

@Component({
  components: {
    authenticated: Authenticated,
  },
})
export default class MainAdmin extends Vue {
  selected = 0;

  tabs: any[] = [
    {
      id: 0,
      text: 'Post',
      route: '/admin/post',
    },
    {
      id: 1,
      text: 'Board',
      route: '/admin/board',
    },
  ];

  isSelectedLi(id: number): string {
    if (this.selected === id) {
      return '-mb-px mr-1';
    }
    return 'mr-1';
  }

  isSelectedA(id: number): string {
    if (this.selected === id) {
      return 'bg-white inline-block py-2 px-4 text-blue-700 font-semibold '
        + 'border-l border-t border-r rounded-t';
    }
    return 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold';
  }
}
</script>
