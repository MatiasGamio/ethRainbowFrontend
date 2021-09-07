<template>
  <div id="c0" class="colorBar" style="background-color:#FF0000"></div>
  <div id="c1" class="colorBar" style="top: 20%; background-color:#00FF00"></div>
  <div id="c2" class="colorBar" style="top: 40%; background-color:#FF00FF"></div>
  <div id="c3" class="colorBar" style="top: 60%; background-color:#FFFF00"></div>
  <div id="c4" class="colorBar" style="top: 80%; background-color:#0000FF"></div>

  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  methods: {
    randomizeBackground() {
      for (let i=0; i<5; i++) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        let colorBar = document.getElementById("c" + i);
        colorBar.style.backgroundColor = "#" + randomColor;  
      }
    }
  },
  mounted() {
    this.randomizeBackground();
    setInterval(this.randomizeBackground, 1000);
  }
};
</script>

<style>
  #app {
    font-family:'Roboto',sans-serif;
    color: #1a1a1a;
  }

  html, body {
    margin: 0px;
    padding: 0px;
    outline: none !important;
    overflow: hidden;
  }

  #background {
    height: 100vh;
  }

  .colorBar {
    position: fixed;
    width: 100%;
    height: 20%;
    z-index: -1;
  }

  .component {
    display: inline-block;
    padding:0.3em 1.2em;
    margin:0.2em 0.5em;
    border:0.16em solid rgba(255,255,255,0);
    border-radius:2em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    font-weight:300;
    color:#FFFFFF;
    text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
    text-align:center;
    transition: all 0.2s;
  }

  .component:hover {
    border-color: rgba(255,255,255,1);
  }
  
  .button {
      cursor: pointer;
  }

  .inputBox {
    color: #18072c;
    font-size: 20px;
    outline: none;
    border: 0.16em solid #9a4ef1;
  }
</style>
