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
        <tbody>
        <tr v-for="(item, index) in state.historial" :key="index">
          <th scope="row">{{ item.crypto_code.toUpperCase() }}</th>
          <td>{{ item.crypto_amount }}</td>
          <td>${{ item.money }}</td>
          <td>{{ item.datetime.slice(0,10) }}</td>
          <td><b>{{ item.action.toUpperCase() }}</b></td>
          <td>

            <button class="btn btn-danger mb-1" data-bs-toggle="modal"
            data-bs-target="#modalEliminar" @click="deleteTransaction(item._id)">Delete</button>
          </td>
          <td>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Edit
            </button>

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
  import { onMounted,reactive } from 'vue';
  
  export default {
    components: {
      navbar,
    },

    setup() {
        
      const state = reactive({
        historial: null,
      
      })
      const Historial = async() =>{
       await lab3api.getHistorial().then((response) => {        
          console.log("Data?");
          console.log(response.data);
          state.historial = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
      }
      console.log("pedioo esa");
      
      

      const deleteTransaction = (id)=>{ 
        lab3api.delete(id)
        console.log('eliminadoo')
      }
      
      onMounted(()=>{
        Historial()
      })
      //deleteTransaction()
      return{
        state,
        history,
        deleteTransaction
      }
    },
    
  };
</script>
<style scoped>
th{
  color: white;
  border-top: 0px;
  text-align: center;
}


</style>