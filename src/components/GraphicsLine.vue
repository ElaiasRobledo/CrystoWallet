<template>
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
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import { Line } from 'vue-chartjs';
import cryptoyaApi from '../services/criptoyaApi';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement } from 'chart.js'
import { PointElement } from 'chart.js';
ChartJS.register(PointElement,Title, Tooltip, Legend,BarElement,LineElement, CategoryScale, LinearScale)
export default{
    components:{
        Line
    },
    setup(){

        const state = reactive({
                btc: {},
                eth: {},
                usdc: {},
        });

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
        return{
            dataGraphicsBTC: computed(()=> dataChartBTC()),
            dataGraphicsETH: computed(()=> dataChartETH()),
            dataGraphicsUSDC: computed(()=>dataChartUSDC()),
        }
    }
}
</script>