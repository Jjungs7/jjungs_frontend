import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tui-editor/dist/tui-editor.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tui-editor/dist/tui-editor-contents.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'codemirror/lib/codemirror.css';
import { Editor, Viewer } from '@toast-ui/vue-editor';
import App from './App.vue';
import router from './routes/router';
import './assets/css/index.css';

Vue.config.productionTip = false;
Vue.component('editor', Editor);
Vue.component('viewer', Viewer);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
