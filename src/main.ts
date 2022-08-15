import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notification from "@kyvg/vue3-notification";
import { i18n } from '@/plugins/i18n';

createApp(App)
    .use(router)
    .use(Notification)
    .use(i18n)
    .mount('#app')
