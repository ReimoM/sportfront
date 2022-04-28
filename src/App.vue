<template>
  <div  id="app"  >
    <nav >
      <button @click="$router.push('home')" class="btn btn-outline-primary" >Pealeht</button> |
      <button @click="$router.push('fields')" class="btn btn-outline-primary" >Vaata väljakuid</button> |
      <button @click="$router.push('booking')" class="btn btn-outline-primary" >Broneeri väljak</button> |
      <button @click="$router.push('login')" class="btn btn-outline-primary" >Sisselogimine</button> |
      <button @click="$router.push('user')" class="btn btn-outline-primary" >Kasutaja</button>
    </nav>
    <router-view/>
  </div>
</template>

<style>
body {
  background-image: url("https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-repeat: no-repeat;
  background-size: 2000px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #07080a;
/*  teksti värv*/
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #151508;
/*  Käsurea värv*/
}

nav a.router-link-exact-active {
  color: #f80000;
/*  aktiveeritud akna värk*/
}

/*nav li:hover,*/
/*nav li:active {*/
/*  background-color: #cb0f0f;*/
/*  cursor: pointer;*/
/*}*/

nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}
</style>
