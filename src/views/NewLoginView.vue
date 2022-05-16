<template>
  <div>
    <h3>Sisselogimiseks täida väljad</h3>
    <br>

    <div v-if="successMessage.length > 0" class="alert alert-primary" role="alert">
      {{ successMessage }}
    </div>

    <div v-if="messageTitle.length > 0" class="alert alert-danger" role="alert">
      {{ messageTitle }}
    </div>

    <div v-if="errorMessage.length > 0" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>

    <div v-if="passwordMessage.length > 0" class="alert alert-danger" role="alert">
      {{ passwordMessage }}
    </div>

    <div class="col-md-3 col-sm-12 mx-auto">
      <div v-if="tableDivDisplay" class="login-form">
        <div class="form-group">
          <input type="text" v-model="newLogIn.username" class="form-control" placeholder="Kasutajanimi">
        </div>
        <div class="form-group">
          <input type="password" v-model="newLogIn.password" class="form-control" placeholder="Parool">
        </div>
        <button v-on:click="userLogin" type="submit" class="btn btn-success">Logi sisse</button>
        <br>
        <br>
        <label>Kasutaja puudub?</label>
        <br>
        <button type="button" class="btn btn-primary" v-on:click="hideTableDiv">Loo kasutaja</button>
      </div>
      <br>
      <div>
        <div v-if="newUserDisplay" class="login-form">
          <div class="form-group">
            <input type="text" v-model="newUserInfo.contactFirstName" class="form-control" placeholder="Eesnimi">
          </div>
          <div class="form-group">
            <input type="text" v-model="newUserInfo.contactLastName" class="form-control" placeholder="Perekonnanimi">
          </div>
          <div class="form-group">
            <input type="text" v-model="newUserInfo.contactTelephone" class="form-control" placeholder="Telefon">
          </div>
          <div class="form-group">
            <input type="text" v-model="newUserInfo.contactEmail" class="form-control" placeholder="E-mail">
          </div>
          <div class="form-group">
            <input type="text" v-model="newUserInfo.username" class="form-control" placeholder="Kasutajanimi">
          </div>
          <div class="form-group">
            <input type="password" v-model="newUserInfo.password" class="form-control" placeholder="Parool">
          </div>
          <div class="form-group">
            <input type="password" v-model="passwordConfirm" class="form-control" placeholder="Kinnita parool">
          </div>
          <button v-on:click="addNewUser" type="submit" class="btn btn-success">Loo kasutaja</button>
          <br>
          <br>
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
      newUserInfo: {},
      newLogIn: {},
      messageTitle: '',
      messageDescription: '',
      successMessage: '',
      errorMessage: '',
      passwordConfirm: null,
      passwordMessage: ''
    }
  },
  methods: {
    hideTableDiv: function () {
      this.tableDivDisplay = false;
      this.newUserDisplay = true
    },
    displayTableDiv: function () {
      this.tableDivDisplay = true;
      this.newUserDisplay = false
    },
    userLogin: function () {
      this.$http.post("/login", this.newLogIn
      ).then(response => {
        sessionStorage.setItem('userId', response.data.userId)
        sessionStorage.setItem('roleId', response.data.roleId)
        if (response.data.roleId === 1) {
          this.$router.push({name: 'userRoute'})
        } else {
          this.$router.push({name: 'adminRoute'})
        }
      }).catch(error => {
        this.errorMessage = error.response.data.title + '. ' + error.response.data.detail + '.'
        this.successMessage = ''
      })
    },

    addNewUser: function () {
      if (this.newUserInfo.contactFirstName.length === 0) {
        this.messageTitle = 'Eesnimi on kohustuslik väli'
        this.errorMessage = ''
        this.passwordMessage = ''
        this.successMessage = ''
      } else if (this.newUserInfo.password === this.passwordConfirm) {
        this.$http.post("/admin/user", this.newUserInfo
        ).then(response => {
          this.newUserInfo = response.data
          this.successMessage= 'Kasutaja ' + '"' + this.newUserInfo.username + '"' +  ' loodud, jätkamiseks logige sisse'
          this.errorMessage = ''
          this.passwordMessage = ''
          this.displayTableDiv()
        }).catch(error => {
          this.errorMessage = error.response.data.title + '. ' + error.response.data.detail + '.'
          this.passwordMessage = ''
        });
      } else {
        this.passwordMessage = 'Paroolid ei ühti'
        this.successMessage = ''
        this.messageTitle = ''
        this.errorMessage = ''
      }
    },
  },

}
</script>

<style scoped>

</style>