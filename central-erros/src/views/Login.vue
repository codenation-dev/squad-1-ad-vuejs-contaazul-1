<template>
  <section class="hero is-fullheight is-medium login-color is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <article class="card is-rounded card-login">
            <div class="card-content">
              <h1 class="title">
                <img src="../assets/login-logo.png" alt="logo" width="200" />
              </h1>
              <p class="control has-icons-left">
                <input class="input" type="email" placeholder="Email" >
                  <span class="icon is-small is-left padding-icon">
                    <i class="fa fa-envelope"></i>
                  </span>
              </p>
              <br />
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" />
                  <span class="icon is-small is-left padding-icon">
                    <i class="fa fa-lock"></i>
                  </span>
              </p>
              <br />
              <p class="control">
                <button
                  @click="redirect('logs')"
                  class="button button-color is-medium is-fullwidth"
                >
                  <i class="fa fa-user icon-space"></i>
                  Login
                </button>
              </p>
              <a
                @click="redirect('register')"
                class="is-pulled-left login-space"
                >Novo Cadastro</a
              >
              <a
                @click="redirect('change-password')"
                class="is-pulled-right login-space"
                >Esqueceu a senha?</a
              >
              <br />
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  methods: {
    redirect(rota) {
      if (rota === "register") {
        this.$router.push({
          name: "register",
        });
      } else if (rota === "change-password") {
        this.$router.push({
          name: "change-password",
        });
      } else {
        this.$router.push({
          name: "logs",
        });
      }
    },
  },
};
</script>

<style scoped>
.card-login {
  width: 30%;
}

.login-color {
  background: rgb(21,72,84);
  background: linear-gradient(180deg, rgba(21,72,84,1) 0%, rgba(36,83,95,1) 23%, rgba(60,101,113,1) 47%, rgba(99,132,142,1) 71%, rgba(255,255,255,1) 100%);
}

.login-space {
  margin-top: 10px;
}

.icon-space {
  margin-right: 5px;
}

.button-color {
  background-color: #154854;
  color: #ffffff;
}

.padding-icon {
  padding-top: 2px;
}
</style>
