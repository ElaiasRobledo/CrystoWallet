<template>
  <navbar></navbar>

<div class="container text-center">
  
  <h2>Your Total Balance is: <b>${{ totalamount }}</b></h2>
  <h3>BTC: <b>${{ btcamount }}</b></h3>
  <h3>ETHERIUM: <b>${{ ethamount }}</b></h3>
  <h3>USDC: <b>${{ usdcamount }}</b></h3>
</div>
<br>
  <div class="container-fluid d-flex justify-content-center">
   
      <div class="col-md-4 col-sm-12 graphicCard align-items-center">
        <div class="card">
          <div class="card-body">
            <div class="grid-item">
              <h4 class="text-center">Coins</h4>
              <div>
                <canvas ref="chartCanvas" id="piechart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  </div>
</template>

<script>
import store from "@/store/store";
import navbar from "@/components/NavBar.vue";

import { ref, onMounted } from "vue";
import { Chart, PieController, ArcElement, Legend, Title } from "chart.js";

Chart.register(PieController, ArcElement, Legend, Title);

export default {
  components: {
    navbar,

  },
  setup() {
    const btcamount = store.state.btcamount;
    const ethamount = store.state.ethamount;
    const usdcamount = store.state.usdcamount;
    const totalamount = store.state.gift;
    const chartCanvas = ref(null);
    const isLoading = ref(true);

    const datachartCryptos = () => {
      return {
        labels: ["BTC", "ETC", "USDC"],
        datasets: [
          {
            backgroundColor: [
              "rgba(255, 220, 0, 1)",
              "rgba(255, 98, 247, 1)",
              "rgba(0, 130, 255, 1)",
            ],
            data: [btcamount, ethamount, usdcamount],
          },
        ],
      };
    };

    const renderChart = () => {
      const ctx = chartCanvas.value.getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: datachartCryptos(),
        options: {
          responsive: true,
        },
      });

      isLoading.value = false; // Marcar como cargado una vez que se renderice el gráfico
    };

    onMounted(() => {
      renderChart();
    });

    return {
      chartCanvas,
      totalamount,
      btcamount,
      ethamount,
      usdcamount,
      isLoading,
    };
  },
};
</script>

<style scoped>

b{
  color: rgb(255, 255, 88);
}
.card {
  background-color: rgb(46, 53, 65);
  
}
.graphicCard {

}
</style>
