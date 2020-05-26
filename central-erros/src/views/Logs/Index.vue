<template>
  <section class="hero is-fullheight-with-navbar logs-color">
    <div class="hero-head">
      <nav class="navbar">
        <div class="navbar-brand space-head-margin-left">
          <a class="navbar-item" id="space-logo">
            <img src="@/assets/login-logo.png" alt="logo" id="size-logo" @click="redirect('logs')" />
          </a>
        </div>
        <div class="navbar-end space-navbarend-padding">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="button width-button-profile button-color">
              <div class="icon">
                <i class="fa fa-user icon-space"></i>
              </div>
              <div class="icon is-small">
                <i class="fas fa-angle-down"></i>
              </div>
            </a>
            <div class="navbar-dropdown">
              <div class="dropdown-item">
                <strong>Token:</strong>
                4274836246
              </div>
              <a class="navbar-item button-color" @click="redirect('login')">Sair</a>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div class="is-fluid padding-filters">
      <h5 class="title is-5 is-flex configure-title-filtro-busca">Filtros de Busca</h5>
      <div class="is-flex">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu1">
              <span>Ambiente</span>
              <span class="icon is-small">
                <i class="fas fa-sort"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu1" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <a class="navbar-item" @click="hmlEnviroment">Homologação</a>
                <a class="navbar-item" @click="devEnviroment">Desenvolvimento</a>
                <a class="navbar-item" @click="prodEnviroment">Produção</a>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown is-hoverable margin-left-dropdown">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
              <span>Ordenar por</span>
              <span class="icon is-small">
                <i class="fas fa-sort"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu2" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <a class="navbar-item" @click="orderByLevel">Level</a>
                <a class="navbar-item" @click="orderByFrequence">Frequência</a>
                <a class="navbar-item" @click="orderByData">Data</a>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown is-hoverable margin-left-dropdown-busca">
          <div class="dropdown is-hoverable is-pulled-left">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                <span>Buscar por</span>
                <span class="icon is-small">
                  <i class="fas fa-sort"></i>
                </span>
              </button>
            </div>
          </div>
          <div class="dropdown-menu" id="dropdown-menu3" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <a class="navbar-item" @click="filterInputBusca = null" :class="{'has-text-weight-bold': filterInputBusca == null}">Todos</a>
                <a class="navbar-item" @click="filterInputBusca = 'level'" :class="{'has-text-weight-bold': filterInputBusca == 'level'}">Level</a>
                <a class="navbar-item" @click="filterInputBusca = 'description'" :class="{'has-text-weight-bold': filterInputBusca == 'description'}">Descrição</a>
                <a class="navbar-item" @click="filterInputBusca = 'origin'" :class="{'has-text-weight-bold': filterInputBusca == 'origin'}">Origem</a>
                <a class="navbar-item" @click="filterInputBusca = 'environment'" :class="{'has-text-weight-bold': filterInputBusca == 'environment'}">Produção</a>
                <a class="navbar-item" @click="filterInputBusca = 'date'" :class="{'has-text-weight-bold': filterInputBusca == 'date'}">Data</a>
                <a class="navbar-item" @click="filterInputBusca = 'events'" :class="{'has-text-weight-bold': filterInputBusca == 'events'}">Frequência</a>
              </div>
            </div>
          </div>
        </div>
        <p class="control has-icons-right width-control-input-busca">
          <input
            class="input margin-left-dropdown"
            placeholder="Digite sua busca"
            v-model="inputBusca"
            @keyup="onSearch"
          />
          <span class="icon is-small is-right">
            <i class="fas fa-search"></i>
          </span>
        </p>
        <div class="dropdown is-hoverable configure-question is-right">
          <div class="dropdown-trigger">
            <div class="icon">
              <i class="fas fa-question-circle"></i>
            </div>
          </div>
          <div class="dropdown-menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <p>
                  Inicialmente a entrada de busca é feita por Level,
                  Descrição, Origem e Data. Caso deseje procurar por um tipo específico,
                  indicar no campo "Buscar por"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="padding-arquivar-apagar is-flex">
      <button class="button">Arquivar</button>
      <button class="button margin-left-dropdown">Apagar</button>
    </div>

    <div class="container is-fluid">
      <section class="space-section-padding">
        <table class="table is-hoverable">
          <thead>
            <tr>
              <th @click="orderByLevel" class="has-clickable">
                Level
                <i class="fas fa-sort"></i>
              </th>
              <th>Log</th>
              <th @click="orderByFrequence" class="has-clickable">
                Eventos
                <i class="fas fa-sort"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in getComputedLogs" :key="log.id" class="has-clickable">
              <td class="padding">
                <input class="space-checkbox" type="checkbox" />
                <span v-if="log.level == 'error'" class="tag is-danger space-tag">{{ log.level }}</span>
                <span
                  v-else-if="log.level == 'warning'"
                  class="tag is-warning space-tag"
                >{{ log.level }}</span>
                <span v-else class="tag is-info space-tag">{{ log.level }}</span>
              </td>
              <td class="space-info-log">
                <strong>Descrição:</strong>
                {{ log.description }}
                <br />
                <strong>Origem:</strong>
                {{ log.origin }}
                <br />
                <strong>Ambiente:</strong>
                {{ log.environment }}
                <br />
                <strong>Data:</strong>
                {{ log.date }}
              </td>
              <td>{{ log.events }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  created() {
    this.loadingLogs();
  },
  data() {
    return {
      inputBusca: null,
      filterInputBusca: null,
    };
  },

  methods: {
    ...mapActions(['loadLogs', 'orderBy', 'orderByEnviroment', 'search', 'changeFilterSearch']),
    redirect(rota) {
      if (rota === "logs") {
        this.$router.push({
          name: "logs"
        });
      } else if (rota === "login") {
        this.$router.push({
          name: "login"
        });
      }
    },
    async loadingLogs() {
      await this.loadLogs();
    },

    orderByFrequence() {
      this.orderBy('events');
    },
    orderByLevel() {
      this.orderBy('level');
    },
    orderByData() {
      this.orderBy('date');
    },

    hmlEnviroment() {
      this.orderByEnviroment(["Homologação", "Desenvolvimento", "Produção"])
    },
    devEnviroment() {
      this.orderByEnviroment(["Desenvolvimento", "Homologação", "Produção"])
    },
    prodEnviroment() {
      this.orderByEnviroment(["Produção", "Homologação", "Desenvolvimento"])
    },
    onSearch() {
      this.search(this.inputBusca);
    },
    onChangeSearch() {
      this.changeFilterSearch(this.filterInputBusca);
    }
  },
   watch: {
    filterInputBusca: function () {
      this.onChangeSearch();
    },
   },
  computed: {
    ...mapGetters(['getComputedLogs']),
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
.width-control-input-busca {
  width: 100%;
}
.margin-left-dropdown {
  margin-left: 5px;
}
.margin-left-dropdown-busca {
  margin-left: 60px;
}
.padding-arquivar-apagar {
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 70px;
}
.padding-filters {
  padding-left: 32px;
  padding-right: 5px;
  padding-top: 20px;
}
.space-section-padding {
  margin-top: 5px;
}
.space-checkbox {
  margin-top: 30px;
}
.space-head-margin-left {
  margin-left: 30px;
}
.space-navbarend-padding {
  padding: 10px;
  margin-right: 30px;
}
.configure-question {
  color: white;
  padding: 5px;
  margin-top: 3px;
}
.space-tag {
  margin-left: 5%;
}
.tag {
  height: 20px;
  width: 50px;
}
table {
  width: 100%;
  border-radius: 5px;
}
.has-clickable {
  cursor: pointer;
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
.navbar {
  background-color: white;
}
.configure-title-filtro-busca {
  color: white;
  margin-bottom: 5px;
}
</style>
