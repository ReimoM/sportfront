<template>
  <div id="app" >
    <nav>
      <router-link to="/home">Pealeht</router-link> |
      <router-link to="/fields">Vaata väljakuid</router-link> |
      <router-link to="/booking">Broneeri väljak</router-link> |
      <router-link to="/login">Sisselogimine</router-link> |
      <router-link to="/user">Kasutaja</router-link>
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
</style>
