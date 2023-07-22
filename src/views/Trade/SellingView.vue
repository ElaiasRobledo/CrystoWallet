<template>
  <navbar></navbar>

  <section>
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <h4>
          Your balance is: <b id="h4">${{ giftmoney }}</b>
        </h4>
        <div class="col-lg-12 col-xl-11">
          <div class="card purchase-card" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    It's your moment to get rich
                  </p>
                  <form class="mx-1 mx-md-4">
                    <div class="container">
                      <p class="greenText"><b>Select the Crypto Currency</b></p>
                      <select
                        id="coin"
                        v-model="coinSelect"
                        class="select w-100"
                      >
                        <option value="usdc">USDC</option>
                        <option value="btc">Bitcoin</option>
                        <option value="eth">Ethereum</option>
                      </select>
                      <br />
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline mb-4">
                          <p class="greenText">
                            <b>Enter the amount you'll sell</b>
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
                          (coinSelect === 'btc' &&
                            parseFloat(btcamount) === 0) ||
                          (coinSelect === 'eth' &&
                            parseFloat(ethamount) === 0) ||
                          (coinSelect === 'usdc' &&
                            parseFloat(usdcamount) === 0)
                        "
                      >
                        <strong>You don't have any coin yet, Buy right now!</strong>
                      </div>
                      <div
                        class="alert alert-danger alert-dismissible fade show"
                        role="alert"
                        v-if="
                          parseFloat(sellingData.money) > parseFloat(giftmoney)
                        "
                      >
                        <strong>You exceeded the amount you have</strong>
                      </div>
                      <button
                        type="button"
                        class="btn btn-danger w-100"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        v-if="
                          !(
                            (coinSelect === 'btc' &&
                              parseFloat(btcamount) === 0) ||
                            (coinSelect === 'eth' &&
                              parseFloat(ethamount) === 0) ||
                            (coinSelect === 'usdc' &&
                              parseFloat(usdcamount) === 0) ||
                            parseFloat(sellingData.money) >
                              parseFloat(giftmoney)
                          )
                        "
                      >
                        Sell
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
                                  @click="Sell"
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
                        class="alert alert-warning alert-dismissible fade show"
                        role="alert"
                        v-if="wassold"
                      >
                        <strong>Congratulations {{ user }}!</strong> <br />
                        Successful Sale
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
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    id="img"
                    src="https://pbs.twimg.com/media/DGTOQEbUQAA1gnX.jpg"
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
  </section>
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
    const wassold = ref(false);
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
    const user = computed(() => store.state.id);
    const giftmoney = store.state.gift;
    const btcamount = store.state.btcamount;
    const ethamount = store.state.ethamount;
    const usdcamount = store.state.usdcamount;
    const sellingData = {
      user_id: ref(null),
      action: "sale",
      crypto_code: ref(null),
      crypto_amount: ref(null),
      money: ref(null),
      datetime: ref(null),
    };

    //Select
    watch(coinSelect, (newValue) => {
      coin.value = newValue;
      sellingData.crypto_code = newValue;
    });
    watch(amountval, (valor) => {
      amount.value = valor;
      console.log(valor);
      sellingData.crypto_amount = valor;

      switch (coin.value) {
        case "btc":
          priceCoin.value = (valor * coins.btc.totalBid).toFixed();
          console.log(priceCoin.value);
          break;
        case "eth":
          priceCoin.value = (valor * coins.eth.totalBid).toFixed();
          console.log(priceCoin.value);
          break;
        case "usdc":
          priceCoin.value = (valor * coins.usdc.totalBid).toFixed();
          console.log(priceCoin.value);
          break;
      }
      sellingData.money = priceCoin.value;
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
      sellingData.datetime = formattedDate;
      sellingData.user_id = store.state.id;
      sellingData.action = "sale";
      sellingData.crypto_amount = amount.value;
      sellingData.money = priceCoin.value;
      sellingData.crypto_code = coin.value;
    }

    const Sell = async () => {
      if (
        isNaN(parseFloat(sellingData.money)) ||
        isAxiosError(parseFloat(sellingData.money))
      ) {
        console.log("valor ingresado es correcto");
      } else {
        const loquesobra =
          parseFloat(giftmoney) + parseFloat(sellingData.money);
        store.commit("setGiftMoney", loquesobra);
        console.log(loquesobra);
        try {
          console.log("Enviando....");
          await lab3api.transaction(sellingData);
          wassold.value = true;
          console.log("Enviaooouu");
          const loquesobra =
            parseFloat(giftmoney) + parseFloat(sellingData.money);
          store.commit("setGiftMoney", loquesobra);

          let totalusdc =
            parseFloat(usdcamount) - parseFloat(sellingData.money);
          let totaleth = parseFloat(ethamount) - parseFloat(sellingData.money);
          let totalbtc = parseFloat(btcamount) - parseFloat(sellingData.money);

          switch (sellingData.crypto_code) {
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
      ethamount,
      btcamount,
      usdcamount,
      coinSelect,
      wassold,
      giftmoney,
      sellingData,
      user,
      Sell,
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
  width: 290px;
  height: 30px;
}
.card {
  background-color: rgb(46, 53, 65);
}
.greenText {
  color: rgb(46, 196, 81);
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
</style>
