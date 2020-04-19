<template>
  <div id="app">
    <section class="navbar-section">
      <button class="btn" @click="redirect('/')">Login</button>
      <button class="btn" @click="redirect('register')">Register</button>
      <button class="btn" @click="redirect('change-password')">Change Password</button>
      <button class="btn" @click="redirect('logs')">Logs</button>
      <button class="btn" @click="redirect('erro')">Erro</button>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    redirect(rota) {
      if (rota === "register") {
        this.$router.push({
          name: "register"
        });
      } else if (rota === "change-password") {
        this.$router.push({
          name: "change-password"
        });
      } else if (rota === "logs") {
        this.$router.push({
          name: "logs"
        });
      } else if (rota === "erro") {
        this.$router.push({
          name: "erro"
        });
      } else {
        this.$router.push({
          name: "login"
        });
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
