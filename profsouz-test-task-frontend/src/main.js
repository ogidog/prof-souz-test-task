import {createApp} from 'vue'
import App from './App.vue';

import {appConfig} from "@/commons/config";


const app = createApp(App)
app.provide('appConfig', appConfig);
app.mount('#app');

