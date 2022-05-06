<template>
  <div >
    <h1>Siia tuleb väljaku broneerimine</h1>
    <form >
      <div class="form-row align-items-centre">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
          <select v-model="selectedFieldId" v-on:change="test123" class="custom-select mr-sm-2" id="inlineFormCustomSelect" >
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
          <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
          <select v-model="sportsId" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
            <option value="0" selected>Vali spordiala</option>
            <option v-for="sportsSportsType in sportsSportsTypes":value="sportsField.sportsId" >{{ sp }}</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </form>
    <br>
    <form>
      <div class="form-row align-items-center">
        <div class="col-3 my-1 mx-auto">
          <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
          <input type="date" name="" id="">
        </div>
      </div>
    </form>
    <br>

    <br>
    <button type="submit" class="btn btn-success">Kinnita broneering</button>
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
      sportsSportsTypes: this.sportsSportsTypes,
      sportsId: 0,
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
    someMethodName: function () {
      this.$http.get("/sportsfield/fieldId", {params: {someParam: this.fieldId}}
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }

  },
  mounted() {
    this.getAllFields();
    this.sportsId();

  }
}
</script>

<style scoped >


</style>