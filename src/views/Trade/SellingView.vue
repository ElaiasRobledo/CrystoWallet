
<template>
    <navbar></navbar>
   

    <section class="vh-100" style="background-color: #ffffff;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
        <h1>You have: ${{ giftmoney }}</h1>
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">It's your moment to get rich</p>

                <form class="mx-1 mx-md-4">
                 <div class="container">
                    <p style="color:rgb(20, 138, 255);"><b>Select the Crypto Currency</b></p>
                    <select id="coin" v-model="coinSelect" class="select" >
                        
                        <option value="usdc">USDC</option>
                        <option value="btc">Bitcoin</option>
                        <option value="eth">Ethereum</option>
                    </select>
                    <br>
                    <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline mb-4">
                                <p style="color:rgb(20, 138, 255);"><b>Enter the amount you'll buy</b></p>
                                <input id="mount" type="decimal" placeholder="0.3456" min="0.00001" v-model="amountval" >
                            
                            </div>
                    </div>

                        <!-- Submit button -->
                        <button type="button" class="btn btn-danger" @click="Sell" >Sell</button>            
                </div>
                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img id="img" src="https://pbs.twimg.com/media/DGTOQEbUQAA1gnX.jpg"
                  class="img-fluid" alt="Sample image">
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
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
            action: 'sale',
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
                priceCoin.value = (valor * coins.btc.totalBid).toFixed();
                console.log(priceCoin.value)
                break;
                case 'eth':
                priceCoin.value = (valor * coins.eth.totalBid).toFixed();
                console.log(priceCoin.value)
                break;
                case 'usdc':
                priceCoin.value = (valor * coins.usdc.totalBid).toFixed();
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
  
        const giftmoney = store.state.gift;
        
        const Sell = async () => {          
            if(parseFloat(giftmoney) < parseFloat(sellingData.money)){
                console.log('superas la canti todno')
            }
            else{
                    
                const loquesobra = parseFloat(giftmoney) + parseFloat(sellingData.money);
                store.commit('setGiftMoney',loquesobra)
                console.log(loquesobra)
                try {
                    console.log('Enviando....')
                    await lab3api.transaction(sellingData);
                    console.log('Enviaooouu')
                    } catch {
                        console.log("Error en la compra")
                    }
                }
            }
         
        
        const GetHistorial = async () =>{
            await lab3api.getHistorial(store.state.id)
            console.log('ea')
        }

        onBeforeMount(() => {
            GetPrice();
        });

        return {
        coin,
        coinSelect,
        giftmoney,
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