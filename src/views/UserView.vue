<template>
  <div>
    <h1>Siia aknasse tuled kui oled sisse loginud</h1>
    <button type="submit" class="btn btn-outline-primary m-3">Minu andmed</button>
    <button type="submit" class="btn btn-outline-primary">Minu broneeringud</button>
    <br>
    <br>
    <div>
      <button type="submit" v-on:click="logOut" class="btn btn-outline-danger m-3">Logi välja
      </button>
    </div>


  </div>
</template>

<script>
export default {
  name: "UserView",
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
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
      sessionStorage.removeItem('userId')
    }
  }
}
</script>

<style scoped>


</style>