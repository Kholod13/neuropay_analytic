import '@/assets/main.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Standard from './themes/standard';
import { DARK_MODE_CLASS } from './themes/constants';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Standard,
        options: {
            darkModeSelector: `.${DARK_MODE_CLASS}`,
            cssLayer: false,
        },
    },
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');
