export default {
    ready: function (state, value) {
      state.ready = value;
    },
    claimedTokens: function (state, value) {
      state.claimedTokens = value;
    },
}