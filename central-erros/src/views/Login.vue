<template>
<body class="layout-default">
  <section class="hero is-fullheight is-medium login-color is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <article class="card is-rounded card-login">
            <div class="card-content">
              <h1 class="title">
                <img src="../assets/error-log.png" alt="logo" width="200" />
              </h1>
              <p class="control has-icon">
                <input class="input" type="email" placeholder="Email" />
                <i class="fa fa-envelope"></i>
              </p>
              <br />
              <p class="control has-icon">
                <input class="input" type="password" placeholder="Password" />
                <i class="fa fa-lock"></i>
              </p>
              <br />
              <p class="control">
                <button @click="redirect('logs')" class="button is-info is-medium is-fullwidth">
                  <i class="fa fa-user icon-space"></i>
                  Login
                </button>
              </p>
              <a @click="redirect('register')" class="is-pulled-left login-space">Novo Cadastro</a>
              <a
                @click="redirect('change-password')"
                class="is-pulled-right login-space"
              >Esqueceu a senha?</a>
              <br />
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</body>
</template>

<script>
export default {
  name: "Login",
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
      } else {
        this.$router.push({
          name: "logs"
        });
      }
    }
  }
};
</script>

<style>
.card-login {
  width: 30%;
}

.login-color {
  background-color: #7ed957;
}

.login-space {
  margin-top: 10px;
}

.icon-space {
  margin-right: 5px;
}
</style>
