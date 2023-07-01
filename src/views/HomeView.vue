
<template>
  <div>
    <navbar></navbar>
    <h1 class="centered">Welcome, {{ user }}!</h1>
      <h1 class="centered">What will be your next movement?</h1>
      <h4 class="right-aligned">You have: {{ giftmoney }}</h4>

    <div class="grid-container">
      <div class="grid-item">
        <h2>BTC Price</h2>
        <p v-if="response">{{ state.btc.price }}</p>
      </div>
      <div class="grid-item">
        <h2>ETH Price</h2>
        <p v-if="response">{{ state.eth.price }}</p>
      </div>
      <div class="grid-item">
        <h2>USDC Price</h2>
        <p v-if="response">{{ state.usdc.price }}</p>
      </div>
    </div>
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

    const user = computed(()=> store.state.id);
    let giftmoney = computed(()=> store.state.gift);
    console.log(store.state.gift)
    const state = reactive({
      btc: {},
      eth: {},
      usdc: {},
    });
    
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
      giftmoney,
      response,
      GetPrice
    
    }

  }
} 

</script>
<style>
.container {
  text-align: center;
  margin-bottom: 10px;
}

.centered {
  margin: 1;
}

.right-aligned {
  text-align: right;
  margin: 0;
}
#grafico {
  position: relative;
  top: -30%;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px;
}
.grid-item {
  border: 3px solid #050505;
  padding: 20px;
  text-align: center;
}


</style>

