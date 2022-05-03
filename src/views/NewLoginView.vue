<template>
  <div>
    <h3>Sisselogimiseks täida väljad</h3>
    <br>

    <div class="col-md-3 col-sm-12 mx-auto">
      <div class="login-form">
        <form>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Kasutajanimi">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Parool">
          </div>
          <button v-on:click="userLogin" type="submit" class="btn btn-success">Logi sisse</button>
          <br>
          <br>
          <label>Kasutaja puudub?</label>
          <br>
          <button type="submit" class="btn btn-primary">Loo kasutaja</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "NewLoginView",
  data: function () {
    return {
      username: '',
      password: '',
      successMessage: '',
    }
  },
  methods: {
    saveDataToSessionStorage: function () {
      sessionStorage.setItem('username', this.user.username)
      sessionStorage.setItem('password', this.user.password)
      sessionStorage.setItem('user', JSON.stringify(this.user))

    },
    userLogin: function () {
      this.$http.get("/login", {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }

    // userLogin: function () {
    //   let userData = {
    //     username: this.username,
    //     password: this.password,
    //   }
    //
    //   this.$http.post("/login", userData
    //   ).then(response => {
    //     this.successMessage = "Sisselogimine õnnestus, tere tuelmast."
    //     console.log(response.data)
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // }
  },
}
</script>

<style scoped>

</style>