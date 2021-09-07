import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

let app = createApp(App);

app.config.globalProperties.globalVar = 'globalVar';

app.use(store).use(router).mount('#app');

store.dispatch('ethers/init');
//store.dispatch('ethRainbow/createContract');