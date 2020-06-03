<template>
  <div>
    <div class="container is-fluid padding-filters">
      <h5 class="title is-5 is-flex configure-title-filtro-busca">Filtros de Busca</h5>
      <div class="columns is-mobile">
        <div class="column is-2 buscar-por-margin">
        <div class="dropdown is-hoverable is-pulled-left">
          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                <span>Buscar por</span>
                <span class="icon icon-padding is-small">
                  <i class="fas fa-angle-down"></i>
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
                <a class="navbar-item" @click="filterInputBusca = 'environment'" :class="{'has-text-weight-bold': filterInputBusca == 'environment'}">Ambiente</a>
                <a class="navbar-item" @click="filterInputBusca = 'date'" :class="{'has-text-weight-bold': filterInputBusca == 'date'}">Data</a>
                <a class="navbar-item" @click="filterInputBusca = 'events'" :class="{'has-text-weight-bold': filterInputBusca == 'events'}">Eventos</a>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="column is-3 input-align">
        <p class="control has-icons-right">
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
        </div>
        <div class="column is-1 limpa-filtros-align">
        <button class="button margin-left-dropdown" @click="limparFiltros">
          <span class="icon is-small">
            <i class="fas fa-trash-alt"></i>
          </span>
          <span>Limpar filtros</span>
         </button>
          </div>
          <div class="column is-1 tooltip-align">
        <div class=" is-pulled-right dropdown is-hoverable configure-question is-right">
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
                  Descrição, Origem, Ambiente, Data e Eventos. Caso deseje procurar apenas por um destes tipos,
                  indique no campo "Buscar por"
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Toolbar',
  data() {
    return {
      inputBusca: null,
      filterInputBusca: null,
    };
  },
   watch: {
    filterInputBusca: function () {
      this.onChangeSearch();
    },
   },
  methods: {
    ...mapActions(['orderBy', 'orderByEnviroment', 'search', 'changeFilterSearch', 'clearFilters']),
    onSearch() {
      this.search(this.inputBusca);
    },
    onChangeSearch() {
      this.changeFilterSearch(this.filterInputBusca);
    },

    limparFiltros() {
      this.inputBusca = null;
      this.filterInputBusca = null;
      this.clearFilters();
    },
  }

}
</script>

<style scoped>

.configure-question {
  color: white;
  padding: 5px;
  margin-top: 3px;
}

.configure-title-filtro-busca {
  color: white;
  margin-bottom: 5px;
}

.padding-filters {
  padding-top: 20px;
}

.icon-padding {
  padding-top: 4.5px;
}

.margin-left-dropdown {
  margin-left: 10px;
}

.ambiente-margin {
  margin-right: -60px;
}

.ordenar-por-margin {
  margin-right: 240px;
}

.buscar-por-margin {
  margin-right: -90px;
}

.input-align {
  margin-left: -67px;
}

.limpa-filtros-align {
  margin-left: -4px;
}

.tooltip-align {
  margin-left: -71px;
}

@media screen and (max-width: 1408px) {
  .input-align {
    margin-left: 34px;
  }

  .tooltip-align {
  margin-left: 31px;
  }
}

@media screen and (max-width: 2560px) {
  .input-align {
    margin-left: -170px;
  }

  .limpa-filtros-align {
  margin-left: -13px;
  }

  .tooltip-align {
  margin-left: -170px;
  }
}

@media screen and (max-width: 1440px) {
  .input-align {
    margin-left: 18px;
  }

  .limpa-filtros-align {
  margin-left: 0px;
  }

  .tooltip-align {
  margin-left: 8px;
  }
}

@media screen and (max-width: 1024px) {
  .input-align {
    margin-left: 82px;
  }

  .limpa-filtros-align {
  margin-left: -5px;
  }

  .tooltip-align {
  margin-left: 73px;
  }
  
}

@media screen and (max-width: 768px) {
  .input-align {
    margin-left: 126px;
    width: 210px !important;
  }

  .limpa-filtros-align {
  margin-left: -5px;
  }

  .tooltip-align {
  margin-left: 118px;
  }
  
}

</style>