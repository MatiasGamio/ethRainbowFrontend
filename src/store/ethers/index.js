import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = () => ({
  initialized: false,
  connected: false,
  networkOk: false,
  address: '',
});

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}