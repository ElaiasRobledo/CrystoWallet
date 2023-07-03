
<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 d-flex align-items-center justify-content-center flex-column order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

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
                                <input type="password" id="form2Example2" class="form-control" v-model="password" placeholder="Password..."/>
                            
                            </div>
                    </div>

                        <!-- Submit button -->
                        <button type="button" class="btn btn-primary btn-block mb-4 greenButton" v-show="!error" @click="login" >Sign in</button>

                        <!-- Register buttons -->
                        <div class="text-center">
                            <p>Not a member? <router-link class="greenLink" to="/register">Register</router-link></p>
                        
                        </div>
                                    
                </div>
                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://www.cronista.com/files/image/427/427823/61f4c0fa20101_360_480!.webp?s=98e116e8637c1f41b0265f05dbfa7eab&d=1643662891&oe=jpg"
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
import { ref} from 'vue';
import router from '@/router';
export default{
    setup() {
        const username = ref('')
        const password = ref('')
        const store = useStore();
        const usernameusado = store.state.id;
        const paswordusada = store.state.password;
       
        const login = () => {
          if(password.value != paswordusada || username.value != usernameusado ){
            
              console.log("los datos no coinciden")
          }
          else{
            
            console.log('Logged in:', store.state.id);
            router.push('/home')
            
          }

         };
         
    return {
        username,
        password,
        login
    };
  }

}

</script>
<style scoped>
.container{
    display:grid ;
    padding: 6%;

}
.card {
  background-color: rgb(46, 53, 65);
  border-radius: 25px;
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