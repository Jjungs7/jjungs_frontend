<template>
  <div :class="classes">
    <font-awesome-icon class="icon" :icon="['fas', 'edit']"/>
    <span class="inline-block ml-1 w-32">{{ parseTime(post.CreatedAt) }}</span>
    <font-awesome-icon class="icon" :icon="['far', 'eye']"/>
    <span class="inline-block ml-1 w-8">{{ post.Hits }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { parseDateTime, timediff } from '@/utils/date';

@Component
export default class PostMetadata extends Vue {
  @Prop({ default: '' }) private classes!: string;

  @Prop({
    default: {
      Board: null,
      BoardID: 0,
      Body: 'loading...',
      CreatedAt: '0',
      DeletedAt: '0',
      Description: '',
      ID: 0,
      PostTags: [],
      Title: '',
      UpdatedAt: '0',
      Hits: 0,
    },
  }) private post!: any;

  // methods
  isUpdated(d1: string, d2: string) {
    return timediff(d2, d1) >= 60; // 1분 미만의 시간 내에 갱신했을 경우 갱신으로 안 침
  }

  parseTime(date: string) {
    return parseDateTime(date, 'YYYY. MM. DD.');
  }
}
</script>

<style scoped>
.icon {
  opacity: 0.75;
}
</style>
