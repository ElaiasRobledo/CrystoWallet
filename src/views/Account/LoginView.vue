
<template>
  <section class="vh-100" style="background-color: #eee;">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4">
                 <div class="container">
                    <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div class="form-outline mb-4">
                                <input type="text" id="form2Example1" class="form-control" v-model="username" placeholder="Username..."/>
                            </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline mb-4">
                                <input type="text" id="form2Example2" class="form-control" v-model="password" placeholder="Password..."/>
                            
                            </div>
                    </div>

                        <!-- Submit button -->
                        <button type="button" class="btn btn-primary btn-block mb-4" v-show="!error" @click="login" >Sign in</button>

                        <!-- Register buttons -->
                        <div class="text-center">
                            <p>Not a member? <router-link to="/register">Register</router-link></p>
                        
                        </div>
                                    
                </div>
                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

            
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
//import store from '@/store/store';
import { useStore } from 'vuex';
import {  computed, ref} from 'vue';
import router from '@/router';

//import { useStore } from 'vuex';

export default{
    setup() {
        const username = ref('')
        const password = ref('')
        const store = useStore();
       
        const login = () => {
            store.commit('setId',username.value);
            store.commit('setPassword',password.value)

            console.log('Logged in:', store.state.id);
            router.push('/home')
            
         };
         
         const error = computed(()=>{
            console.log('error')
            return username.value == '' || password.value == '';
         })
      
        console.log(username.value)
        console.log(store.state.password)
    return {
        username,
        password,
        error,
        login
    };
  }

}

</script>
<style>
.container{
    display:grid ;
    padding: 6%;

}
.card{
    padding: 5%;
}
</style>