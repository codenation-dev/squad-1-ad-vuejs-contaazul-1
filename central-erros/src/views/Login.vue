<template>
  <section class="hero is-fullheight is-medium login-color is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-offset-4">
          <article class="card is-rounded card-login">
            <div class="card-content">
              <h1 class="title">
                <img src="../assets/login-logo.png" alt="logo" width="200" />
              </h1>
              <p class="control has-icons-left">
                <input v-model="user.email" class="input" type="email" placeholder="Email" @keyup.enter="validaUser">
                  <span class="icon is-small is-left padding-icon">
                    <i class="fa fa-envelope"></i>
                  </span>
              </p>
              <br />
              <p class="control has-icons-left">
                <input v-model="user.password" class="input" type="password" placeholder="Senha" @keyup.enter="validaUser"/>
                  <span class="icon is-small is-left padding-icon">
                    <i class="fa fa-lock"></i>
                  </span>
              </p>
              <h6 v-for="error in errors" :key="error"> {{ error }}</h6>
              <br />
              <p class="control">
                <button
                  @click="validaUser"
                  class="button button-color is-medium is-fullwidth"
                >
                  <i class="fa fa-user icon-space"></i>
                  Entrar
                </button>
              </p>
              <a
                @click="redirect('register')"
                class="is-pulled-left login-space hover-link"
                >Registrar</a
              >
              <a
                @click="redirect('change-password')"
                class="is-pulled-right login-space hover-link"
                >Esqueceu a senha?</a
              >
              <br />
            </div>
          </article>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { getUsers } from '@/services/login';

export default {
  name: "Login",
  data() {
    return {
      user: {},
      errors: [],
      hasEmail: '',
    }
  },
  methods: {
    ...mapActions(['login']),

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
    async loginUser() { 
      this.errors = [];
      await this.hasEmailCadastrado(this.user.email);

      if (this.hasEmail) {
        if(this.hasEmail.password === this.user.password) {
          this.login(this.hasEmail);
          this.redirect('logs');
        } else {
          this.errors.push("* Senha incorreta..");
        }
      } else {
        this.errors.push("* E-mail não cadastrado..");
      }
    },
     async hasEmailCadastrado(email) {
        const users = await getUsers();
        this.hasEmail = users.data.find(user => user.email === email);
      },
      validaUser(){
      this.errors = [];
      if (!this.user.email) {
        this.errors.push("* Você precisa preencher o e-mail.");
      }
      if (!this.user.password) {
        this.errors.push("* Você precisa preencher a senha.");
      }
      if (this.errors.length == 0){
        this.loginUser();
      }
    },
  },
};
</script>

<style scoped>
.card-login {
  width: 50%;
}

@media screen and (max-width: 768px) {
  .card-login {
    width: 100%;
  }
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

.button-color:hover {
  background-color: rgba(60,101,113,1);
}

.padding-icon {
  padding-top: 2px;
}

.hover-link {
  text-decoration: none;
  color: #154854;
}

.hover-link:hover {
  color: #3273dc;
} 
</style>
