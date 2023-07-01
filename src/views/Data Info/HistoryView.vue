<template>
    <div>
      <navbar></navbar>
      <table v-if="this.history != null" class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Moneda</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th scope="col">Fecha</th>
            <th scope="col">Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(element, index) in this.history" :key="index">
            <th scope="row">{{ element.crypto_code }}</th>
            <td>{{ element.crypto_amount }}</td>
            <td>{{ element.money }}</td>
            <td>{{ element.datetime }}</td>
          </tr>
        </tbody>
      </table>
      

    </div>
  </template>
  
  <script>
  import lab3api from "@/services/lab3api.";
  import navbar from "@/components/NavBar.vue";
  import store from "@/store/store";
  import axios from "axios";
  
  export default {
    components: {
      navbar,
    },
    data() {
      return {
        history: null,
        loading: true,
        id: null,
        setIndex: 0,
        money: null,
        error: false,
      };
    },
    created() {
      const apiClient = axios.create({
        baseURL: "https://laboratorio3-f36a.restdb.io/rest",
        headers: { "x-apikey": "60eb09146661365596af552f" },
      });
  
      let json = {};
  
      apiClient
        .get(`/transactions?q={"user_id": "${store.state.id}"}`)
        .then((response) => {
          json = response.data;
          console.log(json);
          console.log("Data?");
          console.log(response.data);
          this.history = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
  
      console.log("pedioo esa");
    },
    setup() {
 
  
      const id = store.state.id;
      let json = [];
      const Delete = async () => {
        await lab3api.delete(id).then((response) => {
          console.log("eliminadoopaa", response);
        });
      };
  
      // Historial();
  
      return {
        json,
        //   Historial,
        Delete,
      };
    },
  };
  </script>