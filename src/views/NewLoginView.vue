<template>
  <div >
    <h3>Sisselogimiseks täida väljad</h3>
    <br>

    <div class="col-md-3 col-sm-12 mx-auto">
      <div v-if="tableDivDisplay" class="login-form">
        <form>
          <div  class="form-group">
            <input type="text" class="form-control" placeholder="Kasutajanimi">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Parool">
          </div>
          <button v-on:click="$router.push('home')" type="submit" class="btn btn-success">Logi sisse</button>
          <br>
          <br>
        </form>
          <label>Kasutaja puudub?</label>
          <br>
          <button type="button" class="btn btn-primary" v-on:click="hideTableDiv">Loo kasutaja</button>

        </div>
      <br>

      <div>
        <div v-if="newUserDisplay" class="login-form">
          <form>
            <div  class="form-group">
              <input type="text" v-model= "contactFirstName"class="form-control" placeholder="Eesnimi">
            </div>
            <div class="form-group">
              <input type="text" v-model="contactLastName" class="form-control" placeholder="Perekonnanimi">
            </div>
            <div class="form-group">
              <input type="text" v-model="contactTelephone" class="form-control" placeholder="Telefon">
            </div>
            <div class="form-group">
              <input type="text" v-model="contactEmail" class="form-control" placeholder="E-mail">
            </div>
            <div class="form-group">
              <input type="text" v-model="username" class="form-control" placeholder="Kasutajanimi">
            </div>
            <div class="form-group">
              <input type="password" v-model="password" class="form-control" placeholder="Parool">
            </div>
            <button v-on:click="$router.push('home'); addNewUser" type="submit" class="btn btn-success">Loo kasutaja</button>
            <br>
            <br>
          </form>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
export default {
  name: "NewLoginView",
  data: function () {
    return {
      tableDivDisplay: true,
      newUserDisplay: false,
      contactFirstName: '',
      contactLastName: '',
      contactTelephone: '',
      contactEmail: '',
      username: '',
      password:''

    }
  },
  methods: {
    saveDataToSessionStorage: function () {
      sessionStorage.setItem('username', this.user.username)
      sessionStorage.setItem('password', this.user.password)
      sessionStorage.setItem('user', JSON.stringify(this.user))

    },
    hideTableDiv: function () {
      this.tableDivDisplay = false;
      this.newUserDisplay = true
    },

    displayTableDiv: function () {
      this.tableDivDisplay = true;
    },

    addNewUser: function () {
      let newUserInfo = {
        contactFirstName: this.contactFirstName,
        contactLastName: this.contactLastName,
        contactTelephone: this.contactTelephone,
        contactEmail: this.contactEmail,
        username: this.username,
        password: this.password
      }

      this.$http.post("/user/add", newUserInfo
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }

  },


}
</script>

<style scoped>

</style>