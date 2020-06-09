<template>
  <div>
    <div class="container is-fluid">
      <section class="space-section-padding">
        <table class="table is-hoverable">
          <thead>
            <tr class="font-smaller">
              <th @click="orderByLevel" class="has-clickable">
                Level
                <i class="fas fa-sort"></i>
              </th>
              <th class="is-hidden-mobile">Descrição</th>
              <th class="is-hidden-mobile">Origem</th>
              <th class="is-hidden-desktop">
                Descrição
                <br />Origem
              </th>
              <th @click="orderEnviroment" class="has-clickable">
                Ambiente
                <i class="fas fa-sort"></i>
              </th>
              <th @click="orderByData" class="has-clickable">
                Data
                <i class="fas fa-sort"></i>
              </th>
              <th @click="orderByFrequence" class="has-clickable">
                Eventos
                <i class="fas fa-sort"></i>
              </th>
              <th v-if="getTab == 'Coletado'">Ações</th>
              <th v-else>Ação</th>
            </tr>
          </thead>
          <tbody v-if="getComputedLogs == 0">
            <tr>
              <td colspan="7" class="has-text-centered">
                <strong>Nenhum retorno para esta busca</strong>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="log in getComputedLogs" :key="log.id" class="has-clickable">
              <td>
                <span v-if="log.level == 'error'" class="tag is-danger">
                  {{
                  log.level
                  }}
                </span>
                <span v-else-if="log.level == 'warning'" class="tag is-warning">{{ log.level }}</span>
                <span v-else class="tag is-info">{{ log.level }}</span>
              </td>
              <td class="space-info-logs is-hidden-mobile">{{ log.description }}</td>
              <td class="is-hidden-mobile">{{ log.origin }}</td>
              <td class="is-hidden-desktop space-info-logs">
                <strong class="strong-font-size">Descrição:</strong>
                {{ log.description }}
                <br />
                <strong class="strong-font-size">Origem:</strong>
                {{ log.origin }}
              </td>
              <td>{{ log.environment }}</td>
              <td class="space-info-data">{{ log.date }}</td>
              <td>{{ log.events }}</td>
              <td v-if="getTab == 'Coletado'">
                <div class="tooltip" @click="openModalConfirmacao('archive', log)">
                  <i class="fas fa-archive"></i>
                  <span class="tooltiptext">Arquivar</span>
                </div>
                <div class="tooltip margin-left" @click="openModalConfirmacao('delete', log)">
                  <i class="fas fa-trash-alt"></i>
                  <span class="tooltiptext">Apagar</span>
                </div>
              </td>
              <td v-else-if="getTab == 'Arquivado'">
                <div class="tooltip margin-left" @click="openModalConfirmacao('delete', log)">
                  <i class="fas fa-trash-alt"></i>
                  <span class="tooltiptext">Apagar</span>
                </div>
              </td>
              <td v-else>
                <div class="tooltip margin-left" @click="openModalConfirmacao('unarchive', log)">
                  <i class="fas fa-undo-alt"></i>
                  <span class="tooltiptext">Restaurar</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <back-to-top right="20px" visibleoffset="250">
        <button class="btn-to-top">
          <i class="fa fa-chevron-up"></i>
        </button>
      </back-to-top>
    </div>
    <modal-confirmacao
      v-if="isModalActive"
      @close="isModalActive = false"
      @confirm="confirmAction"
      :type="typeModal"
      :log="logToAction"
    ></modal-confirmacao>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModalConfirmacao from "./ModalCofirmacao";

export default {
  name: "Logs",
  components: { ModalConfirmacao },
  data() {
    return {
      typeModal: null,
      isModalActive: false,
      logToAction: null
    };
  },
  created() {
    this.loadingLogs();
  },
  computed: {
    ...mapGetters(["getComputedLogs", "getTab"])
  },
  methods: {
    ...mapActions([
      "loadLogs",
      "orderBy",
      "orderByEnviroment",
      "search",
      "changeFilterSearch",
      "archiveLog",
      "deleteLog",
      "unarchiveLog"
    ]),
    async loadingLogs() {
      await this.loadLogs();
    },

    orderByFrequence() {
      this.orderBy("events");
    },
    orderByLevel() {
      this.orderBy("level");
    },
    orderByData() {
      this.orderBy("date");
    },
    orderEnviroment() {
      this.orderByEnviroment("environment");
    },
    openModalConfirmacao(type, log) {
      this.typeModal = type;
      this.logToAction = log;
      this.isModalActive = true;
    },
    confirmAction(type, log) {
      if (type == "delete") {
        this.deleteLogs(log);
      }

      if (type == "archive") {
        this.archiveLogs(log);
      }

      if (type == "unarchive") {
        this.unarchiveLog(log);
      }

      this.isModalActive = false;
    },
    deleteLogs(log) {
      this.deleteLog(log);
    },
    archiveLogs(log) {
      this.archiveLog(log);
    },
    unarchiveLogs(log) {
      this.unarchiveLog(log);
    }
  }
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 100px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
  top: -150%;
  right: 105%;
}

.margin-left {
  margin-left: 10px;
}

.space-info-logs {
  width: 479px;
  height: 44px;
}
.icon-padding {
  padding: 13px;
}
.btn-to-top {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid white;
  color: white;
  font-size: 20px;
  background: rgba(60, 101, 113, 1);
  outline: none;
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

.has-clickable {
  cursor: pointer;
}

table {
  width: 100%;
  border-radius: 5px;
}

.tag {
  height: 20px;
  width: 50px;
}

.space-tag {
  margin-top: 30px;
}

.space-section-padding {
  margin-top: 5px;
}

@media screen and (max-width: 1440px) {
  .space-info-logs {
    width: 181px;
    height: 44px;
  }
}

@media screen and (max-width: 768px) {
  .font-smaller {
    font-size: 14px;
  }

  .space-info-logs {
    width: 160px;
    height: 44px;
  }

  .strong-font-size {
    font-size: 13px;
  }

  .space-info-data {
    width: 120px;
    height: 44px;
  }
}
</style>
