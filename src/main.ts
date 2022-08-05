import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notification from "@kyvg/vue3-notification";

createApp(App)
    .use(router)
    .use(Notification)
    .mount('#app')
