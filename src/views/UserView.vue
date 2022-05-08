<template>
  <div>
    <h1>Siia aknasse tuled kui oled sisse loginud</h1>
    <button type="submit" class="btn btn-outline-primary m-3">Minu andmed</button>
    <button type="submit" class="btn btn-outline-primary">Minu broneeringud</button>
    <br>
    <br>
    <button type="submit" v-on:click="logOut" class="btn btn-outline-danger m-3">Logi välja</button>


  </div>
</template>

<script>
export default {
  name: "UserView",
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      contacts: {},

    }

  },
  methods: {
    logOut: function () {
      sessionStorage.clear()
      this.$router.push({name: 'homeRoute'})
    },
    userData: function () {
      this.$http.get("/contact/id", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.contacts = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>


</style>