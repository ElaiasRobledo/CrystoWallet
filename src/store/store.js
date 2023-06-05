import {createStore} from 'vuex'


export default createStore({
     state:{
         Id: 'Pepe'//localStorage.Id
     },
     mutations:{
        newId(state){
            state.Id ='Elias'
        }
     },
     
     actions:{

     }
 })