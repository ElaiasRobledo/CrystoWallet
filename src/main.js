import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
// import {createStore} from 'vuex'
// import vuex from 'vuex'
import store from './store/store'
createApp(App).use(router).use(store).mount('#app')
