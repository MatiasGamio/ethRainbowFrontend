<template>
    <div id="navbar">
        <span class="address">{{ethers.address}}</span>
        <div class="component button" :style="btnConnectStyle" @click="toggleConnect">{{btnConnectText}}</div>
    </div>  
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: mapState({
    ethers: (state) => state.ethers,
    btnConnectText: (state) => {
        if (state.ethers.connected && state.ethers.address) {
            if (state.ethers.networkOk) {
                return "Disconnect";
            } else {
                return "Wrong network";
            }
        } else {
            return "Connect";
        }
    },
    btnConnectStyle: (state) => {
        if (state.ethers.connected && state.ethers.address) {
            if (state.ethers.networkOk) {
                return "background-color:#f14e4e;";
            } else {
                return "background-color:#f1bb4e;";
            }
        } else {
            return "background-color:grey;";
        }
    }
  }),
  methods: {
    ...mapActions('ethers', ['init','logout',]),
    toggleConnect: function (event) {
        if (this.ethers.connected && this.ethers.address) {
            this.logout();
        } else {
            this.init();
        }
    },
  },
};
</script>

<style scoped>
    #navbar {
        font-weight: 200;
        font-size: 20px;
        width: 100vw;
        height: 50px;
        text-align: right;
        background-color: transparent;
    }

    .address {
        width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        position: absolute;
        margin: 11px 10px;
        color: white;
        text-align: left;
        font-size: 15px;
    }
</style>