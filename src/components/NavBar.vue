<template>
    <div id="navbar">
        <router-link :to="'/'"><span class="link"> {{(currentPath == '/')?"> ":" "}} Claim Rainbows</span></router-link>
        <router-link :to="'/experiment'"><span class="link" style="top: 40px;">{{(currentPath == '/experiment')?"> ":" "}}Try the n + Rainbow Experiment</span></router-link>
        <div class="component button" :style="btnConnectStyle" @click="toggleConnect">{{btnConnectText}}</div>
    </div>  
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { useRoute } from 'vue-router'

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
    },
    currentPath: function() { return useRoute().path; }
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
  }
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

    .link {
        width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        color: white;
        text-align: left;
        cursor: pointer;
        float: right;
        font-size: 20px;
        font-weight: bold;
        position: absolute;
        top: 10px;
        left: 10px;
        transition: 0.5s;
    }

    .link:hover {
        color: rgb(29, 29, 29);
    }
</style>