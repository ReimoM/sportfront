<template>
  <div>

    <div v-if="successMessage.length > 0"class="alert alert-primary" role="alert">
      {{successMessage}}
    </div>

    <div class="col-md-6 col-sm-12 mx-auto">
      <div v-if="adminButtons" class="login-form">
        <button v-on:click="showNewLocationTable" type="submit" class="btn btn-outline-primary" >Lisa asukoht</button>
        <button v-on:click="showNewFieldTable" type="submit" class="btn btn-outline-primary ">Lisa spordiklubi</button>
        <button v-on:click="showNewSportsTable" type="submit" class="btn btn-outline-primary ">Lisa spordiala</button>
        <button v-on:click="showNewSportToFieldTable" type="submit" class="btn btn-outline-primary ">Lisa spordiklubi alad</button>
        <button v-on:click="showFieldAvailabilityTable" type="submit" class="btn btn-outline-primary ">Lisa spordiväljaku lahtiolekuaeg</button>
      </div>
      <br>
      <div>
        <div v-if="newLocationTableDiv" class="login-form" >
          <div class="form-group">
            <input type="text" v-model="locations.county" class="form-control" placeholder="Asukoht">
          </div>
          <br>
          <button v-on:click="addNewLocation" type="submit" class="btn btn-success">Lisa asukoht</button>
          <br>
          <br>
        </div>

        <div v-if="newFieldTableDiv" >
            <div class="form-row align-items-centre">
              <div class="col-3 my-1 mx-auto">
                <label class="mr-sm-2 sr-only">Preference</label>
                <select v-model="selectedLocationId" v-on:change="getNewFieldLocation" class="custom-select mr-sm-2">
                  <option value="0" disabled selected>Vali asukoht</option>
                  <option v-for="location in locations" :value="location.id">{{ location.county }}</option>
                </select>
              </div>
            </div>
            <br>
            <input type="text" v-model="name" class="form-control" placeholder="Spordikeskuse nimi">
          <br>
          <button v-on:click="addNewField" type="submit" class="btn btn-success">Lisa spordiklubi</button>
          <br>
          <br>
        </div>

        <div v-if="newSportsTableDiv" >
          <div class="form-group">
            <input type="text" v-model="sports.sportsType" class="form-control" placeholder="Spordiala">
          </div>
          <br>
          <button v-on:click="addNewSports" type="submit" class="btn btn-success">Lisa spordiala</button>
          <br>
          <br>
        </div>

        <div v-if="newSportToFieldDiv" >
          <div class="form-row align-items-centre">
            <div class="col-3 my-1 mx-auto">
              <label class="mr-sm-2 sr-only">Preference</label>
              <select v-model="selectedSportsId" v-on:change="getNewSportsId" class="custom-select mr-sm-2">
                <option value="0" disabled selected>Vali spordiala</option>
                <option v-for="sport in sports" :value="sport.id">{{ sport.sportsType }}</option>
              </select>
            </div>
          </div>
          <br>
          <div class="form-row align-items-centre">
            <div class="col-3 my-1 mx-auto">
              <label class="mr-sm-2 sr-only">Preference</label>
              <select v-model="selectedFieldId" v-on:change="getNewFieldId" class="custom-select mr-sm-2">
                <option value="0" disabled selected>Vali väljak</option>
                <option v-for="field in fields" :value="field.id">{{ field.name }}</option>
              </select>
            </div>
          </div>
          <br>
          <button v-on:click="addNewSportToField" type="submit" class="btn btn-success">Lisa spordiväljak</button>
          <br>
          <br>
        </div>
        <div v-if="newAvailabilityDiv" >
          <div class="form-row align-items-centre">
            <div class="col-3 my-1 mx-auto">
              <label class="mr-sm-2 sr-only">Preference</label>
              <select v-model="selectedLocationId" v-on:change="getNewField" class="custom-select mr-sm-2">
                <option value="0" disabled selected>Vali asukoht</option>
                <option v-for="location in locations" :value="location.id">{{ location.county }}</option>
              </select>
            </div>
          </div>
          <br>
          <input type="text" v-model="name" class="form-control" placeholder="Spordikeskuse nimi">
          <br>
          <button v-on:click="addNewField" type="submit" class="btn btn-success">Lisa lahtiolekuaeg</button>
          <br>
          <br>
        </div>
      </div>
      <div >
        <button v-on:click="logOut" class="btn btn-danger" type="submit">Logi välja</button>
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
      newFieldTableDiv: false,
      newSportsTableDiv: false,
      newSportToFieldDiv: false,
      newAvailabilityDiv: false,
      adminButtons: true,
      successMessage: '',
      fields: {},
      locationId: '',
      selectedLocationId: 0,
      name: '',
      isActive: true,
      sports: {},
      sportsField: {},
      fieldId: '',
      selectedFieldId: 0,
      sportsId: '',
      selectedSportsId: 0

    }
  },

  methods: {
    showNewLocationTable: function () {
      this.newLocationTableDiv = true
      this.newFieldTableDiv = false
      this.newSportsTableDiv = false
      this.newSportToFieldDiv = false
      this.newAvailabilityDiv = false
    },
    showNewFieldTable: function () {
      this.newFieldTableDiv = true
      this.newLocationTableDiv = false
      this.newSportsTableDiv = false
      this.newSportToFieldDiv = false
      this.newAvailabilityDiv = false
    },
    showNewSportsTable: function () {
      this.newSportsTableDiv = true
      this.newLocationTableDiv = false
      this.newFieldTableDiv = false
      this.newSportToFieldDiv = false
      this.newAvailabilityDiv = false
    },
    showNewSportToFieldTable: function () {
      this.newSportToFieldDiv = true
      this.newSportsTableDiv = false
      this.newLocationTableDiv = false
      this.newFieldTableDiv = false
      this.newAvailabilityDiv = false
    },
    showFieldAvailabilityTable: function () {
      this.newAvailabilityDiv = true
      this.newSportToFieldDiv = false
      this.newSportsTableDiv = false
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
    getNewFieldLocation: function () {
      this.locationId = this.selectedLocationId
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
    getAllLocations: function () {
      this.$http.get("/admin/all-locations")
          .then(response => {
            this.locations = response.data
            this.selectedLocationId = this.locationId
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },
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
    getAllSportFields: function () {
      this.$http.get("/fields/all-fields")
          .then(response => {
            this.fields = response.data
            this.selectedFieldId = this.fieldId
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },
    addNewSportToField: function () {
      let sportsFields = {
        sportsId: this.sportsId.id,
        fieldId: this.fieldId.id,

      }
      this.$http.post("/fields/new-sportsfield", sportsFields
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getSportsId: function () {
      this.$http.get("/admin/sports-id", {
            params: {
              id: this.sportsId
            }
          }
      ).then(response => {
        this.sportsId = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getAllSports: function () {
      this.$http.get("/admin/all-sports")
          .then(response => {
            this.sports= response.data
            this.selectedSportsId = this.sportsId
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },
    getNewSportsId: function () {
      this.sportsId = this.selectedSportsId
      this.getSportsId()
    },
    getFieldById: function () {
      this.$http.get("/fields/field-id", {
            params: {
              id: this.fieldId
            }
          }
      ).then(response => {
        this.fieldId = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getNewFieldId: function () {
      this.fieldId= this.selectedFieldId
      this.getFieldById()
    },

  },
  mounted() {
    this.getAllLocations()
    this.getSportsId()
    this.getFieldById()
    this.getAllSportFields()
    this.getAllSports()
  }
}
</script>

<style scoped>

</style>