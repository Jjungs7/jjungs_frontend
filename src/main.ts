import Vue from 'vue';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/github.css';
import { Editor, Viewer } from '@toast-ui/vue-editor';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit as fasEdit } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEye, faEdit as farEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './routes/router';
import './assets/css/index.css';

library.add(faInstagram, faEnvelope, faGithub, faEye, fasEdit, farEdit);

Vue.config.productionTip = false;
Vue.component('editor', () => import(/* webpackChunkName: "editor" */'@toast-ui/vue-editor').then(res => res.Editor));
Vue.component('viewer', () => import(/* webpackChunkName: "editor" */'@toast-ui/vue-editor').then(res => res.Viewer));
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
