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
                  <input class="input" v-model="name" type="nome" placeholder="Nome" />
                    <span class="icon is-small is-left padding-icon">
                      <i class="fa fa-user"></i>
                    </span>
                </p>
                <br/>
                <p class="control has-icons-left">
                  <input class="input" v-model="email" type="email" placeholder="Email" />
                    <span class="icon is-small is-left padding-icon">
                      <i class="fa fa-envelope"></i>
                    </span>
                </p>
                <br />
                <p class="control has-icons-left">
                  <input class="input" v-model="password1" type="password" placeholder="Password" />
                    <span class="icon is-small is-left padding-icon">
                      <i class="fa fa-lock"></i>
                    </span>
                </p>
                <br />
                <p class="control has-icons-left">
                  <input
                    class="input"
                    type="password"
                    v-model="password2"
                    placeholder="Confirm password"
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
                    @click="validaUser()"
                    class="column button button-margin button-padding button-register is-medium is-fullwidth"
                  >
                    <i class="fa fa-user-plus icon-space"></i>
                    Register
                  </button>
                    <button
                    @click="redirect('login')"
                    class="column button button-back button-padding is-medium">
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


import { addUser, getUsers } from '@/services/login';

export default {
  name: "Register",
  data() {
    return {
      name: null,
      email:null,
      password1:null,
      password2:null,
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
    async addUser() {
      let date = new Date ();
      const user = {
        name: this.name,
        createdAt: date.toLocaleString(),
        email: this.email,
        password: this.password1
      }

      await this.hasEmailCadastrado(user.email);

      //validação catch para erros de api.

      if(!this.hasEmail) {
        addUser(user)
      .then(this.$router.push('/'))
      } else {
        this.errors.push("* Este já está cadastrado..");
      }
    },   
    validaUser(){
      //Verificação de e-mail válido
      this.errors = [];
      if (!this.name) {
        this.errors.push("* Você precisa preencher o nome.");
      }
      if (!this.email) {
        this.errors.push("* Você precisa preencher o e-mail.");
      }
      if (!this.password1 || !this.password2) {
        this.errors.push("* Você precisa preencher a senha.");
      }

      if (this.password1 != this.password2) {
        this.errors.push("* Senhas não conferem");
      }
      if (this.errors.length == 0){
        this.addUser();
      }
    },
  }
}
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

.button-register {
  background-color: #154854;
  color: #ffffff;
}

.button-margin {
  margin-right: 10px;
}

.button-padding {
  padding-top: 6px;
}

.button-back {
  padding-left: 3px;
  background-color: #ff7272;
  color: #ffffff;
}

.button-padding {
  padding-top: 6px;
}
</style>
