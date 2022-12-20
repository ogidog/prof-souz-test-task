import { createApp } from 'vue'
import {createStore} from "vuex";

import App from './App.vue'

const store = createStore({
    state(){
        return{

        }
    }
})

const app = createApp(App).mount('#app');

