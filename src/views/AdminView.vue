<template>
  <div>

    <div v-if="successMessage.length > 0"class="alert alert-primary" role="alert">
      {{successMessage}}
    </div>

    <div class="col-md-3 col-sm-12 mx-auto">
      <div v-if="adminButtons" class="login-form">
        <button v-on:click="showNewLocationTable" type="submit" class="btn btn-outline-primary m-3" >Lisa asukoht</button>
        <button v-on:click="showNewFieldTable" type="submit" class="btn btn-outline-primary m-3">Lisa väljak</button>
        <button v-on:click="showNewSportsTable" type="submit" class="btn btn-outline-primary m-3">Lisa spordiala</button>
      </div>
      <br>
      <div>
        <div v-if="newLocationTableDiv" class="login-form">
          <div class="form-group">
            <input type="text" v-model="locations.county" class="form-control" placeholder="Asukoht">
          </div>
          <br>
          <button v-on:click="addNewLocation" type="submit" class="btn btn-success">Lisa asukoht</button>
          <br>
          <br>
        </div>

<!--        <div class="form-row align-items-centre">-->
<!--          <div class="col-3 my-1 mx-auto">-->
<!--            <label class="mr-sm-2 sr-only">Preference</label>-->
<!--            <select v-model="selectedLocationId" v-on:change="getNewSportFields" class="custom-select mr-sm-2">-->
<!--              <option value="0" disabled selected>Vali asukoht</option>-->
<!--              <option v-for="location in locations" :value="location.id">{{ field.name }}</option>-->
<!--            </select>-->
<!--          </div>-->
<!--        </div>-->

        <div v-if="newFieldTableDiv" class="login-form">
          <div class="form-group">
            <input type="text" v-model="locationId" class="form-control" placeholder="Asukoha ID">
            <br>
            <input type="text" v-model="name" class="form-control" placeholder="Spordikeskuse nimi">
          </div>
          <br>
          <button v-on:click="addNewField" type="submit" class="btn btn-success">Lisa spordiklubi</button>
          <br>
          <br>
        </div>

        <div v-if="newSportsTableDiv" class="login-form">
          <div class="form-group">
            <input type="text" v-model="sports.sportsType" class="form-control" placeholder="Spordiala">
          </div>
          <br>
          <button v-on:click="addNewSports" type="submit" class="btn btn-success">Lisa spordiala</button>
          <br>
          <br>
        </div>
      </div>
    </div>
    <div>
      <button v-on:click="logOut" class="btn btn-danger" type="submit">Logi välja</button>
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
      newFieldTableDiv: false,
      newSportsTableDiv: false,
      adminButtons: true,
      successMessage: '',
      fields: {},
      locationId: '',
      name: '',
      isActive: true,
      sports: {}

    }
  },

  methods: {
    showNewLocationTable: function () {
      this.newLocationTableDiv = true
      this.newFieldTableDiv = false
      this.newSportsTableDiv = false
    },

    showNewFieldTable: function () {
      this.newFieldTableDiv = true
      this.newLocationTableDiv = false
      this.newSportsTableDiv = false
    },

    showNewSportsTable: function () {
      this.newSportsTableDiv = true
      this.newLocationTableDiv = false
      this.newFieldTableDiv = false
    },

    addNewLocation: function () {
      this.$http.post("/admin/location", this.locations
      ).then(response => {
        this.locations = response.data
        this.successMessage = 'Uus asukoht lisatud, maakond: ' + response.data.county + '.'
        this.newLocationTableDiv = false
        this.$router.push({name: 'adminRoute'})
      }).catch(error => {
        console.log(error)
      })
    },

    addNewField: function () {
      let newField = {
        locationId: this.locationId,
        name: this.name,
        isActive: this.isActive
      }
      this.$http.post("/fields", newField
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    //todo: addNewField meetod ei tööta, peab üle vaatama

    // addNewField: function () {
    //   this.$http.post("/fields", this.fields
    //   ).then(response => {
    //     this.fields = response.data
    //     this.successMessage = 'Uus klubi lisatud: ' + response.data.name + '.'
    //     this.newLocationTableDiv = false
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
    logOut: function () {
      sessionStorage.clear()
      this.$router.push({name: 'homeRoute'})
    },

    addNewSports: function () {
      this.$http.post("/admin/sports", this.sports
      ).then(response => {
        this.sports = response.data
        this.successMessage = 'Uus spordiala lisatud. Spordiala: ' + response.data.sportsType + '.'
        this.newSportsTableDiv = false
        this.$router.push({name: 'adminRoute'})

      }).catch(error => {
        console.log(error)
      })
    },

  }
}
</script>

<style scoped>

</style>