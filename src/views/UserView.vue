<template>
  <div>
    <h1>Siia aknasse tuled kui oled sisse loginud</h1>
    <button type="submit" class="btn btn-outline-primary m-3">Minu andmed</button>
    <button type="submit" class="btn btn-outline-primary">Minu broneeringud</button>
    <br>
    <br>
    <button type="submit" v-bind:disabled="logOut" v-on:click="logOut" class="btn btn-outline-danger m-3">Logi välja</button>


  </div>
</template>

<script>
export default {
  name: "UserView",
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      logOut: {}
    }

  },
  methods: {
    someMethodName: function () {
      this.$http.get("/some/path")
          .then(response => {
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },
    logOut: function () {
      if (sessionStorage.getItem('userId')=== null) {
        this.logOut = true
      } else {
        this.logOut = false
      }
    }
  }
}
</script>

<style scoped>


</style>