<template>
  <div class="containerBox">
    <div id="claim-container" class="" v-if="connected">
      <div class="title">🌈ethRainbow</div>
      <div class="label">rainbowId:</div>
      <input id="tokenNumber" class="component inputBox" v-model="tokenId" min="1" max="6000"/>
      <button id="btnClaim" class="component button" :style="btnClaimStyle">
        <img src="img/spinner.svg" height="35" v-if="checking"/>
        <span v-if="!checking" @click="claimRainbow()">Claim</span>
      </button>
      <div class="errorText">{{message}}</div>
    </div>
    <div id="claim-container" class="" v-if="!connected">
      <div class="title">🌈ethRainbow</div>
      <div class="label">Connect to Etherum Mainnet to claim.</div>
      <div class="component button" style="background-color:grey;" @click="init()">Connect</div>
    </div>
  </div>
  <div id="toast">
    {{toastMessage}}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Claimer',
  data() {
    return {
      tokenId: 1,
      checking: false,
      message: '',
      readyToClaim: false,
      toastMessage: 'Rainbow #100 minted'
    }
  },
  watch: {
      tokenId(newId, oldId) {
        this.checking = false;
        this.readyToClaim = false;
        if (isNaN(newId)) { this.tokenId = oldId; return; }
        if (newId == "") { return; }
        if (newId < 1) {this.tokenId = oldId; }
        if (newId > 6000) {this.tokenId = oldId; }
        this.checkClaimable();
      }
  },
  methods: {
    ...mapActions('ethers', ['init','logout',]),
    ...mapActions('ethRainbow', ['checkOwned','claim']),
    async checkClaimable() {
      this.checking = true;
      this.message = " ";
      this.readyToClaim = false;
        if (this.ethRainbow.ready) {
          if (this.tokenId == "") {
            this.checking = false;
            this.readyToClaim = false;
            return;
          }
          if (!this.ethRainbow.claimedTokens[parseInt(this.tokenId-1)]) {
            await this.checkOwned(parseInt(this.tokenId));
          }
          this.checking = false;
          this.calcError();
        }
    },
    calcError() {
      if (this.ethRainbow.claimedTokens[parseInt(this.tokenId-1)]) {
        this.message = "Rainbow already claimed";
        this.readyToClaim = false;
      } else {
        this.message = " ";
        this.readyToClaim = true;
      }
    },
    async claimRainbow() {
      let input = document.getElementById("tokenNumber");
      input.disabled = true;
      this.checking = true;
      this.message = "Claiming Rainbow...";
      let success = await this.claim(parseInt(this.tokenId));

      if (success) {
        let toaster = document.getElementById("toast");
        toaster.style.transform = "translateY(-20px)";
        toaster.style.opacity = 1.0;
        this.toastMessage = `Rainbow #${this.tokenId} minted`;
        setTimeout(() => {
          toaster.style.transform = "translateY(0px)";
          toaster.style.opacity = 0.0;
        }, 3000);
      }

      input.disabled = false;
      this.checking = false;
      this.message = " ";
      this.checkClaimable();
    }
  },
  computed: {
    btnClaimStyle: function () {
      if (!this.checking) {
        if (this.readyToClaim) {
          return "background-color:rgb(138, 43, 226);";
        }
      }
      return "background-color:grey;";
    },
    connected: function () {
      if (!(this.ethers.connected && this.ethers.networkOk && this.ethers.address.length>0 && this.ethRainbow.ready)) { return false; }
      this.checkClaimable();
      return true;
    },
    ...mapState({ ethers: (state) => state.ethers}),
    ...mapState({ ethRainbow: (state) => state.ethRainbow}),
  },
  mounted() {
    this.checkClaimable();
  }
}
</script>

<style scoped>
  #btnClaim {
    height: 51px;
  }

  .containerBox {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
  }

  .button {
    font-size: 20px;
    margin-top:15px;
  }

  #claim-container {
    display: block;
    width: 350px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    background-color: rgba(0,0,0,0.65);
    border-radius: 25px;
  }

  .errorText {
    width: 100%;
    height: 27px;
    font-size: 13px;
    margin-top: 30px;
    text-align: center;
  }

  .label {
    width: 100%;
    text-align: center;
    color: white;
    font-size: 21px;
    padding: 0 20px;
  }

  .title {
    width: 100%;
    text-align: center;
    color: white;
    margin-bottom:40px;
    font-weight: 600;
    font-size: 32px;
  }

  #toast {
    position: fixed;
    width: min(50%,300px);
    height: 45px;
    bottom: 0px;
    background-color: #14a2e8;
    margin-bottom: 10%;
    border-radius: 30px;
    filter: blue;
    filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5));
    line-height: 45px;
    color: white;
    text-align: center;
    transition: ease 1s;
    opacity: 0;
  }
</style>
