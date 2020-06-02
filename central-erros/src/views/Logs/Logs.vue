<template>
  <div>
    <div class="container is-fluid">
      <section class="space-section-padding">
        <table class="table is-hoverable">
          <thead>
            <tr>
              <th @click="orderByLevel" class="has-clickable">
                Level
                <i class="fas fa-sort"></i>
              </th>
              <th>Descrição</th>
              <th>Origem</th>
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
                <span v-if="log.level == 'error'" class="tag is-danger">{{ log.level }}</span>
                <span v-else-if="log.level == 'warning'" class="tag is-warning">{{ log.level }}</span>
                <span v-else class="tag is-info">{{ log.level }}</span>
              </td>
              <td class="space-info-logs">{{ log.description }}</td>
              <td>{{ log.origin }}</td>
              <td>{{ log.environment }}</td>
              <td>{{ log.date }}</td>
              <td>{{ log.events }}</td>
              <td v-if="getTab == 'Coletado'">
                <span
                  class="icon icon-padding is-small"
                  @click="openModalConfirmacao('archive', log)"
                  v-tooltip="{ content: 'Arquivar' }"
                >
                  <i class="fas fa-archive"></i>
                </span>
                <span class="icon icon-padding is-small" @click="openModalConfirmacao('delete', log)" v-tooltip="{ content: 'Apagar' }">
                  <i class="fas fa-trash-alt"></i>
                </span>
              </td>
              <td v-else-if="getTab == 'Arquivado'">
                <span class="icon icon-padding is-small" @click="openModalConfirmacao('delete', log)" v-tooltip="{ content: 'Apagar' }">
                  <i class="fas fa-trash-alt"></i>
                </span>
              </td>
              <td v-else>
                <span class="icon icon-padding is-small" @click="openModalConfirmacao('unarchive', log)" v-tooltip="{ content: 'Restaurar' }">
                  <i class="fas fa-undo-alt"></i>
                </span>
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
import BackToTop from "vue-backtotop";
import ModalConfirmacao from './ModalCofirmacao';

export default {
  name: "Logs",
  components: { BackToTop, ModalConfirmacao },
  data() {
    return {
      typeModal: null,
      isModalActive: false,
      logToAction: null,
    }
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
    openModalConfirmacao(type, log){
      this.typeModal = type;
      this.logToAction = log
      this.isModalActive = true;
    },
    confirmAction(type, log){
      if(type == 'delete') {
        this.deleteLogs(log)
      }

      if(type == 'archive') {
        this.archiveLogs(log)
      }

      if(type == 'unarchive') {
        this.unarchiveLog(log)
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
</style>