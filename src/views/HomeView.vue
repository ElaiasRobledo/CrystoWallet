
<template>
  <div>
    <navbar></navbar>
    <h1 class="centered text-center">Welcome, {{ user }}!</h1>
      <h1 class="centered text-center">Which will be your next movement?</h1>
      <h4 class="centered text-center">Balance
        : <strong>${{ giftmoney }}</strong></h4>
    <graphics></graphics>
  </div>
</template>
<script>

import { computed, onMounted, reactive, ref } from 'vue';

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

    let isLoading = ref(false)
    const wasregistered = ref(false);
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

    onMounted(async ()=>{
      isLoading.value = true;
      await GetPrice();
    });

    const response = computed(()=>{
      return (state.btc).length !== 0 &&
      (state.eth).length !== 0 &&
      (state.usdc).length !== 0;
    });
    
    return {
      isLoading,
      user,
      state,
      giftmoney,
      response,
      wasregistered,
      GetPrice
    
    }

  }
} 

</script>
<style>
#app{
  background-color: rgb(33, 38, 46);
  color: white;
  height: 100vh;
}
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
.card{
  background-color: rgb(46, 53, 65);
}
/* .grid-item {
  background-color:rgb(237, 242, 247);
  border: 3px solid #050505;
  padding: 4px;
  text-align: center;
} */
</style>

