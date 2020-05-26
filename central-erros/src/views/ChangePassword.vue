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
                  <input v-model="user.email" class="input" type="email" placeholder="Email" />
                    <span class="icon is-small is-left padding-icon">
                      <i class="fa fa-envelope"></i>
                    </span>
                </p>
                <br />
                <p class="control has-icons-left">
                  <input
                    v-model="user.newPassword"
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
                    v-model="user.confirmNewPassword"
                    class="input"
                    type="password"
                    placeholder="Confirm new password"
                  />
                  <span class="icon is-small is-left padding-icon">
                    <i class="fa fa-lock"></i>
                  </span>
                </p>
                <h6 v-for="error in errors" :key="error"> {{ error }}</h6>
                <br />
                <br />
                <p class="columns control">
                  <button
                    @click="validaUser"
                    class="column button button-margin button-padding password-change is-medium"
                  >
                    <i class="fa fa-exchange-alt icon-space"></i>
                    Mudar senha
                  </button>
                  <button
                    @click="redirect('login')"
                    class="button-back column button button-padding is-medium"
                  >
                    <i class="fa fa-arrow-left icon-space"></i>
                    Voltar
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
import { getUsers, patchUser } from '@/services/login';

export default {
  name: "ChangePassword",
  data() {
    return {
      user: {},
      errors: [],
      hasEmail: '',
    }
  },
  methods: {
    redirect(rota) {
      if (rota === "login") {
        this.$router.push({
          name: "login",
        });
      }
    },
    async hasEmailCadastrado(email) {
        const users = await getUsers();
        this.hasEmail = users.data.find(user => user.email === email);
      },
    async changePassword() {
      this.errors = [];
      await this.hasEmailCadastrado(this.user.email);

      if (this.hasEmail) {
        const newUser = {
          ...this.hasEmail,
          password: this.user.newPassword,
        };
          patchUser(newUser)
          .then(this.redirect('login'))
      } else {
        this.errors.push("* E-mail não cadastrado..");
      }
    },
    validaUser(){
      this.errors = [];
      if (!this.user.email) {
        this.errors.push("* Você precisa preencher o e-mail.");
      }
      if (!this.user.newPassword || !this.user.confirmNewPassword) {
        this.errors.push("* Você precisa preencher a senha.");
      }

      if (this.user.newPassword != this.user.confirmNewPassword) {
        this.errors.push("* Senhas não conferem");
      }
      if (this.errors.length == 0){
        this.changePassword();
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
