<template>
  <div>

    <div>
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
            <td>{{ booking.sportsFieldName }}</td>
            <td>{{ booking.sportsType }}</td>
            <td>{{ booking.date }}</td>
            <td>{{ booking.startTimeHour }}</td>
            <td>{{ booking.endTimeHour }}</td>
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
            <td>{{ contacts.firstName }}</td>
            <td>{{ contacts.lastName }}</td>
            <td>{{ contacts.telephone }}</td>
            <td>{{ contacts.email }}</td>

          </tr>
          </tbody>
        </table>
      </div>
      <br>
      <div>
        <button type="submit" v-on:click="logOut" class="btn btn-danger m-3">Logi välja</button>
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

    hideTableDiv: function () {
      this.tableDivDisplay = true
      this.contactDisplay = false

    },

    displayTableDiv: function () {
      this.tableDivDisplay = false
      this.contactDisplay = true

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