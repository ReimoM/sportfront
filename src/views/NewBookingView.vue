<template>
  <div>
    <h1>Siia tuleb väljaku broneerimine</h1>
    <form>
      <div class="form-row align-items-center">
        <div class="col-3 my-1">
          <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
            <option selected>Vali spordiväljak</option>
            <option value="1" >One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-outline-primary">Kinnita väljak</button>
        </div>

        <div class="col-3 my-1">
          <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
          <select class="custom-select mr-sm-2">
            <option selected>Vali kuupäev</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-auto my-1">
          <button type="submit" class="btn btn-outline-primary">Kinnita kuupäev</button>
        </div>
        <br>
        <br>
        <div class="col-3 my-1">
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

  </div>
</template>

<script>
export default {
  name: "NewBookingView"
}
</script>

<style scoped>

</style>