<template>
  <div >
    <h2 >Väljakud meie süsteemis</h2>
    <div>

      <table class="table table-hover table-bordered table-striped ">

        <thead>
        <tr class="table-hover table-active">
          <th scope="col">Väljaku asukoht</th>
          <th scope="col">Väljaku nimi</th>
          <th scope="col"></th>
        </tr>
        </thead>

        <tbody>
        <tr class="table-hover table-success" v-for="field in fields">
          <td>{{ field.locationCounty }}</td>
          <td>{{ field.name }}</td>
          <td>
            <button type="button" class="btn btn-secondary" v-on:click="$router.push('booking')">Vali väljak</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllFieldView",
  data: function () {
    return {
      id: 0,
      locationCounty: this.locationCounty,
      name: this.name,
      fields: this.fields,
      locationId: this.locationId,

    }
  },
  methods : {
    getAllSportFields: function () {
      this.$http.get("/field/all")
          .then(response => {
            this.fields = response.data
            console.log(response.data)
          }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getAllSportFields()
  }
}
</script>

<style scoped>

</style>