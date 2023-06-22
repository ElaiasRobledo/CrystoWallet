<template>

</template>

<script>
    import { ref, onMounted } from 'vue';
    import cryptoyaApi from '../services/criptoyaApi';
    import lab3api from '@/services/lab3api.';
    
    import store from '@/store/store'
    export default {
    setup() {
        
        const amount = ref(null);
        const CryptoCode = ref(null);
        const purchaseSuccessful= false;

        const coins = {
        btc: ref(null),
        eth: ref(null),
        usdc: ref(null),
        };

        const money = ref(null);

        
        const purchaseData = {
            user_id: ref(null),
            action: 'purchase',
            crypto_code: ref(null),
            crypto_amount: ref(null),
            money: ref(null),
            datetime: ref(null),
        }

        const Purchase = async () => {
            amount.value = parseFloat(amount.value);
            if(purchaseSuccessful.value == true){
                Validations();
                GetPrice();
                PurchaseObject();
                try {
                   await lab3api.transaction(purchaseData);
            } catch {
                console.log("Error en la compra")
            }
            }else{
                purchaseSuccessful.value = false;
                return "Error en la compra"
            }
            
        }; //agregar objetos a otra clase para optimizar codigoooooooooo

        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(`00${(date.getMonth() + 1)}`).slice(-2)}-${(`00${date.getDate()}`).slice(-2)}T${(`00${date.getHours()}`).slice(-2)}:${(`00${date.getMinutes()}`).slice(-2)}`;
        const PurchaseObject = () =>
        {
            purchaseData.datetime = formattedDate;
            purchaseData.userId = store.state.id;
            purchaseData.action = 'purchase'
            purchaseData.crypto_amount = amount.value.toString();
            purchaseData.money = money.value;
            purchaseData.crypto_code = CryptoCode.value;
            
        }

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

        const Validations = () =>{
            switch (CryptoCode.value){
                case 'btc':
                    purchaseData.crypto_code = 'btc'
                    break; 
                case 'usdc':
                    purchaseData.crypto_code = 'usdc'
                    break;
                case 'eth':
                    purchaseData.crypto_code = 'eth'
                    break                
            }

            if(amount.value > 0){
                purchaseData.crypto_amount = amount.value;
            }else{
                return 'No se puede comprar un numero negativo'
            }
        }

        onMounted(() => {
            GetPrice();
        });

        return {
        PurchaseObject,
        Purchase,
        GetPrice,
        };
    },
    };


</script>