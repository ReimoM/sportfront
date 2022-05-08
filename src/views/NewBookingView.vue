<template>
  <div >
    <h1>Siia tuleb väljaku broneerimine</h1>
    <form >
      <div class="form-row align-items-centre">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only" >Preference</label>
          <select v-model="selectedFieldId" v-on:change="getNewSportFields" class="custom-select mr-sm-2"  >
            <option value="0"  selected>Vali väljak</option>
            <option v-for="field in fields" :value="field.id">{{field.name}}</option>
          </select>
        </div>
      </div>
    </form>
    <br>
    <form>
      <div class="form-row align-items-center">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only"  >Preference</label>
          <select v-model="selectedSportsFieldId" class="custom-select mr-sm-2">
            <option value="0">Vali spordiala</option>
            <option v-for="sportField in sportFields" :value="sportField.sportsId" >{{ sportField.sportsSportsType }}</option>
          </select>
        </div>
      </div>
    </form>
    <br>
    <form>
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only" >Preference</label>
          <input type="date" name="" id="">
        </div>
    </form>
    <br>
    <button type="submit" class="btn btn-primary" v-on:change="availableBookingTimes">Näita kellaaegu valitud kuupäeval</button>
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

    }

  },
  methods:{
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
    sportFieldId: function (sportsFieldId) {
      sessionStorage.setItem('sportFieldId', sportsFieldId)

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
      this.$http.post("/field-booking", this.availableTimes
      ).then(response => {

        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }

  },
  mounted() {
    this.getAllFields();
    this.getSportfields();

  }
}
</script>

<style scoped >


</style>