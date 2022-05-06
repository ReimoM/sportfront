<template>
  <div >
    <h1>Siia tuleb väljaku broneerimine</h1>
    <form >
      <div class="form-row align-items-centre">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only" >Preference</label>
          <select v-model="selectedFieldId" v-on:change="updateFieldId" class="custom-select mr-sm-2"  >
            <option  selected>Vali väljak</option>
            <option v-for="field in fields" :value="field.id">{{field.name}}</option>
          </select>
        </div>
      </div>
    </form>
    <br>
    <form>
      {{sportsId}}
      <div class="form-row align-items-center">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only" >Preference</label>
          <select v-model="sportsId" class="custom-select mr-sm-2">
            <option value="0" selected>Vali spordiala</option>
            <option v-for="sportsType in sportsSportsTypes" :value="sportsField.sportsId" >{{ sportsType.sportsId }}</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </form>
    <br>
<!--    <div id="date-picker-example" class="md-form md-outline col-3 my-1 mx-auto input-with-post-icon datepicker mx-auto" inline="true">-->
<!--      <input placeholder="Vali kuupäev" type="text" id="example" class="form-control">-->
<!--      <label for="example">Kuupäeva valik</label>-->
<!--      <i class="fas fa-calendar input-prefix"></i>-->
<!--    </div>-->
    <form>
      <div class="form-row align-items-center">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only" >Preference</label>
          <input type="date" name="" id="">
        </div>
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
      sportsTypes: this.sportsSportsTypes,
      sportsId: this.sportsId,
      selectedFieldId: 0,

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
      alert('test123')
    },
    getSportfields: function () {
      this.$http.get("/sportsfield/fieldId", {params: {someParam: this.selectedFieldId}}
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