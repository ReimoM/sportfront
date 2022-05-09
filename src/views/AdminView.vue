<template>
  <div>
    <div class="col-md-3 col-sm-12 mx-auto">
      <div v-if="adminButtons" class="login-form">
        <button v-on:click="showNewLocationTable" type="submit" class="btn btn-outline-primary m-3" >Lisa asukoht</button>
        <button type="submit" class="btn btn-outline-primary m-3">Lisa väljak</button>
        <button type="submit" class="btn btn-outline-primary m-3">Lisa spordiala</button>
      </div>
      <br>
      <div>
        <div v-if="newLocationTableDiv" class="login-form">
          <div class="form-group">
            <input type="text" v-model="locations.county" class="form-control" placeholder="Asukoht">
          </div>
          <button v-on:click="addNewLocation" type="submit" class="btn btn-success">Lisa asukoht</button>
          <br>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminView",
  data: function () {
    return {
      locations: {},
      newLocationTableDiv: false,
      adminButtons: true
    }
  },

  methods: {
    showNewLocationTable: function () {
      this.newLocationTableDiv = true
    },

    addNewLocation: function () {
      this.$http.post("/location", this.locations
      ).then(response => {
        this.locations = response.data
        this.successMessage = 'Uus asukoht lisatud, maakond: ' + response.data.locations + '.'

      }).catch(error => {
        console.log(error)
      })
    },

  }
}
</script>

<style scoped>

</style>