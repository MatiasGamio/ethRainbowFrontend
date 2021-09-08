<template>
  <div class="container">
    <div class="containerBox">
      <div id="claim-container">
        Coming Soon
      </div>
    </div>
  </div>
</template>

<script>
//import Claimer from '@/components/Claimer.vue'
export default {
  name: 'Experiment',
  components: {
  },
  methods: {
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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
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