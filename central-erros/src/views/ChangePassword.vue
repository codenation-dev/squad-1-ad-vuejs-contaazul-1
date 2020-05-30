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
                <div class="field">
                    <p class="control has-icons-left">
                      <input 
                      v-model="email" 
                      @blur="$v.email.$touch()"
                      class="input" 
                      :class="{invalid: $v.email.$invalid && $v.email.$dirty}"
                      type="email" 
                      placeholder="Email" 
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
                  <input
                    @blur="$v.newPassword.$touch()"
                    v-model="newPassword"
                    class="input"
                    :class="{invalid: $v.newPassword.$invalid && $v.newPassword.$dirty}"
                    type="password"
                    placeholder="New Password"
                    @keyup.enter="validaUser"
                  />
                  <span class="icon is-small is-left padding-icon">
                    <i class="fa fa-lock"></i>
                  </span>
                </p>
                <p class="help is-danger" v-if="!$v.newPassword.required && $v.newPassword.$dirty">
                    * É necessário inserir uma senha.
                </p>
                <p class="help is-danger" v-if="!$v.newPassword.alphaNum && $v.newPassword.$dirty">
                    * A senha deve conter apenas letras e números.
                </p>
                <p class="help is-danger" v-if="!$v.newPassword.minLength && $v.newPassword.$dirty">
                    * A senha deve conter no mínimo 6 caracteres.
                </p>  
                </div>
                <div class="field">
                <p class="control has-icons-left">
                  <input
                    @blur="$v.confirmNewPassword.$touch()"
                    v-model="confirmNewPassword"
                    class="input"
                    :class="{invalid: $v.confirmNewPassword.$invalid && $v.confirmNewPassword.$dirty}"
                    type="password"
                    placeholder="Confirm new password"
                    @keyup.enter="validaUser"
                  />
                  <span class="icon is-small is-left padding-icon">
                    <i class="fa fa-lock"></i>
                  </span>
                  </p>
                  <p class="help is-danger" v-if="$v.confirmNewPassword.$invalid && $v.confirmNewPassword.$dirty">
                    * As senhas não conferem.
                  </p>
                </div>
                <div class="field">
                   <p class="help is-danger" v-if="hasEmptyField">{{ hasEmptyField }}</p>
                  <p class="help is-danger" v-if="hasValidEmail">{{ hasValidEmail }}</p>
                </div>
                  <br/>
                <p class="columns control">
                  <button
                    @click="validaUser"
                    class="column is-12-mobile button button-margin button-padding password-change is-medium"
                  >
                    <i class="fa fa-exchange-alt icon-space"></i>
                    Mudar senha
                  </button>
                  <button
                    @click="redirect('login')"
                    class="button-back column is-12-mobile button button-padding is-medium"
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
      </div>
    </section>
</template>

<script>
import { getUsers, patchUser } from '@/services/login';
import { required, email, sameAs, alphaNum, minLength } from 'vuelidate/lib/validators';

export default {
  name: "ChangePassword",
  data() {
    return {
      user: {},
      email:null,
      newPassword:null,
      confirmNewPassword:null,
      errors: [],
      hasEmail: '',
      hasEmptyField: '',
      hasValidEmail: ''
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    newPassword: {
      required,
      alphaNum,
      minLength: minLength(6),
    },
    confirmNewPassword: {
      required,
      alphaNum,
      minLength: minLength(6),
      sameAs: sameAs('newPassword')
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
        this.hasEmail = users.data.find(user => user.email === email);
      },
    async changePassword() {
      await this.hasEmailCadastrado(this.email);

      if (this.hasEmail) {
        const newUser = {
          ...this.hasEmail,
          password: this.newPassword,
        };
          patchUser(newUser)
          .then(this.$toasted.show('Senha alterada com sucesso!',{
            type: 'success',
            duration : 2000,
            onComplete: this.redirect('login'),
          }))
      } else {
        this.hasValidEmail = "* E-mail não cadastrado.";
      }
    },
    validaUser(){
      this.validaCamposVazios()
        if(!this.$v.$invalid) {
          this.changePassword();
        } 
    },
    validaCamposVazios() {
      if(!this.email || !this.newPassword || !this.confirmNewPassword) {
          this.hasEmptyField = " *Você precisa preencher todos os campos.";
      } else {
         this.hasEmptyField = null;
      }
    }
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

.password-change:hover {
  background-color: rgba(60,101,113,1);
}

.button-back {
  padding-left: 3px;
  background-color: #ff7272;
  color: #ffffff;
}

.button-back:hover {
  background-color: #fc9191;
}

.padding-icon {
  padding-top: 2px;
}

.invalid {
  border-color: red;
}
.field {
  text-align: initial;
}
</style>
