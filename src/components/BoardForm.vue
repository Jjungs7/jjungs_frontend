<template>
  <div>
    <div>
      <label for="name">게시판명</label>
      <input type="text" id="name" v-model="boardInput.name"/>
    </div>
    <div class="mt-2">
      <label for="url">링크</label>
      <input type="text" id="url" v-model="boardInput.url"/>
    </div>
    <label for="read">읽기 권한</label>
    <select class="block w-full bg-gray-200 border
         border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight
         focus:outline-none focus:bg-white focus:border-gray-500" id="read"
            v-model="boardInput.read">
      <option>PUBLIC</option>
      <option>JJUNGS</option>
    </select>
    <div class="text-right">
      <my-button class="mt-2" @clicked="createBoard">저장</my-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { myBoardForm } from '@/pages/admin/ManageBoards.vue';

@Component
export default class BoardForm extends Vue {
  // @Prop() private form!: myBoardForm.form;
}
</script>

<style scoped>

</style>
