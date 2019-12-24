<template>
  <div class="container px-4 md:mx-auto mb-4 md:mb-8">
    <h1 class="text-2xl md:text-3xl ml-6 mt-2 mb-2 md:mt-4">Me</h1>
    <div class="category" v-for="category of categories" :key="category.name">
      <h2 class="text-lg border-t pt-2 md:text-2xl md:pt-5 font-semibold">
        {{ category.name }}
      </h2>
      <div v-for="(item, idx) of category.items" :key="idx">
        <h3 class="text-base mt-2 md:text-lg md:mt-3 font-medium">
          {{ item.title }}
        </h3>
        <h4 class="text-sm md:text-base">
          {{ item.subtitle.replace('#myAge#', myAge()) }}
        </h4>
        <p class="text-xs md:text-sm text-gray-700"
           v-if="item.description" v-html="item.description"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import profile from '@/assets/data/profile';

@Component
export default class Me extends Vue {
  categories: {[key:string]: string}[] = [];

  myAge(): number {
    const ageDifMs = Date.now() - (new Date('1995-11-05')).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  created() {
    this.categories = profile;
  }
}
</script>

<style>
.link {
  color: #1a0dab;
  cursor: pointer;
  text-decoration: underline;
}

.category:not(:first-of-type) {
  @apply pt-2;
}
</style>
