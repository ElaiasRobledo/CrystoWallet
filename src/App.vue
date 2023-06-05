<template>
  
  <HomeView/>
 
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
//import store from './store/store'

import HomeView from '../src/views/HomeView.vue'

export default {
  name: 'App',
  components: {
    HomeView
  },

  setup(){
    
    const store = useStore();
    const user = ref({
      userId: store.commit('Elias'),
    });
 
    console.log("asdsad")
    computed(()=>store.state.Id)
    console.log(onMounted(()=>store.state.Id))
    console.log('ID asignado:', store.state.Id);
    console.log("Hola:",user)
  //put validations
  }
}
</script>
