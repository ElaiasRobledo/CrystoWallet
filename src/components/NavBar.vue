<template>
  <div class="container-fluid">
    <ul>
      <li> <router-link to="/home">Home</router-link></li>
      <li><router-link to="/purchase">Purchase</router-link></li>
      <li><router-link to="/sell">Sell</router-link></li>
      <li style="float:right"><router-link to="/">Log Out</router-link></li>
    </ul>
  
  </div>
</template>

<script>
export default{

}
</script>
<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  font-family:Verdana;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #00ff2a60;
}
</style>