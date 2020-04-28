<template>
  <body class="layout-default">
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
                  <input class="input" type="email" placeholder="Email" />
                    <span class="icon is-small is-left padding-icon">
                      <i class="fa fa-envelope"></i>
                    </span>
                </p>
                <br />
                <p class="control has-icons-left">
                  <input
                    class="input"
                    type="password"
                    placeholder="New Password"
                  />
                  <span class="icon is-small is-left padding-icon">
                    <i class="fa fa-lock"></i>
                  </span>
                </p>
                <br />
                <p class="control has-icons-left">
                  <input
                    class="input"
                    type="password"
                    placeholder="Confirm new password"
                  />
                  <span class="icon is-small is-left padding-icon">
                    <i class="fa fa-lock"></i>
                  </span>
                </p>
                <br />
                <br />
                <p class="columns control">
                  <button
                    @click="redirect('login')"
                    class="column button button-margin button-padding password-change is-medium"
                  >
                    <i class="fa fa-exchange-alt icon-space"></i>
                    Change password
                  </button>
                  <button
                    @click="redirect('login')"
                    class="button-back column button button-padding is-medium"
                  >
                    <i class="fa fa-arrow-left icon-space"></i>
                    Back
                  </button>
                </p>
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
  name: "ChangePassword",
  methods: {
    redirect(rota) {
      if (rota === "login") {
        this.$router.push({
          name: "login",
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

.button-padding {
  padding-top: 6px;
}

.button-margin {
  margin-right: 10px;
}

.password-change {
  background-color: #154854;
  color: #ffffff;
}

.button-back {
  padding-left: 3px;
  background-color: #ff7272;
  color: #ffffff;
}

.padding-icon {
  padding-top: 2px;
}
</style>
