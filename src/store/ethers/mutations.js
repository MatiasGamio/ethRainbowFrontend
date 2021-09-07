export default {
    initialized: function (state, value) {
      state.initialized = value;
    },
    connected: function (state, value) {
      state.connected = value;
    },
    networkOk: function (state, value) {
      state.networkOk = value;
    },
    address: function (state, value) {
      state.address = value;
    },
    provider: function (state, value) {
      state.provider = value;
    },
    wallet: function (state, value) {
      state.wallet = value;
    }
}