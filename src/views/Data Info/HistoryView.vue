<template>
    <div>
      <navbar></navbar>
      <table class="table table-striped">
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
                <tr v-for="(element, index) in this.json" :key="index">
                    <th scope="row">{{ element.crypto_code }}</th>
                        <td>{{ element.crypto_amount }}</td>
                        <td>{{ element.money }}</td>
                        <td>{{ element.datetime }}</td>
                    </tr>
                </tbody>
            </table>
            <p>martin</p>
            <button type="succes" @click="Historial"></button>
    </div>
  </template>

<script>

import lab3api from '@/services/lab3api.';
import navbar from '@/components/NavBar.vue'
import store from '@/store/store';


export default {
    components:{
    navbar,
    },
    data(){

        return{
            history: null,
            loading: true,
            id: null,
            setIndex: 0,
            money: null,
            error: false,
        }
    },
    setup(){
        
        let json = {}
        const Historial =  () =>{
            console.log('pidiendoo')
            lab3api.getHistorial().then((response)=>{
            json = response.data;
            console.log(json)
            console.log(response.data) 
           })
           console.log('pedioo esa')
        }
                

        const id = store.state.id;
        
        const Delete = async () =>{
            await lab3api.delete(id).then((response)=>{
                console.log('eliminadoopaa',response)
            })
        }
        
        //Historial();
        
        return{
            json,
            Historial,
            Delete
        }
    }
}
</script>