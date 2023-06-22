<template>
    <h1>Selling view</h1>
</template>

<script>
import { ref,onMounted } from 'vue'
import criptoyaApi from '@/services/criptoyaApi';
import lab3api from '@/services/lab3api.';
import store from '@/store/store';
export default ({
    setup() {
        const amount = ref();
        const sellingSuccessful = false;
        const coins = {
            btc: ref(''),
            eth: ref(''),
            usdc: ref(''),
        };

        const sellingData = {
            user_id: ref(null),
            action: 'sale',
            crypto_code: ref(null),
            crypto_amount: ref(null),
            money: ref(null),
            datetime: ref(null),
        };

        const Selling = async () =>{
            amount.value = parseFloat(amount.value);
           
            if(sellingSuccessful.value == true){
                Validations();
                GetPrice();
                SellingObject();
                try {
                  await lab3api.transaction(sellingData);
            } catch {
                console.log("Error en la Venta")
            }
            }else{
                sellingSuccessful.value = false;
                return "Error en la Venta"
            }
            
        }
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(`00${(date.getMonth() + 1)}`).slice(-2)}-${(`00${date.getDate()}`).slice(-2)}T${(`00${date.getHours()}`).slice(-2)}:${(`00${date.getMinutes()}`).slice(-2)}`;

        const SellingObject = () =>{

            sellingData.datetime = formattedDate;
            sellingData.user_id = store.state.id;
            sellingData.crypto_code = CryptoCode.value;
            sellingData.money = coins.btc.value;
            sellingData.crypto_amount = amount.value.toString();
            sellingData.action = 'sale';
            
        }
        const GetPrice = async () => {
            await criptoyaApi.getBTC().then((response) => {
                coins.btc.value = response.data.totalAsk;
            });
            await criptoyaApi.getETH().then((response) => {
                coins.eth.value = response.data.totalAsk;
            });
            await criptoyaApi.getUSDC().then((response) => {
                coins.usdc.value = response.data.totalAsk;
            });
        };

        const Validations = () =>{
            switch (CryptoCode){
                case 'btc':
                    sellingData.crypto_code = 'btc'
                    break; 
                case 'usdc':
                    sellingData.crypto_code = 'usdc'
                    break;
                case 'eth':
                    sellingData.crypto_code = 'eth'
                    break;                
            }

            if(amount.value > 0){
                sellingData.crypto_amount = amount.value;
            }else{
                return 'No se puede comprar un numero negativo'
            }

            if(Object.values(coins).some(coin => coin.value === 0)){
            return 'No esta disponible para su venta'
        }
        }
    
        onMounted(( ) =>{
            GetPrice();
        });
        
        return{
            SellingObject,
            GetPrice,
            Selling
        }
    },
})
</script>
