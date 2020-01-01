<template>
  <div>
    <div class="flex flex-wrap -mx-3 my-2">
      <div class="w-full md:w-1/2 px-3">
        <label>
          게시판명
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
           border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
           focus:border-gray-500" type="text" v-model="formInput.name">
        </label>
      </div>
      <div class="w-full md:w-1/2 px-3" v-if="isEdit">
        <label>
          게시판 ID
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
           border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
           focus:border-gray-500" type="text" v-model="formInput.id" disabled>
        </label>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3">
      <div class="w-full md:w-1/2 px-3">
        <label>
          링크
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
           border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
           focus:border-gray-500" type="text" v-model="formInput.url">
        </label>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label>
          순서
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border
           border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
           focus:border-gray-500" type="text" v-model="formInput.order">
        </label>
      </div>
    </div>
    <div class="mt-2">
      <label for="read">읽기 권한</label>
      <select class="block w-full bg-gray-200 border
           border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight
           focus:outline-none focus:bg-white focus:border-gray-500" id="read"
              v-model="formInput.read">
        <option>PUBLIC</option>
        <option>JJUNGS</option>
      </select>
    </div>
    <div class="text-right">
      <my-button class="mt-4" @click="$emit('clickDelete', formInput.id)" v-if="isEdit">
        {{ text2 }}
      </my-button>
      <my-button class="mt-4" @click="$emit('click', formInput)">{{ text1 }}</my-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Watch, Vue,
} from 'vue-property-decorator';
import MyButton from '@/components/MyButton.vue';

export namespace myBoardForm {
  export interface form {
    id: number,
    name: string,
    order: number,
    url: string,
    read: string,
  }
}

@Component({
  components: {
    MyButton,
  },
})
export default class BoardForm extends Vue {
  @Prop() private text1!: string;

  @Prop() private text2!: string;

  @Prop({ default: true }) private isEdit!: boolean;

  @Prop() private board!: myBoard;

  formInput: myBoardForm.form = {
    id: 0,
    name: '',
    order: 0,
    url: '',
    read: 'PUBLIC',
  };

  @Watch('board')
  onChange() {
    this.formInput.id = this.board.ID;
    this.formInput.name = this.board.Name;
    this.formInput.order = this.board.Order;
    this.formInput.url = this.board.URL;
    this.formInput.read = this.board.ReadPermission;
  }
}
</script>

<style scoped>
label {
  @apply block uppercase tracking-wide text-gray-700 mb-2 text-lg;
}
</style>
