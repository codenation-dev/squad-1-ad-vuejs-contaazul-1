<template>
  <body class="layout-default">
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
                <div class="field">
                  <p class="control has-icons-left">
                    <input
                      class="input"  
                      v-model="name" 
                      type="nome" 
                      placeholder="Nome" 
                      :class="{invalid: $v.name.$invalid && $v.name.$dirty}"
                      @input="$v.name.$touch()"
                    />
                      <span class="icon is-small is-left padding-icon">
                        <i class="fa fa-user"></i>
                      </span>
                  </p>
                  <p class="help is-danger" v-if="$v.name.$invalid && $v.name.$dirty">
                    * Nome é obrigatório.
                  </p>
                </div>
                <div class="field">
                <p class="control has-icons-left">
                  <input 
                      class="input" 
                      v-model="email" 
                      type="email" 
                      placeholder="Email"
                      :class="{invalid: $v.email.$invalid && $v.email.$dirty}"
                      @blur="$v.email.$touch()" 
                  />
                    <span class="icon is-small is-left padding-icon">
                      <i class="fa fa-envelope"></i>
                    </span>
                </p>
                 <p class="help is-danger" v-if="$v.email.$invalid && $v.email.$dirty">
                    * É necessário um e-mail válido.
                  </p>
                </div>
                <div class="field">
                <p class="control has-icons-left">
                  <input  class="input" 
                          v-model="password1" 
                          type="password" 
                          placeholder="Senha" 
                          :class="{invalid: $v.password1.$invalid && $v.password1.$dirty}"
                          @blur="$v.password1.$touch()" 
                  />
                    <span class="icon is-small is-left padding-icon">
                      <i class="fa fa-lock"></i>
                    </span>
                </p>
                <p class="help is-danger" v-if="!$v.password1.required && $v.password1.$dirty">
                    * É necessário inserir uma senha.
                </p>
                <p class="help is-danger" v-if="!$v.password1.alphaNum && $v.password1.$dirty">
                    * A senha deve conter apenas letras e números.
                </p>
                <p class="help is-danger" v-if="!$v.password1.minLength && $v.password1.$dirty">
                    * A senha deve conter no mínimo 6 caracteres.
                </p>  
                </div>
                <div class="field">
                <p class="control has-icons-left">
                  <input
                    class="input"
                    type="password"
                    v-model="password2"
                    placeholder="Confirmar senha"
                    :class="{invalid: $v.password2.$invalid && $v.password2.$dirty}"
                    @blur="$v.password2.$touch()" 
                  />
                    <span class="icon is-small is-left padding-icon">
                      <i class="fa fa-lock"></i>
                    </span>
                </p>
                <p class="help is-danger" v-if="$v.password2.$invalid && $v.password2.$dirty">
                    * As senhas não conferem.
                  </p>
                </div>
                <p class="help is-danger" v-if="hasEmail">* E-mail já cadastrado.</p>
                <br />
                <p class="columns control">
                  <button
                    @click="addUser()"
                    class="column is-12-mobile button button-register button-margin is-medium"
                  >
                    <i class="fa fa-user-plus icon-space"></i>
                    Registrar
                  </button>
                    <button
                    @click="redirect('login')"
                    class="column is-12-mobile button button-back is-medium">
                    <i class="fa fa-arrow-left icon-space"></i>
                    Voltar
                  </button>
                </p>
              </div>
            </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>
<script>
import {  addUser, getUsers } from '@/services/login';
import { required, email, sameAs, alphaNum, minLength } from 'vuelidate/lib/validators';
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
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    password1: {
      required,
      alphaNum,
      minLength: minLength(6),
    },
    password2: {
      required,
      alphaNum,
      minLength: minLength(6),
      sameAs: sameAs('password1')
    },
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
        this.hasEmail = users.data.some(user => user.email === email);
    },
    async addUser() {
      let date = new Date ();
      const user = {
        name: this.name,
        createdAt: date.toLocaleString(),
        email: this.email,
        password: this.password1
      }
      await this.hasEmailCadastrado(user.email)
      
      if(!this.$v.$invalid && !this.hasEmail) {
        addUser(user).then(
          this.$toasted.show('Usuário cadastrado com Sucesso!',{
            type: 'success',
            duration : 2000,
            onComplete: this.returnLogin,
          })
        )
      } 
    },
    returnLogin() {
      this.$router.push('/');
    },
  }
}
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
.icon-space {
  margin-right: 5px;
}
.button-register {
  background-color: #154854;
  color: #ffffff;
}
.button-register:hover {
  background-color: rgba(60,101,113,1);
}
.button-margin {
  margin-right: 10px;
}
.button {
  padding-top: 6px;
}
.button-back {
  padding-left: 3px;
  background-color: #ff7272;
  color: #ffffff;
}
.button-back:hover {
  background-color: #fc9191;
}
.invalid {
  border-color: red;
}
.field {
  text-align: initial;
}
.toasted.toasted-primary{
  font-size: 50px;
}
</style>