<template>
  <div >
    <h1>Siia tuleb väljaku broneerimine</h1>
    <form >
      <div class="form-row align-items-centre">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only" >Preference</label>
          <select v-model="selectedFieldId" v-on:change="test123" class="custom-select mr-sm-2"  >
            <option  selected>Vali väljak</option>
            <option v-for="field in fields" :value="field.id">{{field.name}}</option>
          </select>
        </div>
      </div>
    </form>
    <br>
    <form>
      {{sportsSportsType}}
      <div class="form-row align-items-center">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only" >Preference</label>
          <select v-model="sportsId" v-on:change=""  class="custom-select mr-sm-2">
            <option selected>Vali spordiala</option>
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
    <button type="submit" class="btn btn-primary">Näita kellaaegu valitud kuupäeval</button>
  </div>
</template>

<script>

export default {
  name: "NewBookingView",
  data: function () {
    return {
      fieldId: sessionStorage.getItem('fieldId'),
      locationCounty: this.locationCounty,
      name: this.name,
      fields: this.fields,
      locationId: this.locationId,
      sportFields: this.sportFields,
      sportsId: this.sportsId,
      selectedFieldId: 0,
      bookingDate: {},
      sportsSportsType: this.sportsSportsType,

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
    test123: function () {
      alert(this.selectedFieldId)
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
    availableBookingDates: function () {
      this.$http.post("/some/path", this.bookingDate
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