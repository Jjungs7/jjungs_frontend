<template>
  <div>
    <div v-if="!loaded">
      Loading...
    </div>
    <div v-else-if="authenticated">
      <slot/>
    </div>
    <div class="text-center mt-8" v-else>
      <h1 class="text-bold text-4xl">
        403
      </h1>
      <p class="text-2xl mb-2">
        Permission required
      </p>
      <router-link to="/login">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
          Login
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { apireq } from '../utils/apiRequest';
import isAdmin from '@/utils/isAdmin';

@Component
export default class Authenticated extends Vue {
  loaded = false;

  authenticated = false;

  created() {
    const token = localStorage.getItem('auth.accessToken');

    if (isAdmin) {
      apireq('post', '/auth/val', {
        token,
      })
        .then((res) => {
          if (res.data.data) {
            this.authenticated = true;
          }
          this.loaded = true;
        });
    } else {
      this.loaded = true;
    }
  }
}
</script>

<style scoped>

</style>
