<template>
  <div id="app" >

    <nav class="btn-group" role="group" aria-label="Toolbar with button group">
      <button @click="$router.push('/')" class="btn btn-outline-primary" >Pealeht</button>
      <button @click="$router.push('fields')" class="btn btn-outline-primary" >Vaata väljakuid</button>
      <button @click="$router.push('booking')" class="btn btn-outline-primary" >Broneeri väljak</button>
      <button :title="getUserId() ? 'Olete sisseloginud' : 'Logi sisse'" :disabled="getUserId() > 0" @click="$router.push({name: 'loginRoute'})" class="btn btn-outline-primary" >Sisselogimine</button>
      <button :title="getUserId() ? '' : 'Logi sisse'" :disabled="!getUserId()" @click="$router.push('user')" class="btn btn-outline-primary" >Kasutaja</button>
      <button @click="$router.push('admin')" class="btn btn-outline-primary" >Admin</button>
    </nav>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    getUserId: function () {
      return sessionStorage.getItem('userId')

    }
  }
}

</script>

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
  color: #151508;
/*  Käsurea värv*/
}

nav a.router-link-exact-active {
  color: #f80000;
/*  aktiveeritud akna värk*/
}


</style>
