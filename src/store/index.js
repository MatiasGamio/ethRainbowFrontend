import { createStore } from 'vuex';

const store = createStore({
  modules: {
    ethers: require('./ethers').default,
    ethRainbow: require('./ethRainbow').default,
  }
});

export default store;
