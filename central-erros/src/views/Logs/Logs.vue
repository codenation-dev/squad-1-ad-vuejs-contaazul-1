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
              <th>
                Descrição
              </th>
              <th>
                Origem
              </th>
              <th>
                Ambiente
              </th>
              <th @click="orderByData" class="has-clickable">
                Data
                <i class="fas fa-sort"></i>
              </th>
              <th @click="orderByFrequence" class="has-clickable">
                Eventos
                <i class="fas fa-sort"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in getComputedLogs" :key="log.id" class="has-clickable">
              <td>
                <span v-if="log.level == 'error'" class="tag is-danger">{{ log.level }}</span>
                <span
                  v-else-if="log.level == 'warning'"
                  class="tag is-warning"
                >{{ log.level }}</span>
                <span v-else class="tag is-info">{{ log.level }}</span>
              </td>
              <td class="space-info-log">
                {{ log.description }}
              </td>
              <td>
                {{ log.origin }}
              </td>
              <td>
                {{ log.environment }}
              </td>
              <td>
                {{ log.date }}
              </td>
              <td>
                {{ log.events }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Logs',
  
  created() {
    this.loadingLogs();
  },
  computed: {
    ...mapGetters(['getComputedLogs']),
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
  },
};
</script>

<style scoped>

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