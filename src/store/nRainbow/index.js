import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = () => ({
    ready: false,
    claimedTokens: [],
    loadingNs: false,
    myNs: [],
    NsSVGs: {}
});

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}