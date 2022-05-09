<template>
  <div>

    <h1>Siia tuleb väljaku broneerimine</h1>
    <form>
      <div class="form-row align-items-centre">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only">Preference</label>
          <select v-model="selectedFieldId" v-on:change="getNewSportFields" class="custom-select mr-sm-2">
            <option value="0" selected>Vali väljak</option>
            <option v-for="field in fields" :value="field.id">{{ field.name }}</option>
          </select>
        </div>
      </div>
    </form>
    <br>
    <form>
      <div class="form-row align-items-center">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only">Preference</label>
          <select v-model="selectedSportsFieldId" class="custom-select mr-sm-2">
            <option value="0">Vali spordiala</option>
            <option v-for="sportField in sportFields" :value="sportField.id">{{ sportField.sportsSportsType }}</option>
          </select>
        </div>
      </div>
    </form>
    <br>
    <form>
      <div class="col-3 my-1 mx-auto">
        <label class="mr-sm-2 sr-only">Preference</label>
        <input v-model="date" type="date" name="" id="">
      </div>
    </form>
    <br>
    <button type="submit" class="btn btn-primary" v-on:click="availableBookingTimes">Näita kellaaegu valitud kuupäeval
    </button>
    <form>
      <br>
      <br>
      <div class="form-row align-items-center">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only">Preference</label>
          <select v-model="availableTimesForField"  class="custom-select mr-sm-2">
            <option value="0">Vali kellaaeg</option>
            <option v-for="availableTime in availableTimes" :value="availableTime.id">{{ availableTime.timeSlotInfo }}</option>
          </select>
        </div>
      </div>
      <br>
      <button type="submit" class="btn btn-primary" v-on:click="confirmBooking">Broneeri</button>
    </form>


  </div>
</template>

<script>

export default {
  name: "NewBookingView",
  data: function () {
    return {
      fields: {},
      fieldId: sessionStorage.getItem('fieldId'),
      sportFields: {},
      selectedFieldId: 0,
      selectedSportsFieldId: 0,
      availableTimes: {},
      availableTimesForField: 0,
      date: {},
      bookedFields: {},
      timeSlot: {}

    }

  },
  methods: {
    getAllFields: function () {
      this.$http.get("/field/all")
          .then(response => {
            this.fields = response.data
            this.selectedFieldId = this.fieldId
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    },
    getNewSportFields: function () {
      this.fieldId = this.selectedFieldId
      this.getSportfields()
    },
    getTimeSlot: function () {
      this.availableTimes= this.availableTimesForField

    },
    getSportfields: function () {
      this.$http.get("/sportsfield/fieldId", {params: {fieldId: this.fieldId}}
      ).then(response => {
        this.sportFields = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    availableBookingTimes: function () {
      let bookingInfo = {
        fieldId: this.fieldId,
        date: this.date
      }
      this.$http.post("/field-booking", bookingInfo
      ).then(response => {
        this.availableTimes = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    confirmBooking: function () {
      let bookingConfirmation = {
        userId: sessionStorage.getItem('userId'),
        fieldId: this.fieldId,
        date: this.date,

      }

      this.$http.post("/field-booking/new", bookingConfirmation
      ).then(response => {
        this.bookedFields = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }


  },
  mounted() {
    this.getAllFields();
    this.getSportfields();
    // this.availableBookingTimes()

  }
}
</script>

<style scoped>


</style>