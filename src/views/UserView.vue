<template>
  <div>

    <div>
    <h1>Siia aknasse tuled kui oled sisse loginud</h1>
    <button type="submit" class="btn btn-outline-primary m-3">Minu andmed</button>
    <button type="submit" class="btn btn-outline-primary" v-on:click="hideTableDiv">Minu broneeringud</button>
    <br>

      <div v-if="tableDivDisplay">
        <table class="table table-hover table-bordered table-striped">

          <thead>
          <tr class="table-hover table-success">
            <th scope="col">#</th>
            <th scope="col">Väljak</th>
            <th scope="col">Sport</th>
            <th scope="col">Kuupäev</th>
            <th scope="col">Broneeringu algus</th>
            <th scope="col">Broneeringu lõpp</th>
          </tr>
          </thead>

          <tbody>
          <tr class="table-hover table-primary" v-for="booking in bookings">
            <th scope="row">*</th>
            <td>{{booking.sportsFieldName}}</td>
            <td>{{booking.sportsType}}</td>
            <td>{{booking.date}}</td>
            <td>{{booking.startTimeHour}}</td>
            <td>{{booking.endTimeHour}}</td>
          </tr>
          </tbody>

        </table>

    <br>
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
      tableDivDisplay: false,
      newUserDisplay: false

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

    hideTableDiv: function () {
      this.tableDivDisplay = true;
    },

    displayTableDiv: function () {
      this.tableDivDisplay = true;
    }



  },

  mounted() {
    this.getMyBookings()
  }

}


</script>

<style scoped>


</style>