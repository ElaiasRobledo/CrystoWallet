<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-md navbar-light bg-lightborder-bottom p-3 mb-5 bg-body nav-border">
      <div class="container-fluid">
        <router-link to="/home" class="sintd">Home</router-link>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse"
        data-bs-target="#MenuNavegacion">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="MenuNavegacion" class="collapse navbar-collapse" aria-haspopup="true"
        aria-expanded="false">
          <ul class="navbar-nav ms-3">
            <router-link to="/purchase"><li class="nav-item"><a class="nav-link"
            href="#">Purchase</a></li></router-link>
            <router-link to="/sell"><li class="nav-item"><a class="nav-link"
            href="#">Sell</a></li></router-link>
            <router-link to="/history"><li class="nav-item"><a class="nav-link"
            href="#">History</a></li></router-link>
            <router-link to="/state"><li class="nav-item"><a class="nav-link"
            href="#">Current State</a></li></router-link>
          </ul>
        </div>
      </div>
      <ul class="navbar-nav ml-auto nav-flex-icons me-5">
        <li style="float:right"><router-link to="/">Log Out</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default{

}
</script>
<style scoped>
.nav-border{
  border-bottom: 2px solid rgb(46, 196, 81);
}
.container-fluid{
  background-color: rgb(33, 38, 46);
}
a.nav-link:hover{
  font-weight: bold;
  text-decoration: underline !important;
  text-decoration-color: rgb(46, 196, 81) !important;
}
a.nav-link{
  margin-right: 12px;
  margin-left: 12px;
  color: white !important;
  text-decoration: none !important;
}
.sintd{
  text-decoration: none;
  color: rgb(46, 196, 81);
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 6px;
  margin-right: 24px;
}

</style>