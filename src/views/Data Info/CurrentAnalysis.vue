<template>
    <h1>Analisis</h1>
    
</template>


<script>
import { computed, onMounted } from 'vue';
import lab3api from '@/services/lab3api.';

import store from '@/store/store';

export default{

    setup(){

        const coins = {
        btc: ref(null),
        eth: ref(null),
        usdc: ref(null),
        };

        const GetPrice = async () => {
            await cryptoyaApi.getBTC().then((response) => {
                coins.btc.value = response.data.totalAsk;
            });
            await cryptoyaApi.getETH().then((response) => {
                coins.eth.value = response.data.totalAsk;
            });
            await cryptoyaApi.getUSDC().then((response) => {
                coins.usdc.value = response.data.totalAsk;
            });
        };

        computed(()=>{
            if(price.btc && price.eth && price.usdc){
                return coins.btc.value,
                coins.eth.value,
                coins.usdc.value;
            }
        })
        onMounted(() =>{
            GetPrice()
        })

        const history = async() =>  {
             await lab3api.getHistorial(store.state.id)
        }
        return{
            GetPrice,
            history,

        }
    }
    
}

</script>