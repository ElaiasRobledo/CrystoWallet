
<template>

  <div class="container">
      <navbar></navbar>
        <h1>{{ state.btc.totalAsk }}</h1>
        <div>
          Welcome, <b>{{ user }}! </b>
        </div>
        <h2>What will be your new movement?</h2>
        <graphics></graphics>
  </div>
  
</template>
<script>

import { computed, onMounted, reactive } from 'vue';

import cryptoyaApi from '../services/criptoyaApi';
import store from '@/store/store';
import navbar from '../components/NavBar.vue'
import graphics from '../components/GraphicsLine.vue'
export default{
  components:{
    navbar,
    graphics
  },
  setup(){

    const state = reactive({
      btc: {},
      eth: {},
      usdc: {},
    });
    const user = computed(()=> store.state.id);
    

    const GetPrice = async () =>{
      const btcResponse = await cryptoyaApi.getBTC();
      const ethResponse = await cryptoyaApi.getETH();
      const usdcRersponse = await cryptoyaApi.getUSDC();
      console.log("Los datos del BTC son:",usdcRersponse.data)
      state.btc = btcResponse.data;
      state.eth = ethResponse.data;
      state.usdc = usdcRersponse.data;
    };
    onMounted(()=>{
      GetPrice();
    });

    const response = computed(()=>{
      return (state.btc).length !== 0 &&
      (state.eth).length !== 0 &&
      (state.usdc).length !== 0;
    });
    
    
    return {
      user,
      state,
      response,
      GetPrice
    
    }

  }
} 

</script>
<style>
.grid-container{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 20px;
}
.grid-item{
  border: 2px solid #050505; 
  padding: 10px; 
}


</style>

