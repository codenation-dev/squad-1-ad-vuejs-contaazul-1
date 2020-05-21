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
              <span>Produção</span>
              <span class="icon is-small">
                <i class="fas fa-sort"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu1" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <a class="navbar-item" @click="productionByHomologacao" :class="{'has-text-weight-bold': configs.orderBy == 'environment' && orderProducao[0] == 'Homologação'}" >Homologação</a>
                <a class="navbar-item" @click="productionByDev" :class="{'has-text-weight-bold': configs.orderBy == 'environment' && orderProducao[0] == 'Dev'}">Dev</a>
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
                <a class="navbar-item" @click="orderByLevel" :class="{'has-text-weight-bold': configs.orderBy == 'level'}">Level</a>
                <a class="navbar-item" @click="orderByFrequence" :class="{'has-text-weight-bold': configs.orderBy == 'events'}">Frequência</a>
                <a class="navbar-item" @click="orderByData" :class="{'has-text-weight-bold': configs.orderBy == 'date'}">Data</a>
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
                <a class="navbar-item" @click="configs.filterBusca = null" :class="{'has-text-weight-bold': configs.filterBusca == null}">Todos</a>
                <a class="navbar-item" @click="configs.filterBusca = 'level'" :class="{'has-text-weight-bold': configs.filterBusca == 'level'}">Level</a>
                <a class="navbar-item" @click="configs.filterBusca = 'description'" :class="{'has-text-weight-bold': configs.filterBusca == 'description'}">Descrição</a>
                <a class="navbar-item" @click="configs.filterBusca = 'origin'" :class="{'has-text-weight-bold': configs.filterBusca == 'origin'}">Origem</a>
                <a class="navbar-item" @click="configs.filterBusca = 'environment'" :class="{'has-text-weight-bold': configs.filterBusca == 'environment'}">Produção</a>
                <a class="navbar-item" @click="configs.filterBusca = 'date'" :class="{'has-text-weight-bold': configs.filterBusca == 'date'}">Data</a>
                <a class="navbar-item" @click="configs.filterBusca = 'events'" :class="{'has-text-weight-bold': configs.filterBusca == 'events'}">Frequência</a>
              </div>
            </div>
          </div>
        </div>
        <p class="control has-icons-right width-control-input-busca">
          <input
            class="input margin-left-dropdown"
            placeholder="Digite sua busca"
            v-model="configs.inputBusca"
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
                  Descrição, Origem, Produção, Data e Frequência. Caso deseje procurar por um tipo específico,
                  indique no campo "Buscar por"
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
            <tr v-for="log in computedLogs" :key="log.id" class="has-clickable">
              <td class="space-level">
                <input class="space-checkbox" type="checkbox" />
                <span v-if="log.level == 'error'" class="tag is-danger space-tag">{{ log.level }}</span>
                <span
                  v-else-if="log.level == 'warning'"
                  class="tag is-warning space-tag"
                >{{ log.level }}</span>
                <span v-else class="tag is-info space-tag">{{ log.level }}</span>
              </td>
              <td class="space-info-logs">
                <strong>Descrição:</strong>
                {{ log.description }}
                <br />
                <strong>Origem:</strong>
                {{ log.origin }}
                <br />
                <strong>Produção:</strong>
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
import { getLogs } from "@/services/logs.js";
import _ from "lodash";
// import debounce from "lodash/debounce";

export default {
  created() {
    this.loadingLogs();
  },
  data() {
    return {
      logs: [],
      configs: {
        orderBy: "date",
        order: "desc",
        filterBusca: null,
        inputBusca: null
      },
      orderLevel: ["error", "warning", "debug"],
      orderProducao: []
    };
  },
  methods: {
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
    loadingLogs() {
      getLogs().then(({ data }) => {
        this.logs = data;
      });
    },

    orderByFrequence() {
      this.configs.orderBy = "events";
      if (this.configs.order == "desc") {
        this.configs.order = "asc";
      } else {
        this.configs.order = "desc";
      }
    },
    orderByLevel() {
      this.configs.orderBy = "level";
      if (this.configs.order == "desc") {
        this.configs.order = "asc";
      } else {
        this.configs.order = "desc";
      }
    },
    orderByData() {
      this.configs.orderBy = "date";
      if (this.configs.order == "desc") {
        this.configs.order = "asc";
      } else {
        this.configs.order = "desc";
      }
    },
    productionByHomologacao() {
      this.configs.orderBy = "environment";
      this.orderProducao = [];
      this.orderProducao.push("Homologação", "Dev");
    },
    productionByDev() {
      this.configs.orderBy = "environment";
      this.orderProducao = [];
      this.orderProducao.push("Dev", "Homologação");
    }
  },
  computed: {
    computedLogs() {
      let returnComputedLogs = null;

      if (this.configs.orderBy == "level") {
        if (this.configs.order == "desc") {
          returnComputedLogs = _.sortBy(this.logs, logs => {
            return this.orderLevel.indexOf(logs.level);
          });
        } else {
          const arrayAux = _.sortBy(this.logs, logs => {
            return this.orderLevel.indexOf(logs.level);
          });
          returnComputedLogs = arrayAux.reverse();
        }
      } else if (this.configs.orderBy == "environment") {
        returnComputedLogs = _.sortBy(this.logs, logs => {
          return this.orderProducao.indexOf(logs.environment);
        });
      } else {
        returnComputedLogs = _.orderBy(
          this.logs,
          this.configs.orderBy,
          this.configs.order
        );
      }

      if (_.isEmpty(this.configs.inputBusca)) {
        return returnComputedLogs;
      }

      if (_.isEmpty(this.configs.filterBusca)) {
        return _.filter(
          returnComputedLogs,
          log =>
            log.level
              .toLowerCase()
              .indexOf(this.configs.inputBusca.toLowerCase()) >= 0 ||
            log.description
              .toLowerCase()
              .indexOf(this.configs.inputBusca.toLowerCase()) >= 0 ||
            log.origin
              .toLowerCase()
              .indexOf(this.configs.inputBusca.toLowerCase()) >= 0 ||
            log.environment
              .toLowerCase()
              .indexOf(this.configs.inputBusca.toLowerCase()) >= 0 ||
            log.date.indexOf(this.configs.inputBusca) >= 0 ||
            log.events.toString().indexOf(this.configs.inputBusca) >= 0
        );
      } else {
        if (this.configs.filterBusca == "level") {
          return _.filter(
            returnComputedLogs,
            log =>
              log.level
                .toLowerCase()
                .indexOf(this.configs.inputBusca.toLowerCase()) >= 0
          );
        } else if (this.configs.filterBusca == "description") {
          return _.filter(
            returnComputedLogs,
            log =>
              log.description
                .toLowerCase()
                .indexOf(this.configs.inputBusca.toLowerCase()) >= 0
          );
        } else if (this.configs.filterBusca == "origin") {
          return _.filter(
            returnComputedLogs,
            log =>
              log.origin
                .toLowerCase()
                .indexOf(this.configs.inputBusca.toLowerCase()) >= 0
          );
        } else if (this.configs.filterBusca == "environment") {
          return _.filter(
            returnComputedLogs,
            log =>
              log.environment
                .toLowerCase()
                .indexOf(this.configs.inputBusca.toLowerCase()) >= 0
          );
        } else if (this.configs.filterBusca == "date") {
          return _.filter(
            returnComputedLogs,
            log => log.date.indexOf(this.configs.inputBusca) >= 0
          );
        } else {
          return _.filter(
            returnComputedLogs,
            log => log.events.toString().indexOf(this.configs.inputBusca) >= 0
          );
        }
      }
    }
  }
};
</script>

<style scoped>
td {
  height: 50px;
}
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
.space-info-logs {
  width: 836px;
  height: 110.1px;
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
.teste{
  border-color: rgb(21, 72, 84);
}
</style>
