<template>
  <section class="hero is-fullheight is-medium back-color">
    <div class="hero-body">
      <div class="container">
        <div class="tile is-parent">
      <article class="tile is-child box">
        <img src="../assets/login-logo.png" alt="logo" width="200" />
        <p class="title">{{error}}</p>
       
      </article>
    </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      error: "Ops...Não foi possível realizar a operação"
    }
  }
};
</script>

<style scoped>

.back-color {
  background: rgb(21,72,84);
  background: linear-gradient(180deg, rgba(21,72,84,1) 0%, rgba(36,83,95,1) 23%, rgba(60,101,113,1) 47%, rgba(99,132,142,1) 71%, rgba(255,255,255,1) 100%);
}

.card-error {
  width: 70%;

}



</style>