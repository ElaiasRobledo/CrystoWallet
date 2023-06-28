<template>
    <navbar></navbar>
    <h1>Vea el historial</h1>
    <button type="button" class="btn btn-success" v @click="Historial">Hisotiral</button>
</template>

<script>

import lab3api from '@/services/lab3api.';
import navbar from '@/components/NavBar.vue'
import store from '@/store/store'
import {ref} from 'vue'
export default {
    components:{
    navbar,
    },
    setup(){

        const amount = ref(null);
        const coin = ref(null);
        const priceCoin = ref(null);
        const purchaseData = {
            user_id: ref(null),
            action: 'purchase',
            crypto_code: ref(null),
            crypto_amount: ref(null),
            money: ref(null),
            datetime: ref(null),
        }
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
        let json = { }
        const id = store.state.id;
        console.log(id)
        const Historial = async () =>{
            console.log('pidiendoo')
            await lab3api.getHistorial(id).then((response)=>{
               const transaction ={
                datetime : response.formattedDate,
                user_id : response.store.state.id,
                action : 'purchase',
                crypto_amount : response.amount.value,
                money : response.priceCoin.value,
                crypto_code : response.coin.value,
               }
               console.log(transaction)
            },
            console.log('eaaaaaa')
            );

        }

        
        return{
            json,
            Historial
        }
    }
}
</script>