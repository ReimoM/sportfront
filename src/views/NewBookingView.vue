<template>
  <div>

    <h3>Alustamiseks valige spordiväljak</h3>
    <div class="form-row align-items-centre">
      <div class="col-3 my-1 mx-auto">
        <label class="mr-sm-2 sr-only">Preference</label>
        <select v-model="selectedFieldId" v-on:change="getNewSportFields" class="custom-select mr-sm-2">
          <option value="0" disabled selected>Vali väljak</option>
          <option v-for="field in fields" :value="field.id">{{ field.name }}</option>
        </select>
      </div>
    </div>
    <br>
    <div class="form-row align-items-center">
      <div class="col-3 my-1 mx-auto">
        <label class="mr-sm-2 sr-only">Preference</label>
        <select v-model="selectedSportsFieldId" class="custom-select mr-sm-2">
          <option value="0" disabled selected>Vali spordiala</option>
          <option v-for="sportField in sportFields" :value="sportField.id">{{ sportField.sportsSportsType }}</option>
        </select>
      </div>
    </div>
    <br>
    <div class="col-3 my-1 mx-auto">
      <label class="mr-sm-2 sr-only">Preference</label>
      <input v-model="date" type="date" name="" id="">
    </div>
    <br>
    <button type="submit" class="btn btn-primary" v-on:click="availableBookingTimes">Näita kellaaegu valitud kuupäeval
    </button>
    <br>
    <br>
    <div class="align-items-center">
      <div v-for="availableTime in availableTimes" :value="availableTime.id" class="col-3 my-1 mx-auto">
        <input type="checkbox" id="checkbox" v-model="availableTime.selected"> {{ availableTime.timeSlotInfo }}
      </div>
    </div>
    <br>
    <button v-if="getRoleId() === 1" type="submit" class="btn btn-primary" v-on:click="confirmBooking">Broneeri</button>

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
      timeSlot: {},
    }

  },
  methods: {
    getAllFields: function () {
      this.$http.get("/fields/all-fields")
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
    getSportfields: function () {
      this.$http.get("/fields/sportsfield", {params: {fieldId: this.fieldId}}
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
        sportFieldId: this.selectedSportsFieldId,
        date: this.date,

      };
      this.$http.post("/field-booking", bookingInfo
      ).then(response => {
        this.availableTimes = response.data;
        console.log(response.data);
      }).catch(error => {
        console.log(error)
      })
    },
    confirmBooking: async function () {
      let bookingConfirmation = {
        userId: sessionStorage.getItem('userId'),
        sportsFieldId: this.selectedSportsFieldId,
        date: this.date,
        timeSlots: this.availableTimes

      }
      await this.$http.post("/field-booking/new", bookingConfirmation
      ).then(response => {
        this.bookedFields = response.data
        this.$router.push('user')
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getRoleId: function () {
      return Number(sessionStorage.getItem('roleId'))

    }

  },
  mounted() {
    this.getAllFields();
    this.getSportfields();

  }
}
</script>

<style scoped>


</style>