<template>
  <div class="container">
    <div class="containerBox">
      <div class="containerSmall">
        <div class="title">🌈ethRainbow</div>     
        <NFTPicker v-model="selectedRainbow" :nfts="ethRainbow.rainbowSVGs" :owned="ethRainbow.myRainbows" :NFTname="'ethRainbow'" :loading="ethRainbow.loadingRainbows"/>
      </div>
      <div class="containerSmall" style="width: 250px;">      
        <span style="font-size:64px; font-weight:800;">+</span>
      </div>
      <div class="containerSmall">
        <div id="nImg"></div>
        <NFTPicker v-model="selectedN" :nfts="nRainbow.NsSVGs" :owned="nRainbow.myNs" :NFTname="'n'" :loading="nRainbow.loadingNs"/>
      </div>
    </div>
    <div class="containerBox" style="height: 140px; width: 250px;">
      <div class="containerSmall" style="height: 140px; width: 250px;">       
        <div class="component button" :style="btnConnectStyle">Mint</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NFTPicker from '@/components/NFTPicker.vue'
export default {
  name: 'Experiment',
  data() {
    return {
      selectedRainbow: null,
      selectedN: null,

      enabledMint: false
    }
  },
  components: {
    NFTPicker
  },
  methods: {
    
  },
  computed: {
    btnConnectStyle: function (state) {
        if (this.enabledMint) {
          return "background-color:#f14e4e;";
        } else {
          return "background-color:#grey;";
        }
    },
    ...mapState({ ethers: (state) => state.ethers}),
    ...mapState({ ethRainbow: (state) => state.ethRainbow}),
    ...mapState({ nRainbow: (state) => state.nRainbow}),
  },
  mounted() {
      if (this.ethRainbow.myRainbows.length > 0 && this.selectedRainbow == null) {
        this.selectedRainbow = (this.ethRainbow.myRainbows[0]).toString();
      }

      if (this.nRainbow.myNs.length > 0 && this.selectedN == null) {
        this.selectedN = (this.nRainbow.myNs[0]).toString();
      }

    let i = setInterval(() => {
      if (this.selectedRainbow != null) { clearInterval(i); }
      if (this.ethRainbow.myRainbows.length > 0) {
        this.selectedRainbow = (this.ethRainbow.myRainbows[0]).toString();
      }
    }, 500);

    let j = setInterval(() => {
      if (this.selectedN != null) { clearInterval(j); }
      if (this.nRainbow.myNs.length > 0) {
        this.selectedN = (this.nRainbow.myNs[0]).toString();
      }
    }, 500);
  }
}
</script>

<style>

  #nImg {
    width: 100px;
    height: 40px;
    background-image: url(/img/n.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin-bottom: 15px;
  }

  .title {
    font-size: 32px;
    margin-bottom: 15px;
  }

  .button {
    font-size: 20px;
    background-color: black;
  }

  .container{
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
  }

  .containerBox {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
  }

  .containerSmall {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    width: 350px;
    height: 350px;
  }

  #claim-container {
    display: block;
    width: 350px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    background-color: rgba(0,0,0,0.65);
    border-radius: 25px;
  }
</style>