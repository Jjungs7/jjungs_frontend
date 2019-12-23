<template>
  <div class="container mx-auto">
    <h1 class="text-3xl ml-8 mt-2 md:mt-4">Me</h1>
    <h2>Profile & Education</h2>
    <p>양정일(Jeongil Yang)</p>
    <p>만 {{ myAge() }}세, 남</p>
    <h2>Experience & Skills</h2>
    <h2>Projects</h2>
    <h2>Qualifications</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Main extends Vue {
  myAge(): number {
    const ageDifMs = Date.now() - (new Date('1995-11-05')).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
