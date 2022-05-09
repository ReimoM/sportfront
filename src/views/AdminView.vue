<template>
  <div >

    <div  >
      <div >
      <button type="submit" v-on:click="showNewLocationTable" class="btn btn-outline-primary m-3">Lisa asukoht</button>
      <button type="submit" class="btn btn-outline-primary m-3">Lisa väljak</button>
      <button type="submit" class="btn btn-outline-primary m-3">Lisa spordiala</button>
      <br>
      <br>
      <button type="submit" v-on:click="logOut" class="btn btn-outline-danger m-3">Logi välja</button>
      </div>
    </div>

    <div>
      <div v-if="newLocationTableDiv" class="login-form">
        <div class="form-group">
          <input type="text" v-model="locations.county" class="form-control" placeholder="Maakond">
        </div>

        <button v-on:click="addNewLocation" type="submit" class="btn btn-success">Lisa asukoht</button>
        <br>
        <br>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "AdminView",

  data: {
    locations: {},
    newLocationTableDiv: false,
    adminButtons: true
  },

  methods: {
    showNewLocationTable: function () {
      this.newLocationTableDiv = true
      this.adminButtons = false
    },

    addNewLocation: function () {
      this.$http.post("/location", this.locations
      ).then(response => {
        this.successMessage = 'Uus asukoht lisatud, maakond: ' + response.data.location + '.'

      }).catch(error => {
        console.log(error)
      })
    },

  }
}
</script>

<style scoped>

</style>