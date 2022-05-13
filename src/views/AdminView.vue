<template>
  <div>

    <div v-if="successMessage === true"class="alert alert-success" role="alert">
      {{'Andmed uuendatud'}}
    </div>

    <div class="col-md-6 col-sm-12 mx-auto">
      <div v-if="adminButtons" class="login-form">
        <button v-on:click="showNewLocationTable(), hideMessage()" type="submit" class="btn btn-outline-primary">Maakonnad</button>
        <button v-on:click="showNewFieldTable(), hideMessage()" type="submit" class="btn btn-outline-primary ">Lisa spordiklubi</button>
        <button v-on:click="showNewSportsTable(), hideMessage()" type="submit" class="btn btn-outline-primary ">Spordialad</button>
        <button v-on:click="showNewSportToFieldTable(), hideMessage()" type="submit" class="btn btn-outline-primary ">Lisa spordiklubi
          alad
        </button>
      </div>
      <br>
      <div>
        <div v-if="newLocationTableDiv" class="login-form">
          <div>
            <table class="table table-hover table-bordered table-striped">

              <thead>
              <tr class="table-hover table-success">
                <th scope="col">Maakond</th>
                <th scope="col">Maakonna eemaldamine</th>
              </tr>
              </thead>

              <tbody>
              <tr class="table-hover table-primary" v-for="location in allLocations">
                <td>{{ location.county }}</td>
                <td>
                  <button type="button" class="btn btn-danger" v-on:click="deleteLocation(location.id)">Eemalda
                    maakond
                  </button>
                </td>
              </tr>
              </tbody>

            </table>
          </div>
          <div v-if="hideNewLocationBar" class="form-group">
            <input type="text" v-model="locations.county" class="form-control" placeholder="Maakond">
          </div>
          <div v-if="locationRequestButtonDiv">
            <button v-on:click="addLocationRequest" type="submit" class="btn btn-success">Uue maakonna lisamine</button>
          </div>
          <div v-if="addLocationButtonDiv">
            <button v-on:click="addNewLocation() " type="submit" class="btn btn-success">Lisa maakond</button>
          </div>

          <br>
          <br>
        </div>

        <div v-if="newFieldTableDiv">
          <div>
            <table class="table table-hover table-bordered table-striped">

              <thead>
              <tr class="table-hover table-success">
                <th scope="col">Maakond</th>
                <th scope="col">Spordiklubi lisamine</th>
              </tr>
              </thead>

              <tbody>
              <tr class="table-hover table-primary" v-for="location in allLocations">
                <td>{{ location.county }}</td>
                <td>
                  <button type="button" class="btn btn-success" v-on:click="addNewFieldRequest(location.id)">Spordiklubi lisamine</button>
                </td>
              </tr>
              </tbody>
            </table>
            <div v-if="hideNewLocationBar" class="form-group">
              <input v-model="name" type="text" class="form-control" placeholder="Spordikeskuse nimi">
              <br>
              <button v-on:click="addNewField" type="submit" class="btn btn-success">Lisa spordiklubi</button>
            </div>
          </div>
        </div>

        <div v-if="newSportsTableDiv">
          <div class="form-group">
            <input type="text" v-model="sports.sportsType" class="form-control" placeholder="Spordiala">
          </div>
          <br>
          <button v-on:click="addNewSports" type="submit" class="btn btn-success">Lisa spordiala</button>
          <br>
          <br>
        </div>

        <div v-if="newSportToFieldDiv">
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
      </div>
      <div>
        <button v-on:click="logOut" class="btn btn-danger" type="submit">Logi välja</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminView",
  components: {},

  data: function () {
    return {
      locations: {},
      allLocations: {},
      newLocationTableDiv: false,
      newFieldTableDiv: false,
      newSportsTableDiv: false,
      newSportToFieldDiv: false,
      newAvailabilityDiv: false,
      adminButtons: true,
      hideNewLocationBar: false,
      locationRequestButtonDiv: true,
      addLocationButtonDiv: false,
      successMessage: false,
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
      selectedSportsId: 0,
      weekdays: {}

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
    hideMessage: function () {
      this.successMessage = false
      this.hideNewLocationBar = false
    },
    addNewLocation: function () {
      this.$http.post("/admin/location", this.locations
      ).then(response => {
        this.locations = response.data
        this.successMessage = 'Uus asukoht lisatud, maakond: ' + response.data.county + '.'
        this.newLocationTableDiv = false
        this.locationRequestButtonDiv = true
        this.hideNewLocationBar = false
        this.addLocationButtonDiv = false
        this.getAllLocations()
        this.successMessage = true
      }).catch(error => {
        console.log(error)
      })
    },
    deleteLocation: function (id) {
      this.$http.delete("/admin/id-location", {
        params: {
          id: id
        }
      }).then(response => {
        this.getAllLocations()
        this.deleteMessage = true
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    addLocationRequest: function () {
      this.hideNewLocationBar = true
      this.locationRequestButtonDiv = false
      this.addLocationButtonDiv = true

    },

    addNewField: function () {
      let newField = {
        locationId: this.locationId,
        name: this.name,
        isActive: this.isActive
      }
      this.$http.post("/fields", newField
      ).then(response => {
        this.getAllSportFields()
        this.successMessage = true
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    addNewFieldRequest: function (locationId) {
      this.hideNewLocationBar = true
      this.locationId = locationId
    },
    getAllLocations: function () {
      this.$http.get("/admin/all-locations")
          .then(response => {
            this.allLocations = response.data
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
        this.successMessage = true
        this.newSportsTableDiv = false
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

      this.$http.post("/fields/new-sportsfield", {}, {
            params: {
              sportsId: this.sportsId.id,
              fieldId: this.fieldId.id
            }
          }
      ).then(response => {
        this.successMessage= true
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
            this.sports = response.data
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
      this.fieldId = this.selectedFieldId
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