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
                            v-model="password" 
                            type="password" 
                            placeholder="Senha" 
                            :class="{invalid: $v.password.$invalid && $v.password.$dirty}"
                            @blur="$v.password.$touch()" 
                    />
                    <span class="icon is-small is-left padding-icon">
                      <i class="fa fa-lock"></i>
                    </span>
                </p>
                <p class="help is-danger" v-if="!$v.password.required && $v.password.$dirty">
                      * É necessário inserir uma senha.
                  </p>
                  <p class="help is-danger" v-if="!$v.password.alphaNum && $v.password.$dirty">
                      * A senha deve conter apenas letras e números.
                  </p>
                  <p class="help is-danger" v-if="!$v.password.minLength && $v.password.$dirty">
                      * A senha deve conter no mínimo 6 caracteres.
                  </p> 
              </div>    
              <div class="field"> 
                <p class="help is-danger" v-if="hasValidEmail">{{ hasValidEmail }}</p>
                <p class="help is-danger" v-if="hasValidPassword">{{ hasValidPassword }}</p>
                <p class="help is-danger" v-if="hasEmptyField">{{ hasEmptyField }}</p>
              </div>  
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
import { mapActions, mapGetters, mapState } from 'vuex';
import { getUsers } from '@/services/login';
import { required, email, alphaNum, minLength } from 'vuelidate/lib/validators';

export default {
  name: "Login",
  data() {
    return {
      email:null,
      password:null,
      hasEmail: '',
      hasValidEmail: '',
      hasValidPassword: '',
       hasEmptyField: ''
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      alphaNum,
      minLength: minLength(6),
    },
  },
  computed: {
    ...mapGetters(['getUserEmail'])
  },
  created() {
    if(this.getUserEmail) {
      this.email = this.getUserEmail;
    }
  },
  methods: {
    ...mapActions(['login', 'clearFilters']),
    ...mapState(['token', 'user']),
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
      await this.hasEmailCadastrado(this.email);
      if (this.hasEmail) {
        let credentials = {
          email: this.email,
          password: this.password
        }
        if(this.hasEmail.password === this.password) {
          this.login(credentials);
          this.clearFilters();
          this.redirect('logs');
        } else {
          this.hasValidPassword = "* Senha incorreta.";
        }
      } else {
        this.hasValidEmail = "* E-mail não cadastrado.";
      }
    },
     async hasEmailCadastrado(email) {
        const users = await getUsers(email);
        this.hasEmail = users.data.find(user => user.email === email);
      },
     async validaUser() {
       this.validaCamposVazios()
        if(!this.$v.$invalid) {
          this.loginUser();
        } 
    },
     validaCamposVazios() {
      if(!this.email || !this.password) {
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

.invalid {
  border-color: red;
}
.field {
  text-align: initial;
}

</style>
