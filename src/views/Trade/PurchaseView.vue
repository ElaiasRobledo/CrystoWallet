<template>
  <navbar></navbar>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <h4>
        Your balance is: <b id="h4">${{ giftmoney }}</b>
      </h4>
      <div class="col-lg-12 col-xl-11">
        <div class="card" style="border-radius: 25px">
          <div class="card-body">
            <div class="row">
              <div
                class="col-md-6 col-lg-6 col-xl-5 col-sm-12 order-2 order-lg-1"
              >
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Don't lose the opportunity!
                </p>
                <form class="mx-1 mx-md-4">
                  <div class="container">
                    <p class="greenText">
                      <b>Select the Crypto Currency</b>
                    </p>
                    <select id="coin" v-model="coinSelect" class="select w-100">
                      <option value="usdc">USDC</option>
                      <option value="btc">Bitcoin</option>
                      <option value="eth">Ethereum</option>
                    </select>
                    <br />
                    <br />
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline mb-4">
                        <p class="greenText">
                          <b>Enter the amount you'll buy</b>
                        </p>
                        <input
                          id="mount"
                          type="number"
                          placeholder="0.3456"
                          min="0.00001"
                          v-model="amountval"
                          onkeydown="return event.keyCode !== 189 && event.keyCode !== 187;"
                        />
                      </div>
                    </div>

                    <div
                      class="alert alert-danger alert-dismissible fade show"
                      role="alert"
                      v-if="
                        parseFloat(purchaseData.money) > parseFloat(giftmoney)
                      "
                    >
                      <strong>You don't have enough money</strong>
                    </div>
                    <button
                      v-else
                      type="button"
                      class="btn btn-primary w-100 greenButton"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Purchase
                    </button>
                    <br />
                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div v-if="amountval == null">
                            <div class="modal-body">
                              <h3><b> Enter data</b></h3>
                            </div>
                          </div>
                          <div v-else>
                            <div class="modal-body">
                              <h3><b> Are you sure?</b></h3>
                            </div>
                            <div class="modal-footer mx-5">
                              <button
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                class="btn btn-success"
                                data-dismiss="modal"
                                @click="Purchase"
                              >
                                Go on
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div
                      class="alert alert-success alert-dismissible fade show"
                      role="alert"
                      v-if="wasbought"
                    >
                      <strong>Congratulations {{ user }}!</strong> <br />
                      Successful Purchase
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div
                class="col-md-6 col-sm-12 d-flex justify-content-center align-items-center"
              >
                <img
                  id="img"
                  src="https://i.pinimg.com/originals/0f/25/ee/0f25ee2d869ef533343ffaed0b830712.jpg"
                  class="img-fluid"
                  alt="Sample image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, watch, reactive, computed } from "vue";
import cryptoyaApi from "@/services/criptoyaApi";
import lab3api from "@/services/lab3api.";
import navbar from "@/components/NavBar.vue";
import store from "@/store/store";
import { isAxiosError } from "axios";
export default {
  components: {
    navbar,
  },
  setup() {
    const amountval = ref(null);
    const amount = ref(null);
    const coinSelect = ref(null);
    const coin = ref(null);
    const wasbought = ref(false);
    const priceCoin = ref(null);
    const coins = reactive({
      btc: {},
      eth: {},
      usdc: {},
    });

    const user = computed(() => store.state.id);
    const giftmoney = store.state.gift;
    const btcamount = store.state.btcamount;
    const ethamount = store.state.ethamount;
    const usdcamount = store.state.usdcamount;
    const purchaseData = {
      user_id: ref(null),
      action: "purchase",
      crypto_code: ref(null),
      crypto_amount: ref(null),
      money: ref(null),
      datetime: ref(null),
    };

    console.log("el user es: ", (purchaseData.user_id.value = store.state.id));

    //Select
    watch(coinSelect, (newValue) => {
      console.log(newValue);
      coin.value = newValue;

      purchaseData.crypto_code = newValue;
      console.log("Funco");
    });
    watch(amountval, (valor) => {
      amount.value = valor;
      console.log(valor);
      purchaseData.crypto_amount = valor;

      switch (coin.value) {
        case "btc":
          priceCoin.value = (valor * coins.btc.totalAsk).toFixed();
          console.log(priceCoin.value);
          break;
        case "eth":
          priceCoin.value = (valor * coins.eth.totalAsk).toFixed();
          console.log(priceCoin.value);
          break;
        case "usdc":
          priceCoin.value = (valor * coins.usdc.totalAsk).toFixed();
          console.log(priceCoin.value);
          break;
      }
      purchaseData.money = priceCoin.value;
    });

    const validation = computed(() => {
      return coinSelect.value == "" || amountval.value == "";
    });

    const GetPrice = async () => {
      const btcResponse = await cryptoyaApi.getBTC();
      const ethResponse = await cryptoyaApi.getETH();
      const usdcRersponse = await cryptoyaApi.getUSDC();

      coins.btc = btcResponse.data;
      coins.eth = ethResponse.data;
      coins.usdc = usdcRersponse.data;
    };

    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${`00${
      date.getMonth() + 1
    }`.slice(-2)}-${`00${date.getDate()}`.slice(
      -2
    )}T${`00${date.getHours()}`.slice(-2)}:${`00${date.getMinutes()}`.slice(
      -2
    )}`;

    {
      purchaseData.datetime = formattedDate;
      purchaseData.user_id = store.state.id;
      purchaseData.action = "purchase";
      purchaseData.crypto_amount = amount.value;
      purchaseData.money = priceCoin.value;
      purchaseData.crypto_code = coin.value;
    }

    const Purchase = async () => {
      //seguir probando validaciones
      if (
        isNaN(parseFloat(purchaseData.money)) ||
        isAxiosError(parseFloat(purchaseData.money))
      ) {
        console.log(giftmoney);
        console.log(purchaseData.money);
        console.log("Valor ingresado incorrecto");
      } else {
        try {
          console.log("Enviando....");
          await lab3api.transaction(purchaseData);
          console.log("Enviaooouu");

          const loquesobra = giftmoney - purchaseData.money;
          store.commit("setGiftMoney", loquesobra);
          let totalusdc =
            parseFloat(usdcamount) + parseFloat(purchaseData.money);
          let totaleth = parseFloat(ethamount) + parseFloat(purchaseData.money);
          let totalbtc = parseFloat(btcamount) + parseFloat(purchaseData.money);

          switch (purchaseData.crypto_code) {
            case "btc":
              store.commit("setBTC", totalbtc);
              console.log(totalbtc);
              break;
            case "eth":
              store.commit("setETH", totaleth);
              console.log(totaleth);
              break;
            case "usdc":
              store.commit("setUSDC", totalusdc);
              console.log(totalusdc);
              break;
          }

          setTimeout(() => {
            location.reload();
          }, 2000);
          console.log(loquesobra);
          wasbought.value = true;
        } catch {
          console.log("Error en la compra");
        }
      }
    };

    onBeforeMount(() => {
      GetPrice();
    });

    return {
      coin,
      user,
      coinSelect,
      priceCoin,
      purchaseData,
      wasbought,
      giftmoney,
      Purchase,
      validation,
      amountval,
      coins,
      GetPrice,
    };
  },
};
</script>
<style scoped>
#h4 {
  color: rgb(255, 255, 88);
}
#mount {
  width: 350px;
  height: 30px;
}
#coin {
  height: 30px;
}
#img {
  width: 300px;
  height: 300px;
}
.card {
  background-color: rgb(46, 53, 65);
  padding: 0px;
}
.container {
  padding: 0px;
}
.modal-content {
  background-color: rgb(33, 38, 46);
}
.modal-header {
  background-color: rgb(46, 53, 65);
  border-bottom: 0px;
}
.modal-footer {
  border-top-color: rgb(46, 196, 81);
}
.greenText {
  color: rgb(46, 196, 81);
}
.greenButton {
  background-color: rgb(46, 196, 81);
  border-color: rgb(46, 196, 81);
}
.greenButton:hover {
  background-color: rgb(30, 129, 53);
  border-color: rgb(30, 129, 53);
}
</style>
