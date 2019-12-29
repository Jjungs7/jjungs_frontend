<template>
  <div>
    <div v-if="isEdit">
      <label for="id">게시판 ID</label>
      <input type="text" id="id" v-model="formInput.id" disabled/>
    </div>
    <div class="mt-2">
      <label for="name">게시판명</label>
      <input type="text" id="name" v-model="formInput.name"/>
    </div>
    <div class="mt-2">
      <label for="url">링크</label>
      <input type="text" id="url" v-model="formInput.url"/>
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
      <my-button class="mt-4" @click="$emit('click', formInput)">{{ text1 }}</my-button>
      <my-button class="mt-4" @click="$emit('clickDelete', formInput.id)" v-if="isEdit">
        {{ text2 }}
      </my-button>
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
    url: '',
    read: 'PUBLIC',
  };

  @Watch('board')
  onChange() {
    this.formInput.id = this.board.ID;
    this.formInput.name = this.board.Name;
    this.formInput.url = this.board.URL;
    this.formInput.read = this.board.ReadPermission;
  }
}
</script>

<style scoped>
input {
  display: block;
  @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full;
  @apply py-2 px-4 text-gray-700 leading-tight;
}

label {
  @apply inline text-gray-700 text-lg mb-2 pl-4 pr-32;
}
</style>
