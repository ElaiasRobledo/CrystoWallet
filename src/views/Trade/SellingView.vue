
<template>
    <navbar></navbar>
   

    <div class="container">
        <h1>{{ user }}</h1>
        <select v-model="coinSelect">
            <option disabled value="">Please select one</option>
            
            <option value="usdc">USDC</option>
            <option value="btc">Bitcoin</option>
            <option value="eth">Ethereum</option>
            
        </select>
    

        <h1>{{ coin }}</h1>
        
        <button type="button" class="btn btn-success" @click="Sell">Sell</button>
        <br>
        <input type="number" placeholder="0.3456" min="0.00001" v-model="amountval" >

        <!-- <button type="button" class="btn btn-success" @click="GetHistorial">Historial</button> -->
    </div>
</template>
  

<script>
    import { ref, onBeforeMount, watch, reactive,computed } from 'vue';
    import cryptoyaApi from '@/services/criptoyaApi';
    import lab3api from '@/services/lab3api.';
    import navbar from '@/components/NavBar.vue'
    import store from '@/store/store'
    export default {
    components:{
        navbar,
    },
    setup() {
        
        const amountval = ref(null);
        const amount = ref(null);
        const coinSelect = ref(null);
        const coin = ref(null);
        const priceCoin = ref(null);
        const coins = reactive({
            btc: {},
            eth: {},
            usdc: {},
        });
        const user = computed(()=> store.state.id);
        const sellingData = {
            user_id: ref(null),
            action: 'purchase',
            crypto_code: ref(null),
            crypto_amount: ref(null),
            money: ref(null),
            datetime: ref(null),
        }

        //Select
        watch(coinSelect,(newValue)=>{
            console.log("elias tonto",newValue)
            coin.value = newValue;
            
            sellingData.crypto_code = newValue
            console.log("Funco")
        })
        watch(amountval,(valor)=>{
            amount.value = valor
            console.log(valor)
            sellingData.crypto_amount = valor;

            switch(coin.value){
                case 'btc':
                priceCoin.value = (valor * coins.btc.totalAsk).toFixed();
                console.log(priceCoin.value)
                break;
                case 'eth':
                priceCoin.value = (valor * coins.eth.totalAsk).toFixed();
                console.log(priceCoin.value)
                break;
                case 'usdc':
                priceCoin.value = (valor * coins.usdc.totalAsk).toFixed();
                console.log(priceCoin.value)
                break;    
            }
            sellingData.money = priceCoin.value; 
        })
         
        const GetPrice = async () => {
            const btcResponse = await cryptoyaApi.getBTC();
            const ethResponse = await cryptoyaApi.getETH();
            const usdcRersponse = await cryptoyaApi.getUSDC();
           
            coins.btc = btcResponse.data;
            coins.eth = ethResponse.data;
            coins.usdc = usdcRersponse.data;
           
        };
       
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(`00${(date.getMonth() + 1)}`).slice(-2)}-${(`00${date.getDate()}`).slice(-2)}T${(`00${date.getHours()}`).slice(-2)}:${(`00${date.getMinutes()}`).slice(-2)}`; 
        
        {
            sellingData.datetime = formattedDate;
            sellingData.user_id = store.state.id;
            sellingData.action = 'sale';
            sellingData.crypto_amount = amount.value;
            sellingData.money = priceCoin.value;
            sellingData.crypto_code = coin.value;
            
        }
  
        console.log('Los datos son: ',sellingData)

        const Sell = async () => {          
                console.log('Los datos son de la venta son: ',sellingData)
                try {
                    console.log('Enviando....')
                    await lab3api.transaction(sellingData);
                    console.log('Enviaooouu')
                } catch {
                    console.log("Error en la compra")
                }
        }
        const GetHistorial = async () =>{
            await lab3api.getHistorial(store.state.id)
            console.log('ea')
        }

            
         //agregar objetos a otra clase para optimizar codigoooooooooo

        onBeforeMount(() => {
            GetPrice();
        });

        return {
        coin,
        coinSelect,
        sellingData,
        user,
        GetHistorial,
        Sell,
        amountval,
        coins,
        GetPrice,
        };
    },
    };


</script>