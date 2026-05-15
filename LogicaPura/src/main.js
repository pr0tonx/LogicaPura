import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app');