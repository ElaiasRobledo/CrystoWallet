<template>
  <NavBar></NavBar>

    <div class="bg-dark">
      <br>
      <div class="container" >
        <div class="row">
            <div class="col">
              <img src="../assets/bitcoin-logo.png" class="img-thumbnail" alt="s" >
            </div>
            <div class="col">
              <img src="../assets/etherium3.png" class="img-thumbnail" alt="...">
            </div>
            <div class="col">
              <img src="../assets/usdc.png" class="img-thumbnail" alt="...">
            </div>
          </div>
          <br>
          <button class="btn btn-primary" type="submit">Comprar</button>
        </div>
      </div>
</template>

<script>

import { computed, onMounted, reactive } from 'vue';
import cryptoyaApi from '../services/criptoyaApi';
export default{
  setup(){
    const state = reactive({
      btc: {},
      eth: {},
      usdc: {}
    });

    const GetPrice = async () =>{
      const btcResponse = await cryptoyaApi.getBTC();
      const ethResponse = await cryptoyaApi.getETH();
      console.log(ethResponse.data)
      const usdcRersponse = await cryptoyaApi.getUSDC();

      state.btc = btcResponse.data;
      state.eth = ethResponse.data;
      state.usdc = usdcRersponse.data;
    };
    onMounted(()=>{
      GetPrice();
    });

    const response = computed(()=>{
      return Object.keys(state.btc).length !== 0 &&
      Object.keys(state.eth).length !== 0 &&
      Object.keys(state.usdc).length !== 0;
    });
    
    return {
      state,
      response,
      GetPrice,
    }

  }
} 


</script>

