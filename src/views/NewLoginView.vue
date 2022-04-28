<template>
  <div>
    <h3>Sisselogimiseks täida väljad</h3>

    <br>
    <input type="text" placeholder="kasutajanimi" v-model="firstname">
    <br>
    <br>
    <input type="text" placeholder="parool" v-model="password">
    <br>
    <br>
    <button v-on:click="saveDataToSessionStorage" type="button" class="btn btn-success m-3">Logi sisse</button>
  </div>
</template>

<script>
export default {
  name: "NewLoginView",
  data: function () {
    return {
      username: '',
      password:''
    }
  },
  methods: {
    saveDataToSessionStorage: function () {
      sessionStorage.setItem('username', this.user.username)
      sessionStorage.setItem('password', this.user.password)
      sessionStorage.setItem('user', JSON.stringify(this.user))

    }

  }
}
</script>

<style scoped>

</style>