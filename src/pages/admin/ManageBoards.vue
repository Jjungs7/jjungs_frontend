<template>
  <div>
    <div class="text-right">
      <my-button class="mt-3" @click="showNewBoard = !showNewBoard">게시판 추가</my-button>
    </div>
    <div class="mb-6 pb-4 border-b" v-if="showNewBoard">
      <board-form :isEdit="false" text1="저장" @click="createBoard"/>
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
    <board-form class="mt-4" text1="수정" text2="삭제"
                :board="activeBoard" @click="updateBoard" @clickDelete="deleteBoard"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MyButton from '@/components/MyButton.vue';
import { apireq } from '@/utils/apiRequest';
import BoardForm, { myBoardForm } from '@/components/BoardForm.vue';

@Component({
  components: {
    MyButton,
    BoardForm,
  },
})
export default class ManageBoards extends Vue {
  boards: myBoard[] = [];

  showNewBoard: boolean = false;

  activeBoard: myBoard = {
    CreatedAt: '',
    ID: 0,
    Name: '',
    Order: 0,
    ReadPermission: '',
    UpdatedAt: '',
    URL: '',
  };

  createBoard(formInput: myBoardForm.form) {
    apireq('post', '/admin/board', formInput)
      .then((res) => {
        if (!res.data.data) return;

        const board: myBoard = res.data.data;
        this.boards.push(board);
      });
  }

  changeEditInput(board: myBoard) {
    this.activeBoard = board;
  }

  updateBoard(formInput: myBoardForm.form) {
    apireq('put', '/admin/board', formInput)
      .then((res) => {
        if (!res.data.data) return;

        const editBoard: myBoard = res.data.data;
        const item = this.boards.find(board => board.ID === formInput.id);
        if (item) this.boards.splice(this.boards.indexOf(item), 1, editBoard);
      });
  }

  deleteBoard(boardId: number) {
    // eslint-disable-next-line no-restricted-globals,no-alert
    if (!confirm('정말로 삭제하시겠습니까?')) return;

    apireq('delete', '/admin/board', {
      id: boardId,
    })
      .then((res) => {
        if (!res.data.data) return;

        const item = this.boards.find(board => board.ID === boardId);
        if (item) this.boards.splice(this.boards.indexOf(item), 1);
        [this.activeBoard] = this.boards;
      });
  }

  created() {
    apireq('get', '/board')
      .then((res) => {
        this.boards = res.data.data;
        [this.activeBoard] = this.boards;
      });
  }
}
</script>

<style scoped>

</style>
