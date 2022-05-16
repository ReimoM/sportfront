<template>
  <div>

    <div v-if="successMessage === true"class="alert alert-success" role="alert">
      {{'Andmed uuendatud'}}
    </div>
    <div v-if="deleteMessage === true"class="alert alert-danger" role="alert">
      {{'Broneering eemaldatud'}}
    </div>

    <div>
    <button type="submit" class="btn btn-outline-primary m-3" v-on:click="displayTableDiv(), showButton(), hideMessage()">Minu andmed</button>
    <button type="submit" class="btn btn-outline-primary" v-on:click="hideTableDiv(), hideMessage()">Minu broneeringud</button>
    <br>

      <div v-if="tableDivDisplay">
        <table class="table table-hover table-bordered table-striped">

          <thead>
          <tr class="table-hover table-success">
            <th scope="col">Väljak</th>
            <th scope="col">Sport</th>
            <th scope="col">Kuupäev</th>
            <th scope="col">Broneeringu algus</th>
            <th scope="col">Broneeringu lõpp</th>
            <th scope="col">Broneeringu eemaldamine</th>
          </tr>
          </thead>

          <tbody>
          <tr class="table-hover table-primary" v-for="booking in bookings">
            <td>{{booking.sportsFieldName}}</td>
            <td>{{booking.sportsType}}</td>
            <td>{{booking.date}}</td>
            <td>{{booking.startTimeHour}}</td>
            <td>{{booking.endTimeHour}}</td>
            <td><button type="button" class="btn btn-outline-danger" v-on:click="deleteBooking(booking.fieldBookingId)">Eemalda broneering</button></td>
          </tr>
          </tbody>

        </table>
      </div>

      <div v-if="contactDisplay">
        <table class="table table-hover table-bordered table-striped">

          <thead>
          <tr class="table-hover table-success">
            <th scope="col">Eesnimi</th>
            <th scope="col">Perekonna nimi</th>
            <th scope="col">Telefon</th>
            <th scope="col">Email</th>

          </tr>
          </thead>

          <tbody>
          <tr class="table-hover table-primary">
            <td>{{contacts.firstName}}</td>
            <td>{{contacts.lastName}}</td>
            <td>{{contacts.telephone}}</td>
            <td>{{contacts.email}}</td>

          </tr>
          </tbody>

        </table>
        <br>

        <div v-if="buttonDisplay">
          <button type="submit" v-on:click="hideAllTables(), showSubmissionForm(), hideButton()" class="btn btn-outline-primary m-3">Muuda andmeid</button>
        </div>



        <div class="col-md-3 col-sm-12 mx-auto" v-if="formDisplay">

          <div class="form-group">
            <input type="text" v-model="newUserInfo.firstName" class="form-control" placeholder="Eesnimi">
          </div>
          <div class="form-group">
            <input type="text" v-model="newUserInfo.lastName" class="form-control" placeholder="Perekonnanimi">
          </div>
          <div class="form-group">
            <input type="text" v-model="newUserInfo.telephone" class="form-control" placeholder="Telefon">
          </div>
          <div class="form-group">
            <input type="text" v-model="newUserInfo.email" class="form-control" placeholder="E-mail">
          </div>


          <br>
          <button v-on:click="updateUser(); hideSubmissionForm()" type="submit" class="btn btn-success">Uuenda andmed</button>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
export default {
  name: "UserView",
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      contacts: {},
      bookings: [],
      booking: {},
      newUserInfo: {},
      tableDivDisplay: false,
      contactDisplay: false,
      formDisplay: false,
      buttonDisplay: true,
      successMessage: false,
      deleteMessage: false,

    }

  },
  methods: {
    userData: function () {
      this.$http.get("/id", {
            params: {
              id: this.userId
            }
          }
      ).then(response => {
        this.contacts = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    hideMessage: function () {
      this.successMessage = false
      this.deleteMessage = false
    },


    getMyBookings: function () {
      this.$http.get("/field-booking/id", {
        params: {
          userId: this.userId
        }
      })
          .then(response => {
            this.bookings = response.data
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },

    updateUser: function () {
      this.$http.put("/id", this.newUserInfo, {
        params: {
          userId: this.userId
        }
      }
      ).then(response => {
        this.successMessage = true
        this.userData()
        console.log(response.data)

      }).catch(error => {
        console.log(error)
      })
    },
    deleteBooking: function (fieldBookingId) {
      this.$http.delete("/field-booking/id", {
        params: {
          id: fieldBookingId
        }
      }).then(response => {
        this.getMyBookings()
        this.deleteMessage= true
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    hideTableDiv: function () {
      this.tableDivDisplay = true
      this.contactDisplay = false

    },

    displayTableDiv: function () {
      this.tableDivDisplay = false
      this.contactDisplay = true

    },

    hideAllTables: function () {
      this.tableDivDisplay = false
      this.contactDisplay = false

    },

    hideSubmissionForm: function () {
      this.formDisplay = false
      this.buttonDisplay = false
      this.contactDisplay = false
    },

    showSubmissionForm: function () {
      this.formDisplay = true
      this.buttonDisplay = true
      this.contactDisplay = true
    },

    hideButton: function () {
      this.buttonDisplay = false
    },

    showButton: function () {
      this.buttonDisplay = true
    },

  },

  mounted() {
    this.getMyBookings()
    this.userData()
  }

}


</script>

<style scoped>


</style>