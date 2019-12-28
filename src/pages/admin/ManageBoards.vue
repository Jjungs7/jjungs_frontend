<template>
  <div>
    <div class="text-right">
      <my-button class="my-3" @clicked="showNewBoard = !showNewBoard">게시판 추가</my-button>
    </div>
    <div class="mb-6 pb-4 border-b" v-if="showNewBoard">
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
    <table class="table-fixed w-full">
      <tr class="border-b w-full cursor-pointer"
          v-for="board of boards" :key="`board-${board.ID}`"
          @click="changeEditInput(board)">
        <div class="flex my-2">
          <h3 class="flex-1">{{ board.Name }}</h3>
          <h3 class="flex-1">{{ board.URL }}</h3>
          <h3 class="flex-1">{{ board.ReadPermission }}</h3>
          <h3 class="flex-1">{{ board.Order }}</h3>
        </div>
      </tr>
    </table>
    <div>
      <label for="eid">아이디</label>
      <input type="text" id="eid" v-model="editBoardInput.name"/>
    </div>
    <div>
      <label for="ename">게시판명</label>
      <input type="text" id="ename" v-model="editBoardInput.name"/>
    </div>
    <div class="mt-2">
      <label for="eurl">링크</label>
      <input type="text" id="eurl" v-model="editBoardInput.url"/>
    </div>
    <label for="eread">읽기 권한</label>
    <select class="block w-full bg-gray-200 border
       border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight
       focus:outline-none focus:bg-white focus:border-gray-500" id="eread"
            v-model="editBoardInput.read">
      <option>PUBLIC</option>
      <option>JJUNGS</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MyButton from '@/components/MyButton.vue';
import apireq from '@/utils/apiRequest';

export declare type myBoardForm = {
  id: number,
  name: string,
  url: string,
  read: string,
};

@Component({
  components: {
    MyButton,
  },
})
export default class ManageBoards extends Vue {
  boards: myBoard[] = [];

  showNewBoard: boolean = false;

  boardInput: myBoardForm = {
    id: 0,
    name: '',
    url: '',
    read: 'PUBLIC',
  };

  editBoardInput: myBoardForm = {
    id: 0,
    name: '',
    url: '',
    read: 'PUBLIC',
  };

  createBoard() {
    apireq('post', '/admin/board', this.boardInput)
      .then((res) => {
        if (!res.data.data) {
          console.error(res.data.error);
          return;
        }

        this.$router.push({
          path: '/admin/board',
        });
      });
  }

  changeEditInput(board: myBoard) {
    this.editBoardInput.id = board.ID;
    this.editBoardInput.name = board.Name;
    this.editBoardInput.url = board.URL;
    this.editBoardInput.read = board.ReadPermission;
  }

  updateBoard() {
    apireq('put', '/admin/board', this.editBoardInput)
      .then((res) => {
        if (!res.data.data) {
          console.error(res.data.error);
          return;
        }

        this.$router.push({
          path: '/admin/board',
        });
      });
  }

  created() {
    apireq('get', '/board')
      .then((res) => {
        this.boards = res.data.data;
      });
  }
}
</script>

<style scoped>

</style>
