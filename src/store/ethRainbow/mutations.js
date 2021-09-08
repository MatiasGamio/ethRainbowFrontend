export default {
    ready: function (state, value) {
      state.ready = value;
    },
    claimedTokens: function (state, value) {
      state.claimedTokens = value;
    },
    myRainbows: function (state, value) {
      state.myRainbows = value;
    },
    rainbowSVGs: function (state, value) {
      state.rainbowSVGs = value;
    },
    loadingRainbows: function (state, value) {
      state.loadingRainbows = value;
    },
}