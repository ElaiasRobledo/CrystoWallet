
<template>

  <div class="container">
      <navbar></navbar>
      
        <div>
          Welcome, <b>{{ user }}! </b>
        </div>
        <h2>What will be your new movement?</h2>
   
      <div class="grid-container">
        <div class="grid-item">
          <Line :chart-data="dataGraphicsBTC"></Line>
        </div>
        <div class="grid-item">
          <Line :chart-data="dataGraphicsETH"></Line>
        </div>
        <div class="grid-item">
          <Line :chart-data="dataGraphicsUSDC"></Line>
        </div>
      </div>
      
  </div>
  
</template>
<script>

import { computed, onMounted, reactive } from 'vue';

import cryptoyaApi from '../services/criptoyaApi';
import store from '@/store/store';
import navbar from '../components/NavBar.vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement } from 'chart.js'
import { PointElement } from 'chart.js';
ChartJS.register(PointElement,Title, Tooltip, Legend,BarElement,LineElement, CategoryScale, LinearScale)
export default{
  components:{
    navbar,
    Line
  },
  setup(){

    const dataChartBTC = () =>{
      return{
        labels: ['1','2','3','4'],
        datasets:[{
          label: 'BTC Price',
          borderWidth: 2,
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderColor: 'rgba(0, 255, 0, 1)',
          lineTension: 0.5,
          data: [
            state.btc.ask,
            state.btc.bid,
            state.btc.totalAsk,
            state.btc.totalBid,
          ]
        }]
      }
    }
    //hacer los objetos en otro componente pero urgente
    const dataChartUSDC = () =>{
      return{
        labels: ['1','2','3','4'],
        datasets:[{
          label: 'USDC Price',
          borderWidth: 2,
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderColor: 'rgba(0, 255, 0, 1)',
          lineTension: 0.5,
          data: [
            state.usdc.ask,
            state.usdc.bid,
            state.usdc.totalAsk,
            state.usdc.totalBid,
          ]
        }]
      }
    }
    const dataChartETH = () =>{
      return{
        labels: ['1','2','3','4'],
        datasets:[{
          label: 'ETH Price',
          borderWidth: 2,
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderColor: 'rgba(0, 255, 0, 1)',
          lineTension: 0.5,
          data: [
            state.eth.ask,
            state.eth.bid,
            state.eth.totalAsk,
            state.eth.totalBid,
          ]
        }]
      }
    }
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
      dataChartETH(),
      dataChartBTC(),
      dataChartUSDC(),
      GetPrice();
    });

    const response = computed(()=>{
      return (state.btc).length !== 0 &&
      (state.eth).length !== 0 &&
      (state.usdc).length !== 0;
    });
    
    
    return {
      dataGraphicsBTC: computed(()=> dataChartBTC()),
      dataGraphicsETH: computed(()=> dataChartETH()),
      dataGraphicsUSDC: computed(()=>dataChartUSDC()),
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

