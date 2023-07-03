<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-12 col-xl-11">
        <div class="card">
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">If you are new we will give you <b style="color: greenyellow;">$100,000!</b></p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control" placeholder="Username..." v-model="username"/>
                      <label class="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" placeholder="Email..." class="form-control" v-model="email" />
                      <label class="form-label" for="form3Example3c" >Your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" placeholder="Password..." class="form-control" v-model="validatePassword" />
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" placeholder="Password..." class="form-control" v-model="password" />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>
                  <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="validatePassword != password" >
                    <strong>Password doesn't match</strong> 
                  </div>
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4" v-else>
                    <button type="button" class="btn btn-primary btn-lg w-100 greenButton" @click="register">Register</button>
                  </div >
                  
                </form>
                <p class="text-center text-muted mt-5 mb-0">Have already an account? <router-link class="greenLink" to=/><u>Login here</u></router-link></p>
              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                
                <img src="https://e0.pxfuel.com/wallpapers/428/290/desktop-wallpaper-bitcoin-iphone-thumbnail.jpg"
                class="img-fluid" alt="Sample image">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useStore } from 'vuex';
import {ref} from 'vue'
import router from '@/router';

export default{
  setup(){


      const username = ref('')
      const email = ref('')
      const validatePassword = ref('')
      const password = ref('')
      const store = useStore();
      let gift = ref(100000);
      const wasregistered = ref(false);

      const register = () => {
        if(username.value == '' || password.value == ''|| email.value == '' || validatePassword.value == '' ){
          console.log('no pueden quedar datos vacios')
        }else{
          if(password.value != validatePassword.value){
            console.log('las contraseñas no coinciden')

          }else{
            store.commit('setId',username.value);
            store.commit('setPassword',password.value)
            store.commit('setGiftMoney',gift.value)
            console.log('Logged in:', store.state.id);
            console.log('plata de entrada', gift.value)
            router.push('/home')
            wasregistered.value = true;
          }
        }
      }
      return{
          username,
          password,
          email,
          wasregistered,
          validatePassword,
          register
        }   
  }
}
</script>
<style scoped>
.card {
  margin-top:36px;
  background-color: rgb(46, 53, 65);
  border-radius: 25px;

}
.container{
  height: 100vh;
  padding: 0px;

}
html{
  height: 100%;
}
.greenButton{
  background-color: rgb(46, 196, 81);
  border-color: rgb(46, 196, 81); 
}
.greenButton:hover{
  background-color: rgb(30, 129, 53);
  border-color: rgb(30, 129, 53); 

}
.greenLink{
  color: rgb(46, 196, 81); 
}
.greenLink:hover{
  color: rgb(30, 129, 53); 
}
</style>