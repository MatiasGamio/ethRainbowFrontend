<template>
  <div id="c0" class="colorBar" style="" :style="visibleBackground"></div>
  <div id="c1" class="colorBar" style="top: 20%; " :style="visibleBackground"></div>
  <div id="c2" class="colorBar" style="top: 40%; " :style="visibleBackground"></div>
  <div id="c3" class="colorBar" style="top: 60%; " :style="visibleBackground"></div>
  <div id="c4" class="colorBar" style="top: 80%; " :style="visibleBackground"></div>
  <div id="bg"></div>
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  components: {
    NavBar,
  },
  methods: {
    randomizeBackground() {
      if (this.currentPath == '/') {
        for (let i=0; i<5; i++) {
          let randomColor = Math.floor(Math.random()*16777215).toString(16);
          let colorBar = document.getElementById("c" + i);
          colorBar.style.backgroundColor = "#" + randomColor;  
        }
      }
    }
  },
  mounted() {
    this.randomizeBackground();
    setInterval(this.randomizeBackground, 1000);
  },
  computed: {
    currentPath: function() { return useRoute().path; },
    visibleBackground: function() {
      if (this.currentPath == '/') {
        return "opacity: 1.0";
      }
      return "opacity: 0";
    }
  },
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
    z-index: 100;
  }

  #background {
    height: 100vh;
  }

  .colorBar {
    position: fixed;
    width: 100%;
    height: 20%;
    z-index: -1;
    transition: 0.5s;
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

  #bg {
    z-index: -2;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    background: rgb(64,64,64);
    background: radial-gradient(circle, rgba(64,64,64,1) 0%, rgba(56,56,56,1) 50%, rgba(34,34,34,1) 100%);
    position: fixed;
  }
</style>
