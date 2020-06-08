<template>
  <section class="hero is-fullheight-with-navbar logs-color">
    <div class="hero-head">
      <nav class="navbar mobile-height">
        <div class="navbar-brand space-head-margin-left">
          <a class="navbar-item" id="space-logo">
            <img
              src="@/assets/login-logo.png"
              alt="logo"
              id="size-logo"
              @click="redirect('logs')"
            />
          </a>
          <div class="navbar-item mobile-space">
            <button
              @click="redirect('login')"
              class="button exit-button-color is-hidden-desktop button-width"
            >
              <span class="icon">
                <i class="fa fa-times"></i>
              </span>
              <span>Sair</span>
            </button>
          </div>
        </div>
        <div class="navbar-end space-navbarend-padding">
          <div class="navbar-item is-hidden-mobile has-dropdown is-hoverable">
            <a class="button width-button-profile button-color">
              <div class="icon">
                <i class="fa fa-user icon-space"></i>
              </div>
              <div class="icon is-small">
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div class="navbar-dropdown is-right">
              <div class="dropdown-item">
                <div class="card card-size">
                  <div class="card-content card-size">
                    <p class="text-align is-size-7"><strong>Usuário:</strong> {{getUser.name}} </p>
                    <p class="text-align is-size-7"><strong>E-mail:</strong> {{getUser.email}} </p>
                     <p class="text-align is-size-7"><strong>Token:</strong> {{getToken}} </p>
                  </div>
                  <footer class="card-footer">
                    <p class="card-footer-item control">
                      <button
                        @click="redirect('login')"
                        class="button exit-button-color"
                      >
                        <span class="icon">
                          <i class="fa fa-times"></i>
                        </span>
                        <span>Sair</span>
                      </button>
                    </p>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="container is-fluid mobile-padding">
      <div class="section section-padding mobile-padding">
        <toolbar class="toolbar-margin"></toolbar>
        <div class="panel-position">
          <p class="container is-fluid panel-tabs panel-margin">
            <a
              class="panel-item"
              v-on:click="isActive = 'logs'"
              @click="changeTabs('Coletado')"
              v-bind:class="{ activate: isActive == 'logs' }"
            >
              <span class="icon is-small icon-align">
                <i class="fas fa-list" aria-hidden="true"></i>
              </span>
              Coletados
            </a>
            <a
              class="panel-item"
              v-on:click="isActive = 'arquivados'"
              @click="changeTabs('Arquivado')"
              v-bind:class="{ activate: isActive == 'arquivados' }"
            >
              <span class="icon is-small icon-align">
                <i class="fas fa-folder-open" aria-hidden="true"></i>
              </span>
              Arquivados 
            </a>
            <a
              class="panel-item"
              v-on:click="isActive = 'apagados'"
              @click="changeTabs('Apagado')"
              v-bind:class="{ activate: isActive == 'apagados' }"
            >
              <span class="icon is-small icon-align">
                <i class="fas fa-trash" aria-hidden="true"></i>
              </span>
              Apagados
            </a>
          </p>
          <a v-if="isActive == 'logs'" class="content">
            <logs></logs>
          </a>
          <a v-if="isActive == 'arquivados'" class="content">
            <logs></logs>
          </a>
          <a v-if="isActive == 'apagados'" class="content">
            <logs></logs>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Toolbar from "./Toolbar";
import Logs from "./Logs";

export default {
  name: "Index",
  components: {
    Toolbar,
    Logs,
  },
  data() {
    return {
      isActive: "logs",
    };
  },
  methods: {
    ...mapActions(['changeTab', 'clearFilters', 'logOut']),
    changeTabs(tab) {
      this.changeTab(tab);
    },
    redirect(rota) {
      if (rota === "logs") {
        this.$router.push({
          name: "logs",
        });
      } else if (rota === "login") {
        this.userLogout();
        this.clearFilters();
        this.$router.push({
          name: "login",
        });
      }
    },
    userLogout() {
      const credentials = {}
      this.logOut(credentials)
    }
  },
  computed: {
    ...mapGetters(["getUser","getToken"])
  }
};
</script>

<style scoped>
#space-logo {
  padding: 0px;
  width: 60px;
  height: 60px;
}
#size-logo {
  max-width: 100%;
  max-height: 100%;
}
.button {
  width: 150px;
}
.width-button-profile {
  width: 75px;
}
.button-color {
  background-color: #154854;
  color: #ffffff;
}

.space-head-margin-left {
  margin-left: 30px;
}

.space-navbarend-padding {
  padding: 10px;
  margin-right: 30px;
}

.navbar {
  background-color: white;
}

.logs-color {
  background: rgb(21, 72, 84);
  background: linear-gradient(
    180deg,
    rgba(21, 72, 84, 1) 0%,
    rgba(36, 83, 95, 1) 23%,
    rgba(60, 101, 113, 1) 47%,
    rgba(99, 132, 142, 1) 71%,
    rgba(255, 255, 255, 1) 100%
  );
}

.section-padding {
  padding-top: 20px;
}

.toolbar-margin {
  margin-bottom: 40px;
}

.content {
  width: 100%;
}

.text-align {
  text-align: left;
}

.panel-item {
  background-color: #d3d3d3;
  border: solid 1px #777070;
  border-radius: 5px 5px 0px 0px;
}

.activate {
  background-color: white;
}

.panel-position {
  padding-top: 0px;
}

.panel-margin {
  margin-bottom: -10px;
  border-bottom: none;
}

.panel-tabs {
  justify-content: left;
  margin-left: -1px;
}

.icon-align {
  margin-bottom: 5px;
}

.card-size {
  width: 405px;
  height: 125px;
  margin-top: -7px;
}

.card-size-interno {
  width: 285px;
  height: 125px;
}

.card-footer {
  margin-top: -55px;
}

.exit-button-color {
  background-color: #154854;
  color: #ffffff;
  height: 35px;
  width: 91px;
}

.exit-button-color:hover {
  background-color: rgba(60, 101, 113, 1);
}

.dropdown-item {
  height: 125px;
  width: 315px;
}

.card-content {
  padding: 0.6rem;
}

@media screen and (max-width: 768px) {
  .mobile-height {
    height: 60px;
  }

  .button-width {
    width: 100px;
  }

  .mobile-space {
    margin-left: 537px;
  }
}

@media screen and (max-width: 425px) {
  .hero {
    width: 749px;
  }
}

@media screen and (max-width: 768px) {
  .mobile-padding {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
