export default {
    ready: function (state, value) {
      state.ready = value;
    },
    claimedTokens: function (state, value) {
      state.claimedTokens = value;
    },
    myNs: function (state, value) {
      state.myNs = value;
    },
    loadingNs: function (state, value) {
      state.loadingNs = value;
    },
    NsSVGs:function (state, value) {
      state.NsSVGs = value;
    },
}