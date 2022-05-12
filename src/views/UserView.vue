<template>
  <div>

    <div>
    <h1>Siia aknasse tuled kui oled sisse loginud</h1>
    <button type="submit" class="btn btn-outline-primary m-3" v-on:click="displayTableDiv">Minu andmed</button>
    <button type="submit" class="btn btn-outline-primary" v-on:click="hideTableDiv">Minu broneeringud</button>
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
          </tr>
          </thead>

          <tbody>
          <tr class="table-hover table-primary" v-for="booking in bookings">
            <td>{{booking.sportsFieldName}}</td>
            <td>{{booking.sportsType}}</td>
            <td>{{booking.date}}</td>
            <td>{{booking.startTimeHour}}</td>
            <td>{{booking.endTimeHour}}</td>
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
        <br>






        <button type="submit" v-on:click="hideAllTables" class="btn btn-outline-primary m-3">Muuda andmeid</button>

        <div class="col-md-3 col-sm-12 mx-auto">

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
          <button v-on:click="updateUser" type="submit" class="btn btn-success">Uuenda andmed</button>
        </div>


      </div>

    <br>
      <div>
    <button type="submit" v-on:click="logOut" class="btn btn-outline-danger m-3">Logi välja</button>

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
      contactDisplay: false

    }

  },


  methods: {
    logOut: function () {
      sessionStorage.clear()
      this.$router.push({name: 'homeRoute'})
    },
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
        this.$router.push('user')
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

    }



  },

  mounted() {
    this.getMyBookings()
    this.userData()
  }

}


</script>

<style scoped>


</style>