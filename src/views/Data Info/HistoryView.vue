<template>
  <div>
    <navbar></navbar>
    <table v-if="state.historial != null" class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Coin</th>
          <th scope="col">Amount</th>
          <th scope="col">Price</th>
          <th scope="col">Date</th>
          <th scope="col">Movement</th>
          <th scope="col">Delete</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <div v-if="loading" class="d-flex justify-content-center">
        <div class="spinner-border load" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h2 class="mt-3">Cargando</h2>
      </div>

      <tbody v-else>
        <tr v-for="(item, index) in state.historial" :key="index">
          <th scope="row">{{ item.crypto_code.toUpperCase() }}</th>
          <td>{{ item.crypto_amount }}</td>
          <td>${{ item.money }}</td>
          <td>{{ item.datetime.slice(0, 10) }}</td>
          <td>
            <b>{{ item.action.toUpperCase() }}</b>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger mb-1"
              :data-target="'#exampleModal-' + index"
              data-toggle="modal"
            >
              Delete
            </button>
            <br />
            <div
              class="modal fade"
              :id="'exampleModal-' + index"
              tabindex="-1"
              role="dialog"
              :aria-labelledby="'exampleModalLabel-' + index"
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
                  <div class="modal-body">
                    <h3><b>Are you sure?</b></h3>
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
                      @click="deleteTransaction(item._id)"
                    >
                      Go On
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </td>

          <!-- -------------------------------------->
          <td>
            <button
              type="button"
              class="btn btn-primary"
              :data-target="'#editModal-' + index"
              data-toggle="modal"
            >
              Edit
            </button>

            <div
              class="modal fade"
              :id="'editModal-' + index"
              tabindex="-1"
              aria-labelledby="'exampleModalLabel-' + index"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="'exampleModalLabel-' + index">
                      Purchase Details
                    </h3>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h5>Coin: {{ item.crypto_code.toUpperCase() }}</h5>
                    <h5>
                      Amount: <b>{{ item.crypto_amount }}</b>
                    </h5>
                    <h5>
                      Price: <b>{{ item.money }}</b>
                    </h5>
                    <div class="modal-body">
                      <div>
                        Edit amount:
                        <input
                          v-model="item.crypto_amount"
                          type="number"
                          min="0"
                          name=""
                          id=""
                        />
                      </div>
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
                        @click="editTransaction(item._id, item.crypto_amount)"
                      >
                        Go On
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import lab3api from "@/services/lab3api.";
import navbar from "@/components/NavBar.vue";
import { onMounted, reactive, ref } from "vue";

export default {
  components: {
    navbar,
  },

  setup() {
    const state = reactive({
      historial: null,
    });

    const loading = ref(false);

    const Historial = async () => {
      loading.value = true;
      await lab3api
        .getHistorial()
        .then((response) => {
          console.log(response.data);
          state.historial = response.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          loading.value = false;
        });
    };
    const deleteTransaction = async (id) => {
      await lab3api.delete(id);
      console.log(id);
      location.reload();
      console.log("eliminadoo");
    };

    const editTransaction = async (id, amount) => {
      await lab3api.edit(id, amount);
      //console.log(id)
      console.log("editadoo");
      console.log(amount);
      location.reload();
    };

    onMounted(async () => {
      loading.value = true;
      await Historial().then(()=>{
        loading.value = false
      });

    });
    return {
      state,
      history,
      loading,
      editTransaction,
      deleteTransaction,
    };
  },
};
</script>
<style scoped>
th {
  color: rgb(255, 255, 255);
  border-top: 0px;
  text-align: center;
}
td {
  color: rgb(255, 255, 255);
  text-align: center;
}
.modal-content {
  background-color: rgb(33, 38, 46);
}
.modal-header {
  background-color: rgb(46, 53, 65);
  border-bottom: 0px;
}
.card {
  background-color: rgb(46, 53, 65);
  padding: 0px;
}

</style>
