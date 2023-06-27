
<template>
    <navbar></navbar>
   

    <div class="container">
        <h1>que vas a comprar{{ user }}</h1>
        <select v-model="coinSelect">
            <option disabled value="">Please select one</option>
            
            <option value="usdc">USDC</option>
            <option value="btc">Bitcoin</option>
            <option value="eth">Ethereum</option>
            
        </select>
    

        <h1>{{ coin }}</h1>
        
        <button type="button" class="btn btn-success" @click="Purchase">Purchase</button>
        <br>
        <input type="number" placeholder="0.3456" min="0.00001" v-model="amountval" >

        <button type="button" class="btn btn-success" @click="GetHistorial">Historial</button>
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
    
        const purchaseData = {
            user_id: ref(null),
            action: 'purchase',
            crypto_code: ref(null),
            crypto_amount: ref(null),
            money: ref(null),
            datetime: ref(null),
        }

        console.log('el user es: ',purchaseData.user_id.value = store.state.id);
        
        //Select
        watch(coinSelect,(newValue)=>{
            console.log("elias tonto",newValue)
            coin.value = newValue;
            
            purchaseData.crypto_code = newValue
            console.log("Funco")
        })
        watch(amountval,(valor)=>{
            amount.value = valor
            console.log(valor)
            purchaseData.crypto_amount = valor;

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
            purchaseData.money = priceCoin.value; 
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
            purchaseData.datetime = formattedDate;
            purchaseData.user_id = store.state.id;
            purchaseData.action = 'purchase';
            purchaseData.crypto_amount = amount.value;
            purchaseData.money = priceCoin.value;
            purchaseData.crypto_code = coin.value;
            
        }
  
        console.log('Los datos son: ',purchaseData)

        const Purchase = async () => {          
                console.log('Los datos son: ',purchaseData)
                try {
                    console.log('Enviando....')
                    await lab3api.transaction(purchaseData);
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
        user,
        coinSelect,
        GetHistorial,
        Purchase,
        amountval,
        coins,
        GetPrice,
        };
    },
    };


</script>