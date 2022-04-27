<template>
  <div id="app">
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
  color: #0ecb24;
/*  Käsurea värv*/
}

nav a.router-link-exact-active {
  color: #cb0f0f;
/*  aktiveeritud akna värk*/
}
</style>
