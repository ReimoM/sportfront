<template>
  <div >
    <h1>Siia tuleb väljaku broneerimine</h1>
    <form >
      <div class="form-row align-items-centre">
        <div class="col-3 my-1 offset-md-4">
          <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
            <option selected>Vali spordiväljak</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-outline-primary">Kinnita väljak</button>
        </div>
      </div>
    </form>
    <br>
    <form>
      <div class="form-row align-items-center">
        <div class="col-3 my-1 offset-md-4">
          <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
            <option selected>Vali spordiala</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-outline-primary">Kinnita sport</button>
        </div>
      </div>
    </form>
    <br>
    <form>
      <div class="form-row align-items-center">
        <div class="col-3 my-1 offset-md-4">
          <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
            <option selected>Vali kuupäev</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-outline-primary">Kinnita kuupäev</button>
        </div>
      </div>
    </form>
    <br>
    <form>
      <div class="form-row align-items-center">
        <div class="col-3 my-1 offset-md-4">
          <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
            <option selected>Vali kellaaeg</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-outline-primary">Kinnita kellaaeg</button>
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
    return {}

  }
}
</script>

<style scoped >


</style>