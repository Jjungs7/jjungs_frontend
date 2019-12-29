<template>
  <button @click="$emit('click')" :class="getButtonClass()">
    <slot/>
  </button>
</template>

<script lang="ts">
import {
  Component, Prop, Watch, Vue,
} from 'vue-property-decorator';

@Component
export default class MyButton extends Vue {
  @Prop({ default: true }) private enabled!: boolean;

  @Watch('enabled')
  getButtonClass() : string {
    const base = 'bg-blue-500 text-white font-bold py-2 px-4 mx-2 rounded';
    if (!this.enabled) {
      return `${base} opacity-50 cursor-not-allowed`;
    }
    return `${base} hover:bg-blue-700`;
  }
}
</script>

<style scoped>

</style>
