<template>
  <div class="container">
    <div id="own" class="containerBox"></div>
    <Claimer/>
    <div id="linkBox" class="containerBox">
      <div class="links" @click="goToTwitter" style="background-image: url('/img/twitter.png');"></div>
      <div class="links" @click="goToOpenSea" style="background-image: url('/img/opensea.png');"></div>
    </div>
  </div>
</template>

<script>
import Claimer from '@/components/Claimer.vue'
export default {
  name: 'Claim',
  components: {
    Claimer
  },
  methods: {
    goToTwitter() {
      window.location.href = 'https://twitter.com/ethrainbow';
    },
    goToOpenSea() {
      window.location.href = 'https://opensea.io/collection/eth-rainbow';
    }
  }
}
</script>

<style>
  .container{
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
  }

  .containerBox {
    width: 100%;
    text-align: center;
    color:white;
    font-weight: 800;
    font-size:64px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
  }

   #linkBox {
    width: 350px;
    height: 130px;
  }

  .links {
    margin-top:50px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: white;
    background-image: url('/img/twitter.png');
    background-size: contain;
    background-position: center;
    border: 6px solid white;
    transition: transform .2s;
    cursor: pointer;
    margin: 0px 19px;
}

  #links:hover {
    transform: scale(1.2);
  }

  #own {
    width: 100%;
    height: 100px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 20px;
  }

</style>